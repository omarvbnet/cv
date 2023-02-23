import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Signupstyles from '../styles/SignUp.module.css'
import Nav from '../components/Nav'
import { useRouter } from 'next/router'
import { signupContext } from '../context/signupContext'
import { GlobalContext } from '../context/globalContext'
import { Base64 } from 'js-base64'
import TopMenu from '../components/TopMenu'

function Login() {

    const [, setUsername] = useState()
    const router = useRouter()

    const { signupid, setsignupid } = useContext(signupContext)
    const { setLoggedinuser } = useContext(GlobalContext)
    const [passwordcheck, setpasswordcheck] = useState(false)
    const [loading, setLoading] = useState(false)
    const [signnedin, setSigneedIn] = useState(false)


    useEffect(() => {
        router.replace('/login', undefined, { shallow: true })
        let newObjectuser = JSON.parse(localStorage?.getItem('user_id'))
        newObjectuser?.unique_id !== ' ' ? setSigneedIn(true) : setSigneedIn(false)

        // if (
        //     JSON.parse(localStorage?.getItem('user_id')) === '' ||
        //     JSON.parse(localStorage?.getItem('user_id')) === undefined ||
        //     JSON.parse(localStorage?.getItem('user_id')) === null
        // ) {
        //     router.push('/')
        // } else {
        //     router.push('/login')
        // }
    }, [])




    const onSubmit = (data) => {
        setLoading(true)

        const hashedPassword = Base64.encode(data.password)







        fetch('/api/getuser', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        }).then((response) => response.json())
            .then(async (response) => {
                setUsername(response)


                // console.log(response, 'response....')

                const Loggedinemail = response?.filter((x) => {
                    return x?.email === data?.email
                })

                // console.log(Loggedinemail, 'Loggedinemail')

                if (
                    Loggedinemail[0]?.email === data?.email &&
                    hashedPassword === Loggedinemail[0]?.password
                ) {
                    localStorage.setItem(
                        'user_id',
                        JSON.stringify({
                            unique_id: Loggedinemail[0]?.id,
                        }),
                    ),

                        setLoggedinuser(() => {
                            return {
                                data: Loggedinemail[0],
                            }
                        })

                    router.push({
                        pathname: '/stepone',
                    })
                    setLoading(false)
                } else {
                    // router.push({
                    //     pathname: '/signup',
                    // })
                    setLoading(false)
                    setpasswordcheck(!passwordcheck)
                }
            })
    }

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'all',
    })

    return (
        <div>
            {/* <Nav /> */}
            <TopMenu />
            <div className={Signupstyles.updateform_main}>
                <div>
                    <h1 className={Signupstyles.form_title}> Please Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={Signupstyles.product_link_info}>
                            <input
                                defaultValue=""
                                className={Signupstyles.getstartedinput}
                                {...register('email')}
                                placeholder="Email"
                                type="text"
                                required
                            />

                            <input
                                defaultValue=""
                                className={Signupstyles.getstartedinput}
                                {...register('password')}
                                placeholder="password"
                                type="password"
                            />
                        </div>


                        {
                            loading ? <button
                                style={{
                                    marginBottom: '20px',
                                }}
                                type="submit"
                                className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                            >
                                Loading...
                            </button> : <button
                                style={{
                                    marginBottom: '20px',
                                }}
                                type="submit"
                                className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                            >
                                Login
                            </button>
                        }


                    </form>

                    <span>
                        Don't have an account yet?{' '}
                        <span
                            style={{ color: 'red' }}
                            onClick={() => router.push('/signup')}
                        >
                            Signup
                        </span>{' '}
                    </span>

                    <div style={{ marginTop: '20px', color: 'red' }}>
                        {passwordcheck && <span>Wrong Details!</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login