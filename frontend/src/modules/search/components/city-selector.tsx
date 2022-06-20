import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'

import { useAppDispatch, useAppSelector } from '@/app/store'
import cities from '@/constants/cities'

import { setCity } from '../store/search-slice'
import Selector from './selector'

const CitySelector = () => {
  const dispatch = useAppDispatch()
  const { city } = useAppSelector(state => state.search)

  return (
    <div className="selector-container">
      <FmdGoodOutlinedIcon />

      <Selector
        options={cities}
        value={city}
        onChange={newVal => dispatch(setCity(newVal))}
      />
    </div>
  )
}

export default CitySelector
