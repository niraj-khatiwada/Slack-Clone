import React from 'react'
import { useMutation, gql } from '@apollo/react-hooks'
import { useHistory, Link } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'
import { FormContainer, CustomBForm, TitleContainer } from '../Login/styles'
import { Hero } from '../../assets/styles'

export default function Login() {
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    username: '',
  })
  const history = useHistory()

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
      update(_, { data }) {
        console.log('data', data)
        if (data.login.success) {
          localStorage.setItem('token', data.login.token)
          localStorage.setItem('refreshToken', data.login.refreshToken)
          history.push('/createTeam')
        }
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
    <Hero>
      <FormContainer>
        <CustomBForm
          onSubmit={(evt) => {
            evt.preventDefault()
            login()
          }}
        >
          <TitleContainer>
            <h1>SignUp</h1>
            <Link to="/login">Login</Link>
          </TitleContainer>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email "
              value={values.email}
              onChange={handleChange}
              name="email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={values.username}
              onChange={handleChange}
              name="username"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={values.password}
              onChange={handleChange}
              name="password"
            />
          </Form.Group>
          <Button variant="info" type="submit">
            Submit
          </Button>
        </CustomBForm>
      </FormContainer>
    </Hero>
  )
}
