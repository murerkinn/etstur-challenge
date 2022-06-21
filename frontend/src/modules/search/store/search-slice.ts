import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SearchStore } from './types'

const searchParams = new URLSearchParams(global?.location?.search)

const initialState: SearchStore = {
  city: searchParams.get('city') || '',
  startsAt: searchParams.get('startsAt') || '',
  endsAt: searchParams.get('endsAt') || '',
  textSearch: searchParams.get('textSearch') || '',
  category: searchParams.get('category') || '',
  pageLimit: 10,
  page: parseInt(searchParams.get('page') || '1'),
  loading: false,
  events: [],
  totalPageCount: 1,
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
    setTextSearch(state: SearchStore, action: PayloadAction<string>) {
      state.textSearch = action.payload
    },
    setCategory(state: SearchStore, action: PayloadAction<string>) {
      state.category = action.payload
    },
    setPage(state: SearchStore, action: PayloadAction<number>) {
      state.page = action.payload
    },
  },
  },
})

export const { setCity, setDates, setTextSearch, setCategory, setPage } =
  searchSlice.actions

export const searchReducer = searchSlice.reducer
