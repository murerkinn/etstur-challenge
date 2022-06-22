import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Category, SearchStore } from './types'

const searchParams = new URLSearchParams(global?.location?.search)

const initialState: SearchStore = {
  city: searchParams.get('city') || '',
  startsAt: searchParams.get('startsAt') || '',
  endsAt: searchParams.get('endsAt') || '',
  textSearch: searchParams.get('textSearch') || '',
  category: searchParams.get('category') || '',
  pageLimit: 10,
  page: parseInt(searchParams.get('page') || '1'),
  loading: true,
  events: [],
  totalPageCount: 1,
  categories: [],
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
    setCategories(state: SearchStore, action: PayloadAction<Category[]>) {
      state.categories = action.payload
    },
  },
  extraReducers: {
    'search/search/pending': state => {
      state.loading = true
    },
    'search/search/fulfilled': (state, action) => {
      state.loading = false
      state.events = action.payload.list
      state.totalPageCount = action.payload.totalPageCount
    },
  },
})

export const {
  setCity,
  setDates,
  setTextSearch,
  setCategory,
  setPage,
  setCategories,
} = searchSlice.actions

export const searchReducer = searchSlice.reducer
