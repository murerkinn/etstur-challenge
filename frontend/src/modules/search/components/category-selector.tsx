import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import cn from 'classnames'
import { useMemo } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'

import { setCategory } from '../store/search-slice'
import Selector from './selector'

type Props = {
  className?: string
}

const CategorySelector = ({ className }: Props) => {
  const dispatch = useAppDispatch()
  const { category, categories } = useAppSelector(state => state.search)

  const transposedCategories = useMemo(
    () => categories.map(c => ({ label: c.name, value: c._id })),
    [categories]
  )

  return (
    <div className={cn(className, 'selector-container')}>
      <CategoryOutlinedIcon />

      <Selector
        options={transposedCategories}
        value={category}
        onChange={newVal => dispatch(setCategory(newVal))}
      />
    </div>
  )
}

export default CategorySelector
