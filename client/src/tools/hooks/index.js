import React from 'react'

const useInput = (inputArray) => {
  const [values, setValues] = React.useState(
    inputArray.reduce((accumulator, currVal) => {
      if (!accumulator[currVal]) {
        accumulator[currVal] = ''
      } else {
        accumulator[currVal] = currVal
      }
      return accumulator
    }, {})
  )
  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value })
  }
  console.log(values)
  return [values, setValues, handleChange]
}

export { useInput }
