import Modal from '@/components/modal'

import LoginForm from './login-form'

const LoginModal = () => {
  return (
    <Modal name="login" title="Login">
      <LoginForm />
    </Modal>
  )
}

export default LoginModal
