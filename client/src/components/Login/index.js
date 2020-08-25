import React from 'react'
import { useHistory, Link } from 'react-router-dom'

import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from '../../apollo/mutations/user'

import { Form, Button, Spinner } from 'react-bootstrap'
import { FormContainer, CustomBForm, TitleContainer } from './styles'
import { Hero } from '../../assets/styles'

import { useInput } from '../../tools/hooks'
import {
  withFullViewActivityIndicator,
  withAuthCheck,
} from '../../components/HOC'

function Login({ authData }) {
  const history = useHistory()

  React.useEffect(() => {
    !!authData && authData?.isAuthenticated?.success && history.push('/')
  }, [authData])

  const { values, handleChange } = useInput(['email', 'password'])

  const [login, { loading }] = useMutation(LOGIN, {
    variables: {
      emailOrUsername: values.email,
      password: values.password,
    },
    update(_, { data }) {
      console.log('data', data)
      if (data.login.success) {
        localStorage.setItem('token', data.login.token)
        localStorage.setItem('refreshToken', data.login.refreshToken)
        history.push('/')
      }
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
            login()
          }}
        >
          <TitleContainer>
            <h1>Login</h1>
            <Link to="/signup">Register</Link>
          </TitleContainer>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email or Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email/username"
              value={values.email}
              onChange={handleChange}
              name="email"
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
            {!loading ? 'Submit' : <Spinner size="sm" animation="border" />}
          </Button>
        </CustomBForm>
      </FormContainer>
    </Hero>
  )
}

export default withFullViewActivityIndicator(withAuthCheck(Login))
