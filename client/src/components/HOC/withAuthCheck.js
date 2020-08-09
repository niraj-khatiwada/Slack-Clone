import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { checkAuth } from '../../apollo/queries/user'

export default function withAuthCheck(WrappedComponent) {
  return (otherProps) => {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')

    const { loading, data, error } = useQuery(checkAuth, {
      variables: {
        token,
        refreshToken,
      },
      fetchPolicy: 'no-cache',
    })

    console.log(data)

    return (
      <WrappedComponent {...otherProps} loading={loading} authData={data} />
    )
  }
}
