var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'shortlydb',
    charset: 'utf8',
    filename: path.join(__dirname, '../db/shortly.sqlite')
  }
});

//one user has many URLs, one url is associated with one user
//pass user primary key into url

db.knex.schema.hasTable('users').then(function(exists){

  if (!exists) {
    db.knex.schema.createTable('users', function( user ){
      user.increments('id').primary();
      user.string('username', 255);
      user.string('password', 255);
      user.string('salt', 255);
      user.string('authentication',100);
      user.timestamps();
    }).then(function(table) {
      console.log('Created table users', table);
    });
  }
});

// db.knex.schema.hasTable('tokens').then(function(exists){
//   if (!exists) {
//     db.knex.schema.createTable('tokens', function( token ){
//       token.increments('id').primary();
//       token.string('user_id', 255).references('id').inTable('users');
//       token.string('token_id', 255);
//       token.timestamps();
//     }).then(function(table) {
//       console.log('Created table tokens', table);
//     });
//   }

// });
db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('user_id').references('id').inTable('users');
      link.string('url', 255);
      link.string('base_url', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table urls', table);
    });
  }
});

db.knex.schema.hasTable('clicks').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('clicks', function (click) {
      click.increments('id').primary();
      click.integer('link_id').references('url').inTable('urls');
      click.timestamps();
    }).then(function (table) {
      console.log('Created Table clicks', table);
    });
  }
});

/************************************************************/
// Add additional schema definitions below
/************************************************************/


module.exports = db;
