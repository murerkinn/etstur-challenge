import { useAppSelector } from '@/app/store'

import Button from './button'
import Logo from './logo'
import { openModal } from './modal'
import ProfileInfo from './profile-info'

const Header = () => {
  const { user } = useAppSelector(state => state.auth)

  return (
    <header className="header">
      <div className="container header-inner">
        <Logo />

        {user ? (
          <ProfileInfo />
        ) : (
          <div className="btn-group">
            <Button
              className="invert"
              size="small"
              onClick={() => openModal('login')}
            >
              Login
            </Button>
            <Button
              className="invert"
              size="small"
              onClick={() => openModal('register')}
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
