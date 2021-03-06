module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Reviews', [{
    userId: 1,
    businessId: 1,
    content: 'Great designs. Great customer service.',
    star: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, {
    userId: 2,
    businessId: 2,
    content: 'They are really who they said they are. Good job.',
    star: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Reviews')
};
