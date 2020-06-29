var db = require('../utils/db').db;
const uuid = require('uuid/v1');

class User {
  static all(callback) {
    db('sys_users')
      .select()
      .asCallback((error, users) => {
        if (error) {
          console.error(error.message);
          callback(false, error.message, users);
        } else {
          callback(true, '', users);
        }
      });
  }

  static getById(id, callback) {
    db('sys_users')
      .where('id', id)
      .asCallback((error, data) => {
        if (error) {
          console.error(error.message);
          callback(false, error.message, undefined);
        } else {
          callback(true, '', data[0]);
        }
      });
  }

  static updateById(id, user, callback) {
    db('sys_users')
      .where('id', id)
      .update(user)
      .asCallback(error => {
        if (error) {
          console.error(error.message);
          callback(false, error.message);
        } else {
          callback(true, '');
        }
      });
  }

  static register(user, callback) {
    user.uid = uuid();
    db('sys_users')
      .insert(user)
      .asCallback(error => {
        if (error) {
          console.error(error.message);
          callback(false, error.message);
        } else {
          callback(true, '');
        }
      });
  }

  static check(username, password, callback) {
    db('sys_users')
      .select()
      .where({
        username: username,
        password: password
      })
      .asCallback((error, data) => {
        if (error) {
          console.error(error.message);
          callback(false, error.message, undefined);
        } else {
          if (data[0]) {
            callback(true, '', data[0]);
          } else {
            callback(false, 'Invalid credentials.', undefined);
          }
        }
      });
  }

  static delete(id, callback) {
    db('sys_users')
      .where('id', id)
      .del()
      .asCallback(error => {
        if (error) {
          console.error(error.message);
          callback(false, error.message);
        } else {
          callback(true, '');
        }
      });
  }
}

module.exports.User = User;