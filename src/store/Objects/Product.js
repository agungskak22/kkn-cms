export default class ProductData {
  constructor (id = null, about, description, files, legislatedAt, setAt, status, type, year) {
    this.id = id
    this.about = about
    this.description = description
    this.files = files
    this.legislatedAt = legislatedAt
    this.setAt = setAt
    this.status = status
    this.type = type
    this.year = year
  }
}
