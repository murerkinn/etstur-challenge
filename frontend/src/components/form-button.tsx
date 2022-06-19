import { useFormikContext } from 'formik'
import { FC } from 'react'

import Button, { ButtonProps } from './button'

const FormButton: FC<ButtonProps> = props => {
  const { isValid } = useFormikContext()

  return <Button type="submit" disabled={!isValid} {...props} />
}

export default FormButton
