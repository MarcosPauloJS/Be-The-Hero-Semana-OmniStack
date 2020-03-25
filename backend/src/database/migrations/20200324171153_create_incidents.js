
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){
        table.increments();

        table.string('title').notNullabel;
        table.string('description').notNullabel;
        table.string('value').notNullabel;

        table.string('ong_id').notNullabel;

        table.foreign('ong_id').references('id').inTable('ongs');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
