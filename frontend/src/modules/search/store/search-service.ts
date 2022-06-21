import { ParsedUrlQuery } from 'querystring'

import { API } from '@/lib/api'

const search = async (params: ParsedUrlQuery) => {
  const { data } = await API.get('/search', {
    params,
  })

  return data
}

const SearchService = {
  search,
}

export default SearchService
