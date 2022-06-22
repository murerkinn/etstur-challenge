import { API } from '@/lib/api'

const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const { data } = await API.post('/account/session', {
    email,
    password,
  })

  return data
}

const logout = async () => {
  return API.delete('/account/session')
}

const AuthService = {
  login,
  logout,
}

export default AuthService
