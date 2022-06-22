import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import startCase from 'lodash/startCase'

interface Props {
  options: { label: string; value: string }[]
  value: string
  onChange(newVal: string): void
}

const Selector = ({ options, value, onChange }: Props) => {
  return (
    <div className="selector">
      <select onChange={e => onChange(e.target.value)} value={value}>
        {options.map(opt => (
          <option value={opt.value} key={opt.value}>
            {startCase(opt.label)}
          </option>
        ))}
      </select>

      <KeyboardArrowDownOutlinedIcon />
    </div>
  )
}

export default Selector
