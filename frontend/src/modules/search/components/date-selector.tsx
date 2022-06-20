import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { useCallback, useState } from 'react'

import Selector from './selector'

const dateOptions = [
  'Today',
  'Tomorrow',
  'This Week',
  'In 2 Weeks',
  'This Month',
]

const DateSelector = () => {
  const [selectedSmartDate, setSelectedSmartDate] = useState('')

  const handleChange = useCallback((val: string) => {
    console.log('val')
    setSelectedSmartDate(val)
  }, [])

  return (
    <div className="selector-container">
      <CalendarMonthOutlinedIcon />

      <Selector
        options={dateOptions}
        onChange={handleChange}
        value={selectedSmartDate}
      />
    </div>
  )
}

export default DateSelector
