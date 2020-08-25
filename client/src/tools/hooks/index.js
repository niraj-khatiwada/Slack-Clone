import React from 'react'

const useInput = (inputArray) => {
  const [values, setValues] = React.useState(
    inputArray.reduce((accumulator, currVal) => {
      accumulator[currVal] = ''
      return accumulator
    }, {})
  )
  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value })
  }
  console.log(values)
  return { values, setValues, handleChange }
}

export { useInput }
