'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Employees", [
      {name: "Alex", position_id: 2, hire_date: new Date("2021-02-01"), created_at: new Date(), updated_at: new Date()},
      {name: "Lucas", position_id: 1, hire_date: new Date("2021-02-01"), created_at: new Date(), updated_at: new Date()},
      {name: "Camila", position_id: 2, hire_date: new Date("2021-02-01"), created_at: new Date(), updated_at: new Date()}
    ])

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
