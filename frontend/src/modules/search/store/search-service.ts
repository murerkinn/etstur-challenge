import { ParsedUrlQuery } from 'querystring'

import { API } from '@/lib/api'

const search = async (params: ParsedUrlQuery) => {
  const { data } = await API.get('/search', {
    params,
  })

  return data
}

const getCategories = async () => {
  const { data } = await API.get('/category')

  return data
}

const getPopularEvents = async () => {
  const { data } = await API.get('/search/popular')

  return data
}

const SearchService = {
  search,
  getCategories,
  getPopularEvents,
}

export default SearchService
