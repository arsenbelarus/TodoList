import {setIsLoggedInAC} from "../login/auth-reducer";
import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
  status: RequestStatusType,
  error: string | null,
  isInitialized: boolean
}

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET-APP-STATUS':
      return {...state, status: action.status}
    case 'SET-ERROR-MESSAGE':
      return {...state, error: action.error}
    case 'SET-IS-INITIALIZED':
      return {...state, isInitialized: action.isInitialized}
    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'SET-APP-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'SET-ERROR-MESSAGE', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'SET-IS-INITIALIZED', isInitialized} as const)


export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
    } else {
      dispatch(setIsLoggedInAC(false))
    }
    dispatch(setIsInitializedAC(true))
  })
}


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

type ActionsType =
  | SetAppStatusActionType
  | SetAppErrorActionType
  | SetIsInitializedActionType