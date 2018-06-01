/**
 * Status.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var uuid = require('uuid4');

module.exports = {

  attributes: {
    sid: {
      type: 'string',
      unique: true
    },
    headline: {
      type: 'string',
      required: true      
    },
    accountStatus: {
      type: 'string',
      isIn: ['R', 'G', 'B']
    },
    projectStatus: {
      type: 'string',
      isIn: ['R', 'G', 'B']
    },
    accountStatusUpdatedAt: {
      type: 'string',
    },
    projectStatusUpdatedAt: {
      type: 'string',
    }
  },
  createStatus: createStatus,
  getStatus: getStatus,
  updateStatus: updateStatus,
  getStatusList: getStatusList,
  deleteStatus: deleteStatus

};

async function createStatus(body) {
  body = Object.assign({sid: generateStatusId()}, body);
  
  let status = await Status.create(body).fetch();

  return status;
}

async function updateStatus(sid, body) {
  return await Status.update({sid: sid}, body).fetch();
}

async function getStatus(sid) {
  return await Status.findOne({
    sid: sid
  });
}

async function getStatusList() {
  return await Status.find({isDeleted: false});
}

async function deleteStatus(sid, body) {
  let status = await getStatus(sid);
  status = Object.assign(status, {isDeleted: true});

  return await updateStatus(sid, status);
}

function generateStatusId() {
  return "groot:sid:" + uuid();
}

