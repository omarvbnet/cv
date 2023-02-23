import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Signupstyles from '../styles/SignUp.module.css'
import { signupContext } from '../context/signupContext'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import axios from 'axios'

function Signup() {


    const router = useRouter()

    const schema = yup.object().shape({
        email: yup.string().email().required('Email is required'),
    })

    const { signupid, setsignupid } = useContext(signupContext)
    const [loading, setLoading] = useState(false)

    const onSubmit = (data) => {
        setLoading(true)

        fetch('/api/signup', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                username: data.name,
                email: data.email,
                password: data.password,
            }),
        })
            .then((response) => response.json())
            .then(async (response) => {
                if (response.id !== ' ') {
                    setLoading(false)
                    localStorage.setItem(
                        'user_id',

                        JSON.stringify({
                            unique_id: response.id,
                        }),
                    )

                    setsignupid(() => {
                        return {
                            username: `${data.name}`,
                            email: `${data.email}`,
                            password: `${data.password}`,
                            unique_id: `${response.id}`,
                        }
                    })
                    router.push({
                        pathname: '/login',
                        query: {
                            ...data,
                            state: `${response.id}`,
                        },
                    })
                }
            })
            .catch((err) => console.error(err))
    }

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'all',
        resolver: yupResolver(schema),
    })

    return (
        <div>
            <Nav />
            <div className={Signupstyles.updateform_main}>
                <div>
                    <h1 className={Signupstyles.form_title}> Please SignUp</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={Signupstyles.product_link_info}>
                            <input
                                defaultValue=""
                                className={Signupstyles.getstartedinput}
                                {...register('email')}
                                placeholder="Email"
                                type="email"
                            />

                            <input
                                defaultValue=""
                                className={Signupstyles.getstartedinput}
                                {...register('name')}
                                placeholder="Username"
                                type="text"
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
                                type="submit"
                                className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                            >
                                Loading...
                            </button> : <button
                                type="submit"
                                className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                            >
                                SignUp
                            </button>
                        }
                    </form>

                    <span>
                        Already Registered?{' '}
                        <span
                            style={{ color: 'red' }}
                            onClick={() => router.push('/login')}
                        >
                            Login
                        </span>{' '}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Signup
