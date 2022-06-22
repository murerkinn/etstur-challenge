import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import cn from 'classnames'
import { useMemo } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import cities from '@/constants/cities'

import { setCity } from '../store/search-slice'
import Selector from './selector'

type Props = {
  className?: string
}

const CitySelector = ({ className }: Props) => {
  const dispatch = useAppDispatch()
  const { city } = useAppSelector(state => state.search)

  const transposedCities = useMemo(
    () => cities.map(c => ({ label: c.city, value: c.city })),
    []
  )

  return (
    <div className={cn(className, 'selector-container')}>
      <FmdGoodOutlinedIcon />

      <Selector
        options={transposedCities}
        value={city}
        onChange={newVal => dispatch(setCity(newVal))}
      />
    </div>
  )
}

export default CitySelector
