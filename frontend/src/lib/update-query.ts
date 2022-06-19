import router from 'next/router'
import { ParsedUrlQuery } from 'querystring'

export default function updateQuery(newQueryParams: ParsedUrlQuery) {
  const query = { ...router.query, ...newQueryParams }

  for (const key in query) {
    if (!query[key]) delete query[key]
  }

  if (JSON.stringify(query) == JSON.stringify(router.query)) return false

  router.push({ query }, undefined, { shallow: true })

  return true
}
