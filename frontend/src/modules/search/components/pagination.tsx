import cn from 'classnames'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useAppDispatch } from '@/app/store'
import Button from '@/components/button'
import updateQuery from '@/lib/update-query'

import { setPage } from '../store/search-slice'

type PaginationProps = {
  pageCount: number
}

const Pagination = ({ pageCount }: PaginationProps) => {
  const { query } = useRouter()

  const dispatch = useAppDispatch()

  const pages = useMemo(
    () => Array.from({ length: pageCount }, (_, i) => i + 1),
    [pageCount]
  )

  return (
    <div className="pagination">
      {pages.map(page => (
        <Button
          variant="text"
          key={page}
          className={cn(
            'pagination-item',
            page.toString() === ((query.page as string) || '1') &&
              'pagination-item-active'
          )}
          onClick={() => {
            dispatch(setPage(page))

            updateQuery({ page: page.toString() })
          }}
        >
          {page}
        </Button>
      ))}
    </div>
  )
}

export default Pagination
