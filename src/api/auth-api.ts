import axios from 'axios'
import {TodolistDomainType} from "../state/todolists-reducer";

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': 'a318ecb3-f5df-4512-99ed-aabe354d9b6f'
  }
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings
})

type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  data: D
}

type AuthMeType = {
  id: number
  email: string
  login: string
}

type LoginType = {
  userId: number
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}


export const authAPI = {

  me() {
    return instance.get<ResponseType<AuthMeType>>('/auth/me')
  },
  logout() {
    return instance.delete<ResponseType>('/auth/login')
  },
  login(data: LoginParamsType) {
    return instance.post<ResponseType<LoginType>>('auth/login', data)
  }
}
