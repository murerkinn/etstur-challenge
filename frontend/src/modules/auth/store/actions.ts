import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import AuthService from './auth-service'
import { LoginActionPayload } from './types'

export const login = createAsyncThunk<any, LoginActionPayload>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return AuthService.login({ email, password })
    } catch (error) {
      throw rejectWithValue(error as AxiosError)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      return AuthService.logout()
    } catch (error) {
      throw rejectWithValue(error as AxiosError)
    }
  }
)
