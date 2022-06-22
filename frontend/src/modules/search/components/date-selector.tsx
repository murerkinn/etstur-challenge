import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import moment from 'moment'
import { useCallback, useState } from 'react'
import { DateRangePicker } from 'react-dates'

import { useAppDispatch, useAppSelector } from '@/app/store'

import { setDates } from '../store/search-slice'

const DateSelector = () => {
  const dispatch = useAppDispatch()
  const { startsAt, endsAt } = useAppSelector(state => state.search)

  const [focusedInput, setFocusedInput] = useState<any>(null)

  const handleChange = useCallback((dates: any) => {
    dispatch(
      setDates({
        startsAt: dates.startDate.format('YYYY-MM-DD'),
        endsAt: dates.endDate ? dates.endDate.format('YYYY-MM-DD') : null,
      })
    )
  }, [])

  return (
    <div className="selector-container">
      <CalendarMonthOutlinedIcon />

      <DateRangePicker
        hideKeyboardShortcutsPanel
        startDate={moment(startsAt)}
        startDateId="your_unique_start_date_id"
        endDate={moment(endsAt)}
        endDateId="your_unique_end_date_id"
        onDatesChange={handleChange}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
      />
    </div>
  )
}

export default DateSelector
