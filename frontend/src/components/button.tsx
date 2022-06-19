import cn from 'classnames'
import { ButtonHTMLAttributes, FC, HTMLProps } from 'react'

export interface ButtonProps
  extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  variant?: 'primary' | 'secondary' | 'text' | 'link' | 'icon-only'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  onClick?: () => void
}

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>['type']

const Button: FC<ButtonProps> = ({
  variant = 'secondary',
  children,
  size,
  loading = false,
  type = 'button',
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type as ButtonType}
      className={cn(
        'btn',
        `btn-${variant}`,
        size && `btn-${size}`,
        loading && 'btn-loading',
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
