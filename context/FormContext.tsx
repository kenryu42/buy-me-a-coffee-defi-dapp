import { ReactNode, createContext, useContext } from 'react'
import { FormState, formInitialState } from '../reducers'
import { useForm } from '../hooks'

const FormContext = createContext<FormState>(formInitialState)

interface Props {
  children: ReactNode
}

export const FormContextProvider = ({ children }: Props) => {
  const formState = useForm()

  return (
    <FormContext.Provider value={formState}>{children}</FormContext.Provider>
  )
}

export function useFormContext() {
  return useContext(FormContext)
}
