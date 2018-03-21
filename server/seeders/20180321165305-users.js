const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    firstName: 'Admin',
    lastName: 'Admin2',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('password', 10),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, {
    firstName: 'Dummy',
    lastName: 'Dummy2',
    email: 'dummy@dummy.com',
    password: bcrypt.hashSync('password', 10),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users')
};
