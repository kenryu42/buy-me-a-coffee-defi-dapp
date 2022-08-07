import type { RefObject } from 'react'

export type FormState = {
  name: string
  message: string
  nameRef: RefObject<HTMLInputElement> | null
  messageRef: RefObject<HTMLTextAreaElement> | null
  clearForm: (() => void) | null
  onNameChange: (() => void) | null
  onMessageChange: (() => void) | null
}

export const formInitialState: FormState = {
  name: '',
  message: '',
  nameRef: null,
  messageRef: null,
  clearForm: null,
  onNameChange: null,
  onMessageChange: null,
}

export type FormAction =
  | {
      type: 'SET_NAME'
      name: FormState['name']
    }
  | {
      type: 'SET_MESSAGE'
      message: FormState['message']
    }
  | {
      type: 'CLEAR_FORM'
    }

export const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name,
      }
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.message,
      }
    case 'CLEAR_FORM':
      return {
        ...state,
        name: '',
        message: '',
      }
    default:
      throw new Error('Unhandled action type in formReducer')
  }
}
