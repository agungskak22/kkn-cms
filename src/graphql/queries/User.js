import gql from 'graphql-tag'
export const GET_USER_LIST = gql`query{
  users{
      id,
    username,
    fullName
  }
}`
