/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("rank", (table) => {
    table.increments("id").primary();
    table.text("difficulty").notNullable();
    table.text("name", 128).notNullable();
    table.integer("mark").notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("rank");
};
