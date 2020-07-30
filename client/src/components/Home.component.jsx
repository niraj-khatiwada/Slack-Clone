import React from 'react'
import { useQuery, gql } from '@apollo/react-hooks'

export default function Home() {
  const { loading, data, error } = useQuery(gql`
    {
      users {
        username
        email
      }
    }
  `)
  console.log(data)
  return (
    <div>
      {loading ? (
        <h1>...Loading</h1>
      ) : (
        data && data.users.map((user) => <h1>{user.username}</h1>)
      )}
    </div>
  )
}
