exports.up = function (knex) {
    return knex.schema.table('default_values', function (table) {
        table.decimal('delivery_fee', 10, 2).defaultTo(10.00).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table('default_values', function (table) {
        table.dropColumn('delivery_fee');
    });
};
