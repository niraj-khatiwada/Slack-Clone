import styled from 'styled-components'
import { Form } from 'react-bootstrap'

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10rem;
`
export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

export const CustomBForm = styled(Form)`
  width: 25rem;
  padding: 5rem 2rem 3rem 2rem;
  border-radius: 0.5rem;
  -webkit-box-shadow: 12px 10px 24px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 12px 10px 24px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 12px 10px 24px 0px rgba(0, 0, 0, 0.75);
  background-color: white;
`
