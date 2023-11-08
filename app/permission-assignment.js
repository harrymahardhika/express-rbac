const role = require('./constants/role')
const permission = require('./constants/permission')

module.exports = {
  [role.ADMINISTRATOR]: [
    permission.BROWSE_BOOKS,
    permission.READ_BOOK,
    permission.EDIT_BOOK,
    permission.ADD_BOOK,
    permission.DELETE_BOOK
  ],

  [role.CUSTOMER]: [permission.BROWSE_BOOKS, permission.READ_BOOK]
}
