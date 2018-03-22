module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Businesses', [{
      userId: 1,
      name: 'Good Fashion Ltd',
      details: 'Good fashion, good people.',
      location: 'lagos',
      category: 'fashion',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, {
      userId: 2,
      name: 'IT Solutions Ltd',
      details: 'Technological solutions at your finger tip.',
      location: 'abuja',
      category: 'technology',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Businesses')
};
