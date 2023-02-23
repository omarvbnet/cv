// import { GetServerSideProps } from 'next/types'
import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import Home from '../styles/Home.module.css'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Signupstyles from '../styles/SignUp.module.css'
import { signupContext } from '../context/signupContext'

const Index = ({ items }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { setsignupid } = useContext(signupContext)

  const {
    register,

    handleSubmit,
  } = useForm({
    mode: 'all',
  })

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

  return (
    <div>
      <>
        <div className={Home.resume_body}>
          <div className="top_nav">
            <Nav />
          </div>

          <div className={Home.resume_main}>
            <div className={Home.left_image}>
              <h1 className={Home.formtitle}>
                In just minutes, create a job-ready resume
              </h1>
            </div>

            <div className={Home.right_form}>
              <h1 className={Home.form_title}>Create my Resume</h1>

              <p className={Home.sub_title}>
                With quick resume, you can build the right resume today.
              </p>

              <div className={Home.resume_form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={Home.resumelinkinfo}>
                    <label className={Home.getstartedlabel} htmlFor="">
                      Email
                    </label>

                    <input
                      required
                      defaultValue=""
                      className={Signupstyles.getstartedinput}
                      {...register('email')}
                      placeholder="Email"
                      type="email"
                    />
                  </div>

                  <div className={Home.resumelinkinfo}>
                    <label className={Home.getstartedlabel} htmlFor="">
                      Username
                    </label>

                    <input
                      defaultValue=""
                      className={Signupstyles.getstartedinput}
                      {...register('name')}
                      placeholder="Username"
                      type="text"
                      required
                    />
                  </div>
                  <div className={Home.resumelinkinfo}>
                    <label className={Home.getstartedlabel} htmlFor="">
                      Password
                    </label>

                    <input
                      defaultValue=""
                      className={Signupstyles.getstartedinput}
                      {...register('password')}
                      placeholder="password"
                      type="password"
                      required
                    />
                  </div>

                  {loading ? (
                    <button
                      type="submit"
                      className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                    >
                      Loading...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                    >
                      Get started
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default Index
