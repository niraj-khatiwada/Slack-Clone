import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function withFullViewActivityIndicator(WrappedComponent) {
  return ({ loading, ...otherProps }) => (
    <>
      {!loading ? (
        <WrappedComponent {...otherProps} />
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            backgroundClip: 'red',
          }}
        >
          <Spinner size="lg" animation="border" />
        </div>
      )}
    </>
  )
}
