/**
 * Project.js
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
    customer: {
      type: 'string',
      required: true,
    },
    startDate: {
      type: 'string'
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    },
    status: {
      collection: 'status',
      via: 'project'
    },
    racis: {
      collection: 'raci',
      via: 'project'
    }    
  },
  createProject: createProject,
  getProject: getProject,
  updateProject: updateProject,
  getProjectList: getProjectList,
  deleteProject: deleteProject,
  getProjectStatusList: getProjectStatusList

};

async function createProject(body) {
  body = Object.assign({id: generateProjectId()}, body);
  
  let project = await Project.create(body).fetch();

  return project;
}

async function updateProject(id, body) {
  return await Project.update({id: id}, body).fetch();
}

async function getProject(id) {
  return await Project.findOne({
    id: id
  });
}

async function getProjectList() {
  let projects = await Project
    .find({isDeleted: false})
    .populate('racis')
    .populate('status', {sort: 'updatedAt DESC', limit: 1,});

  let projectList = projects.map(project => {
    let racis = project.racis.map(raci => {
      return User.getUser(raci.user).then(user => {
        return Object.assign(user, {role: raci.role, isProjectManager: raci.isProjectManager});
      });    
    });

    return Promise.all(racis).then(racis => {
      return Object.assign(project, {racis: racis});
    });
  });

  return Promise.all(projectList).then(projectList => projectList);
}

async function getProjectStatusList(id) {
  return Status.getStatusByProjectId(id).then(status => status);
}

async function deleteProject(id, body) {
  let project = await getProject(id);
  project = Object.assign(project, {isDeleted: true});

  return await updateProject(id, project);
}

function generateProjectId() {
  return "groot:pid:" + uuid();
}