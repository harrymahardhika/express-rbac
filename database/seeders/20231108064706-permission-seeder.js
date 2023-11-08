'use strict'
const permission = require('../../app/constants/permission')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const insertPermission = []

    for (const key in permission) {
      insertPermission.push({
        name: permission[key],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    await queryInterface.bulkInsert('Permissions', insertPermission)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {})
  }
}
