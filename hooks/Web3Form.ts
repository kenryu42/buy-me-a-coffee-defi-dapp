import { useReducer, useRef } from 'react'
import {
  FormState,
  FormAction,
  formInitialState,
  formReducer,
} from '../reducers'

export const useForm = () => {
  const [state, dispatch] = useReducer(formReducer, formInitialState)
  const { name, message } = state
  let { nameRef, messageRef } = state

  nameRef = useRef<HTMLInputElement>(null)
  messageRef = useRef<HTMLTextAreaElement>(null)

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_NAME', name: event.target.value } as FormAction)
  }

  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'SET_MESSAGE', message: event.target.value } as FormAction)
  }

  const clearForm = () => {
    dispatch({ type: 'CLEAR_FORM' } as FormAction)
  }

  return {
    name,
    message,
    nameRef,
    messageRef,
    clearForm,
    onNameChange,
    onMessageChange,
  } as FormState
}
