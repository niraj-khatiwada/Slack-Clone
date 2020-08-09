import React from 'react'
import { useMutation, gql } from '@apollo/react-hooks'

export default function Login() {
  const [values, setValues] = React.useState({
    name: '',
  })

  const [createTeam, { loading }] = useMutation(
    gql`
      mutation($name: String!) {
        createTeam(name: $name) {
          success
          errors {
            path
            message
          }
          message
        }
      }
    `,
    {
      update(_, { data: createTeam }) {
        console.log('data', context)
      },
      variables: {
        name: values.name,
      },
      onError({ graphQLErrors }) {
        graphQLErrors
      },
    }
  )
  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value })
  }
  return (
    <div>
      <form
        onSubmit={(evt) => {
          evt.preventDefault()
          createTeam()
        }}
      >
        <label htmlFor="name">Team Name</label>
        <input
          type="text"
          id="name"
          value={values.name}
          onChange={handleChange}
          name="name"
        />
        <button type="submit">{loading ? '...loading' : 'Create'}</button>
      </form>
    </div>
  )
}
