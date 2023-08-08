import loginService from '../services/loginService'

export let token = null
export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const isJWTExpired = async (token) => {
  token = token?.split(' ')[1]
  const jwtPayload = JSON.parse(window.atob(token?.split('.')[1]))
  if (Date.now() >= jwtPayload.exp * 1000) {
    const newToken = await loginService.refreshTokenAndLogin()
    setToken(newToken[0])
  }
}

export default { token, setToken, isJWTExpired }