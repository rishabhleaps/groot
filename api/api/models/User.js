/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var uuid = require('uuid4');

module.exports = {

  dontUseObjectIds: true,
  attributes: {
    id: { 
      type: 'string', 
      columnName: '_id' 
    },  
    name: {
      type: 'string',
      required: true      
    },
    email: {
      type: 'string',
      required: true,
      isEmail: true,
      unique: true
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
  body = Object.assign({id: generateUserId()}, body);
  
  let user = await User.create(body).fetch();

  return user;
}

async function updateUser(id, body) {
  return await User.update({id: id}, body).fetch();
}

async function getUser(id) {
  return await User.findOne({
    id: id,
    isDeleted: false
  });
}

async function getUserList() {
  return await User.find({isDeleted: false});
}

async function deleteUser(id, body) {
  let user = await getUser(id);
  user = Object.assign(user, {isDeleted: true});

  return await updateUser(id, user);
}

function generateUserId() {
  return "groot:uid:" + uuid();
}