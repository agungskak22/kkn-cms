export default class UserData {
  constructor (id = null, fullName, username, password, confirmPassword) {
    this.id = id
    this.fullName = fullName
    this.username = username
    this.password = password
    this.confirmPassword = confirmPassword
  }
}
