import gql from 'graphql-tag'

export const PRODUCT_CREATE = gql`mutation(
  $about: String,
  $description: String,
  $legislatedAt: String,
  $setAt: String,
  $statusId: Int,
  $typeId: Int,
  $year: Int,
  $files: [FileInput]
){
  createProduct(
      payload : { 
        about: $about,
        description: $description,
        legislatedAt: $legislatedAt,
        setAt: $setAt,
        statusId: $statusId,
        typeId: $typeId,
        year: $year,
        files: $files
  }) {
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
  },
}`
export const PRODUCT_EDIT = gql`mutation(
  $id: Int,
  $about: String,
  $description: String,
  $legislatedAt: String,
  $setAt: String,
  $statusId: Int,
  $typeId: Int,
  $year: Int,
  $files: [FileInput]){
  
    updateProduct(
      id: $id,
      payload : {
        about: $about,
        description: $description,
        legislatedAt: $legislatedAt,
        setAt: $setAt,
        statusId: $statusId,
        typeId: $typeId,
        year: $year,
        files: $files
      }) {
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
export const PRODUCT_DELETE = gql`mutation(
  $id: Int
){
  deleteProduct(id: $id)
}`
