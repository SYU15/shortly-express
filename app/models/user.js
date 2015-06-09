var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',

  initialize: function(){
    this.on('creating', function(model, attrs, options){
      console.log("User model doing something....");
    });
  }
});

module.exports = User;
