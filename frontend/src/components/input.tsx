import cn from 'classnames'
import { useFormikContext } from 'formik'
import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react'

type Props = HTMLProps<HTMLInputElement> & {
  label: string
  name: string
  wrapperClassName?: string
  wrapperProps?: HTMLProps<HTMLDivElement>
}

const Input = ({
  label,
  wrapperClassName,
  wrapperProps,
  id,
  name,
  className,
  onFocus,
  onBlur,
  onChange,
  ...rest
}: Props) => {
  const formikContext = useFormikContext<Record<string, string>>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState(rest.value)

  const error = useMemo(() => {
    if (!formikContext) return null

    const { errors, touched } = formikContext

    if (!touched[name]) return null

    return errors[name]
  }, [formikContext, name])

  useEffect(() => {
    setValue(rest.value)
  }, [rest.value])

  return (
    <div
      className={cn(
        'input-wrapper',
        (value || focused) && 'focused',
        error && 'with-error',
        wrapperClassName
      )}
      {...wrapperProps}
      onClick={() => inputRef?.current?.focus()}
    >
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        className={cn('input', className)}
        {...rest}
        onChange={e => {
          setValue(e.target.value)
          onChange && onChange(e)
        }}
        onFocus={e => {
          setFocused(true)
          onFocus && onFocus(e)
        }}
        onBlur={e => {
          setFocused(false)
          onBlur && onBlur(e)
        }}
      />
      {error && <div className="input-error">{error}</div>}
    </div>
  )
}

export default Input
