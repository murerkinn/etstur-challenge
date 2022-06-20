import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SearchStore } from './types'

const initialState: SearchStore = {
  city: '',
  startsAt: '',
  endsAt: '',
  query: '',
  category: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCity(state: SearchStore, action: PayloadAction<string>) {
      state.city = action.payload
    },
    setDates(
      state: SearchStore,
      action: PayloadAction<{ startsAt: string; endsAt: string }>
    ) {
      state.startsAt = action.payload.startsAt
      state.endsAt = action.payload.endsAt
    },
    setQuery(state: SearchStore, action: PayloadAction<string>) {
      state.query = action.payload
    },
    setCategory(state: SearchStore, action: PayloadAction<string>) {
      state.category = action.payload
    },
  },
})

export const { setCity, setDates, setQuery, setCategory } = searchSlice.actions

export const searchReducer = searchSlice.reducer
