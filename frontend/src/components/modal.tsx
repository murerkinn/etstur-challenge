import CloseIcon from '@mui/icons-material/Close'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'
import ReactModal from 'react-modal'

import updateQuery from '@/lib/update-query'

import Button from './button'

type ModalName = 'login' | 'register'

export const openModal = (name: ModalName) => updateQuery({ modal: name })

export const closeModal = () => updateQuery({ modal: '' })

type Props = Omit<ReactModal.Props, 'isOpen'> & {
  name: string
  title?: string
  isOpen?: boolean
}

const Modal: FC<Props> = ({
  name,
  title,
  className,
  overlayClassName,
  children,
  ...rest
}) => {
  const { query } = useRouter()

  return (
    <ReactModal
      className={cn('modal', className)}
      overlayClassName={cn('modal-overlay', overlayClassName)}
      closeTimeoutMS={150}
      isOpen={query.modal === name}
      onRequestClose={() => updateQuery({ modal: undefined })}
      {...rest}
    >
      <div className="modal-header">
        <h3 className="modal-title">{title}</h3>

        <Button variant="text" className="btn-icon-only" onClick={closeModal}>
          <CloseIcon />
        </Button>
      </div>
      {children}
    </ReactModal>
  )
}

export default Modal
