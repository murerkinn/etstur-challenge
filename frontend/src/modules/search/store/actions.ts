import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ParsedUrlQuery } from 'querystring'

import SearchService from './search-service'

export const search = createAsyncThunk<any, ParsedUrlQuery>(
  'search/search',
  async (query, { rejectWithValue }) => {
    try {
      return SearchService.search(query)
    } catch (error) {
      throw rejectWithValue(error as AxiosError)
    }
  }
)
