import {Dispatch} from 'redux'
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../state/app-reducer'
import {authAPI, LoginParamsType} from "../api/auth-api";

const initialState: InitialStateType = {
  isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.login(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
      } else {
        dispatch(setAppErrorAC(res.data.messages[0]))
      }
    })
    .catch((error) => {
      dispatch(setAppErrorAC(error.message))
    })
    .finally(() => {
      dispatch(setAppStatusAC('idle'))
    })
}

export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
  debugger
  dispatch(setAppStatusAC('loading'))
  const res = await authAPI.logout()
  try {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(false))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      dispatch(setAppErrorAC(res.data.messages[0]))
    }
  } catch (error) {
    dispatch(setAppErrorAC(error.message))
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}


// types
export type FormErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
  captcha?: string
}

type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
type InitialStateType = {
  isLoggedIn: boolean
}
