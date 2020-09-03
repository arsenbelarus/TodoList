export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType,
    error: string | null,
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-APP-STATUS':
            return {...state, status: action.status}
        case 'SET-ERROR-MESSAGE':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'SET-APP-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'SET-ERROR-MESSAGE', error} as const)

type ActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>