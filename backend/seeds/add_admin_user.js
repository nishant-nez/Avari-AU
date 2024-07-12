require('dotenv').config();

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('admins').del()
    .then(function () {
      // Inserts seed entries
      return knex('admins').insert([
        {
          username: process.env.ADMIN_USERNAME,
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
        }
      ]);
    });
};
