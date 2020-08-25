// @ts-check
import React from 'react'
import { useHistory, Link } from 'react-router-dom'

import { useMutation } from '@apollo/react-hooks'
import { SIGNUP } from '../../apollo/mutations/user'

import { Form, Button, Spinner } from 'react-bootstrap'
import { FormContainer, CustomBForm, TitleContainer } from '../Login/styles'
import { Hero } from '../../assets/styles'

import { useInput } from '../../tools/hooks'

export default function Login() {
  const { values, setValues, handleChange } = useInput([
    'email',
    'password',
    'username',
  ])
  const history = useHistory()

  const [signUp, { loading }] = useMutation(SIGNUP, {
    variables: {
      email: values.email,
      username: values.username,
      password: values.password,
    },
    update(_, { data }) {
      console.log('data', data)
    },
    onError(error) {
      console.log('--error---', { error })
    },
  })

  return (
    <Hero>
      <FormContainer>
        <CustomBForm
          onSubmit={(evt) => {
            evt.preventDefault()
            signUp()
          }}
        >
          <TitleContainer>
            <h1>SignUp</h1>
            <Link to="/login">Login</Link>
          </TitleContainer>
          <Form.Group controlId="signUpEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email "
              value={values.email}
              onChange={handleChange}
              name="email"
            />
          </Form.Group>
          <Form.Group controlId="signUpUsername">
            <Form.Label> Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={values.username}
              onChange={handleChange}
              name="username"
            />
          </Form.Group>

          <Form.Group controlId="signUpPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={values.password}
              onChange={handleChange}
              name="password"
            />
          </Form.Group>
          <Button variant="info" type="submit" style={{ minWidth: '100px' }}>
            {!loading ? 'Submit' : <Spinner size="sm" animation="border" />}
          </Button>
        </CustomBForm>
      </FormContainer>
    </Hero>
  )
}
