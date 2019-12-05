import gql from 'graphql-tag'
export const USER_LOGIN = gql`mutation(
  $username: String,
  $password: String
){
  authenticate(username: $username, password: $password)
}`

export const USER_CREATE = gql`mutation(
  $username: String,
  $fullName: String,
  $confirmPassword: String,
  $password: String
){
  createUser(
      payload : { 
      username: $username, fullName: $fullName, password: $password, confirmPassword: $confirmPassword
  }) {
    id,
    username,
    fullName
  }
}`

export const USER_DELETE = gql`mutation(
  $id: Int
){
  deleteUser(id: $id)
}`
