import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

import { useAppSelector } from '@/app/store'

const ProfileInfo = () => {
  const { user } = useAppSelector(state => state.auth)

  return user ? (
    <div className="profile-info">
      <PersonOutlineOutlinedIcon />

      <div className="profile-info-content">
        <span>{user.firstName + ' ' + user.lastName}</span>
        <span>{user.email}</span>
      </div>
    </div>
  ) : null
}

export default ProfileInfo
