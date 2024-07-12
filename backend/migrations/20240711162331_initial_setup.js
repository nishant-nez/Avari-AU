// migrations/20240711162331_initial_setup.js

exports.up = async function (knex) {
    // Create admin table
    await knex.schema.createTable('admins', table => {
        table.increments('id').primary();
        table.string('username', 100).notNullable().unique();
        table.string('email', 100).unique().notNullable();
        table.string('password').notNullable();
        // created_at, updated_at
        table.timestamps(true, true);
    });

    // Create vendor table
    await knex.schema.createTable('vendors', table => {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.string('email', 100).unique().notNullable();
        table.string('password').notNullable();
        table.string('location').notNullable();
        table.string('state').notNullable();
        table.string('country').notNullable();
        table.decimal('latitude', 9, 6);
        table.decimal('longitude', 9, 6);
        table.string('phone', 15).notNullable();
        table.timestamps(true, true);
    });

    // Create category table
    await knex.schema.createTable('categories', table => {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.timestamps(true, true);
    });

    // Create product table
    await knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.integer('category_id').unsigned().notNullable().references('id').inTable('categories').onDelete('CASCADE');
        // precision and scale
        table.decimal('price', 10, 2).notNullable();
        table.enu('unit', ['pcs', 'kg']).notNullable();
        table.integer('vendor_id').unsigned().notNullable().references('id').inTable('vendors').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

exports.down = async function (knex) {
    // Drop product table first because it has foreign key references
    await knex.schema.dropTableIfExists('products');

    // Drop category table
    await knex.schema.dropTableIfExists('categories');

    // Drop vendor table
    await knex.schema.dropTableIfExists('vendors');

    // Drop admin table
    await knex.schema.dropTableIfExists('admins');
}; 
