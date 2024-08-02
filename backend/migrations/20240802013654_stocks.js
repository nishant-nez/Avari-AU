// migrations/20240802013654_stocks.js

exports.up = async function (knex) {
    // Create stocks table
    await knex.schema.createTable('stocks', table => {
        table.increments('id').primary();
        table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
        table.integer('quantity').notNullable().defaultTo(1);
    });
};

exports.down = async function (knex) {
    // Drop stocks table
    await knex.schema.dropTableIfExists('stocks');
}; 
