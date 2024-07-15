exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('default_values').del()
    .then(function () {
      // Inserts seed entries
      return knex('default_values').insert([
        {
          minimum_order: 600.00
        }
      ]);
    });
};
