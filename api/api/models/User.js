/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var uuid = require('uuid4');

module.exports = {

  attributes: {
    uid: {
      type: 'string',
      unique: true
    },
    name: {
      type: 'string',
      required: true      
    },
    email: {
      type: 'string',
      required: true,
      isEmail: true
    },
    contactNumber: {
      type: 'string',
      regex: /^[789]\d{9}$/
    },
    isAdminstrator: {
      type: 'boolean',
      defaultsTo: false
    },
    isExecutive: {
      type: 'boolean',
      defaultsTo: false
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    }
  },
  createUser: createUser,
  getUser: getUser,
  updateUser: updateUser,
  getUserList: getUserList,
  deleteUser: deleteUser

};

async function createUser(body) {
  body = Object.assign({uid: generateUserId()}, body);
  
  let user = await User.create(body).fetch();

  return user;
}

async function updateUser(uid, body) {
  return await User.update({uid: uid}, body).fetch();
}

async function getUser(uid) {
  return await User.findOne({
    uid: uid
  });
}

async function getUserList() {
  return await User.find({isDeleted: false});
}

async function deleteUser(uid, body) {
  let user = await getUser(uid);
  user = Object.assign(user, {isDeleted: true});

  return await updateUser(uid, user);
}

function generateUserId() {
  return "groot:uid:" + uuid();
}