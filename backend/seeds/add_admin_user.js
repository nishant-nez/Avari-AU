require('dotenv').config();

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('admins').insert([
        {
          username: process.env.ADMIN_USERNAME,
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          role: process.env.ADMIN_ROLE || 'admin', // Default role is 'admin' if not provided
          created_at: new Date()
        }
      ]);
    });
};
