const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'created_at', {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
    })
    await queryInterface.addColumn('blogs', 'updated_at', {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
    })
    await queryInterface.addColumn('users', 'created_at', {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
    })
    await queryInterface.addColumn('users', 'updated_at', {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'created_at')
    await queryInterface.removeColumn('blogs', 'updated_at')
    await queryInterface.removeColumn('users', 'created_at')
    await queryInterface.removeColumn('users', 'updated_at')
  },
}
