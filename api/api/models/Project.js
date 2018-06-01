/**
 * Project.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var uuid = require('uuid4');

module.exports = {

  attributes: {
    pid: {
      type: 'string',
      unique: true
    },
    name: {
      type: 'string',
      required: true      
    },
    customer: {
      type: 'string',
      required: true,
      isEmail: true
    },
    startDate: {
      type: 'string'
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    }
  },
  createProject: createProject,
  getProject: getProject,
  updateProject: updateProject,
  getProjectList: getProjectList,
  deleteProject: deleteProject

};

async function createProject(body) {
  body = Object.assign({pid: generateProjectId()}, body);
  
  let project = await Project.create(body).fetch();

  return project;
}

async function updateProject(pid, body) {
  return await Project.update({pid: pid}, body).fetch();
}

async function getProject(pid) {
  return await Project.findOne({
    pid: pid
  });
}

async function getProjectList() {
  return await Project.find({isDeleted: false});
}

async function deleteProject(pid, body) {
  let project = await getProject(pid);
  project = Object.assign(project, {isDeleted: true});

  return await updateProject(pid, project);
}

function generateProjectId() {
  return "groot:pid:" + uuid();
}