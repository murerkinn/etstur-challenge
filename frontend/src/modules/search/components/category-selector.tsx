import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'

import { useAppDispatch, useAppSelector } from '@/app/store'
import categories from '@/constants/categories'

import { setCategory } from '../store/search-slice'
import Selector from './selector'

const CategorySelector = () => {
  const dispatch = useAppDispatch()
  const { category } = useAppSelector(state => state.search)

  return (
    <div className="selector-container">
      <CategoryOutlinedIcon />

      <Selector
        options={categories}
        value={category}
        onChange={newVal => dispatch(setCategory(newVal))}
      />
    </div>
  )
}

export default CategorySelector
