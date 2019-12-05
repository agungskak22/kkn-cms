import gql from 'graphql-tag'
export const GET_PRODUCT_LIST = gql`query{
  products{
    id,
    about,
    description,
    legislatedAt,
    setAt,
    year,
    status {
      id,
      name
    },
    type {
      id,
      name
    },
    files {
      fileName,
      mimeType,
      url
    }
  }
}`

export const GET_PRODUCT = gql`query($id: Int){
  product(id: $id){
    id,
    about,
    description,
    legislatedAt,
    setAt,
    year,
    status {
      id,
      name
    },
    type {
      id,
      name
    },
    files {
      fileName,
      mimeType,
      url
    }
  }
}`

export const GET_PRODUCT_STATUS = gql`query{
  productStatuses{
    id,
    name
  }
}`
export const GET_PRODUCT_TYPE = gql`query{
  productTypes{
    id,
    name
  }
}`
