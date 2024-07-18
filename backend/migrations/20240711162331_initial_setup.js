// migrations/20240711162331_initial_setup.js

exports.up = async function (knex) {
    // Create admin table
    await knex.schema.createTable('admins', table => {
        table.increments('id').primary();
        table.string('username', 100).notNullable().unique();
        table.string('email', 100).unique();
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
        table.string('image').notNullable().defaultTo('images/profile/default.jpg');
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
        table.string('image').notNullable().defaultTo('images/products/default.jpg');
        table.integer('category_id').unsigned().notNullable().references('id').inTable('categories').onDelete('CASCADE');
        // precision and scale
        table.decimal('price', 10, 2).notNullable();
        table.string('description').notNullable();
        table.enu('unit', ['pcs', 'kg']).notNullable();
        table.integer('vendor_id').unsigned().notNullable().references('id').inTable('vendors').onDelete('CASCADE');
        table.timestamps(true, true);
    });

    // Create default_values table
    await knex.schema.createTable('default_values', table => {
        table.increments('id').primary();
        table.decimal('minimum_order', 10, 2).notNullable().defaultTo(600.00);
        table.timestamps(true, true);
    });

    // Create orders table
    await knex.schema.createTable('orders', table => {
        table.increments('id').primary();
        table.string('stripe_id').unique().notNullable();
        table.decimal('amount_subtotal', 10, 2).notNullable();
        table.decimal('amount_total', 10, 2).notNullable();
        table.string('city').nullable();
        table.string('country').nullable();
        table.string('address_line_1').nullable();
        table.string('address_line_2').nullable();
        table.string('postal_code').nullable();
        table.string('state').nullable();
        table.string('name').nullable();
        table.string('email').nullable();
        table.string('phone').nullable();
        table.string('currency', 10).nullable();
        table.decimal('shipping_cost', 10, 2).nullable();
        table.string('status').defaultTo('To be delivered');
        table.timestamps(true, true);
    });

    // Create order_items table
    await knex.schema.createTable('order_items', table => {
        table.increments('id').primary();
        table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE');
        table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
        table.integer('quantity').notNullable();
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

    // Drop minimum_order table
    await knex.schema.dropTableIfExists('minimum_order');

    // Drop orders table
    await knex.schema.dropTableIfExists('orders');

    // Drop order_items table
    await knex.schema.dropTableIfExists('order_items');
}; 
