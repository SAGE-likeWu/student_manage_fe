import Cookies from 'js-cookie'

const TokenKey = 'TOKEN'
const Username = 'FWUSERNAME'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getUserName () {
  return Cookies.get(Username)
}

export function setUserName (val, params = {}) {
  return Cookies.set(Username, val, params)
}

export function removeUserName () {
  return Cookies.remove(Username)
}
