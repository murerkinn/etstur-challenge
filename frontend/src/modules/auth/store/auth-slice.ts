import { createSlice } from '@reduxjs/toolkit'

import { AuthStore } from './types'

const initialState: AuthStore = {
  user: null,
  error: null,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    'auth/login/pending': state => {
      state.loading = true
      state.error = null
    },
    'auth/login/fulfilled': (state, action) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    'auth/login/rejected': (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    'auth/getUser/fulfilled': (state, action) => {
      state.user = action.payload
      state.error = null
    },
    'auth/logout/fulfilled': state => {
      state.user = null
      state.error = null
    },
  },
})

export const authReducer = authSlice.reducer
