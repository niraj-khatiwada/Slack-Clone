import React from 'react'
import { useMutation, gql } from '@apollo/react-hooks'

export default function Login() {
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  })

  const [login, { loading }] = useMutation(
    gql`
      mutation($emailOrUsername: String!, $password: String!) {
        login(emailOrUsername: $emailOrUsername, password: $password) {
          success
          message
          errors {
            path
            message
          }
          token
          refreshToken
        }
      }
    `,
    {
      update(_, { data: login }) {
        console.log('data', login)
        login.success &&
          localStorage.setItem('token', login.token) &&
          localStorage.setItem('refreshToken', login.refreshToken)
      },
      variables: {
        emailOrUsername: values.email,
        password: values.password,
      },
      onError(error) {
        console.log('--error---', { error })
      },
    }
  )
  console.log(values)
  const handleChange = (evt) => {
    evt.preventDefault()
    setValues({ ...values, [evt.target.name]: evt.target.value })
  }
  return (
    <div>
      <form
        onSubmit={(evt) => {
          evt.preventDefault()
          login()
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          name="password"
        />
        <button type="submit">{loading ? '...loading' : 'Submit'}</button>
      </form>
    </div>
  )
}
