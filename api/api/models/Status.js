/**
 * Status.js
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
    },
    project: {
      model: 'project'
    }
  },
  createStatus: createStatus,
  getStatus: getStatus,
  updateStatus: updateStatus,
  getStatusList: getStatusList,
  deleteStatus: deleteStatus,
  getStatusByProjectId: getStatusByProjectId

};

async function createStatus(body) {
  let lastStatusList = await Status.find({project: body.project}).sort('updatedAt DESC').limit(1);
  let lastStatus = lastStatusList[0];

  if (!lastStatus) {
    let accountStatusUpdatedAt = new Date();
    let projectStatusUpdatedAt = new Date();

    body = Object.assign({accountStatusUpdatedAt: accountStatusUpdatedAt, projectStatusUpdatedAt: projectStatusUpdatedAt}, body);      
  } else {
    if (lastStatus.accountStatus !== body.accountStatus && lastStatus.projectStatus !== body.projectStatus) {
      let accountStatusUpdatedAt = new Date();
      let projectStatusUpdatedAt = new Date();

      body = Object.assign({accountStatusUpdatedAt: accountStatusUpdatedAt, projectStatusUpdatedAt: projectStatusUpdatedAt}, body);
    } else if (lastStatus.accountStatus !== body.accountStatus) {

      let accountStatusUpdatedAt = new Date();

      body = Object.assign({accountStatusUpdatedAt: accountStatusUpdatedAt, projectStatusUpdatedAt: lastStatus.projectStatusUpdatedAt}, body);
    } else if ((lastStatus.projectStatus !== body.projectStatus)) {
      let projectStatusUpdatedAt = new Date();

      body = Object.assign({accountStatusUpdatedAt: lastStatus.accountStatusUpdatedAt, projectStatusUpdatedAt: projectStatusUpdatedAt}, body);
    } else {
      body = Object.assign({accountStatusUpdatedAt: lastStatus.accountStatusUpdatedAt, projectStatusUpdatedAt: lastStatus.projectStatusUpdatedAt}, body);
    }   
  } 

  body = Object.assign({id: generateStatusId()}, body);

  let status = await Status.create(body).fetch();

  return status;
}

async function updateStatus(id, body) {
  return await Status.update({id: id}, body).fetch();
}

async function getStatus(id) {
  return await Status.findOne({
    id: id,
    isDeleted: false
  });
}

async function getStatusList() {
  return await Status.find({isDeleted: false}).sort('updatedAt DESC');
}

async function deleteStatus(id, body) {
  let status = await getStatus(id);
  status = Object.assign(status, {isDeleted: true});

  return await updateStatus(id, status);
}

async function getStatusByProjectId(id) {
  return await Status.find({
    project: id
  }).sort('updatedAt DESC');
}

function generateStatusId() {
  return "groot:sid:" + uuid();
}