/**
 * Raci.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const uuid = require('uuid4');
const ObjectId = require('mongodb').ObjectID;

module.exports = {

  dontUseObjectIds: true,
  attributes: {
    id: { 
      type: 'string', 
      columnName: '_id'
    },
    role: {
      type: 'string',
      isIn: ['R', 'A', 'C', 'I']
    },
    isProjectManager: {
      type: 'boolean',
      defaultsTo: false
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    },
    project: {
      model: 'project'    
    },
    user: {
      model: 'user'
    }
  },
  createRaci: createRaci,
  getRaci: getRaci,
  updateRaci: updateRaci,
  getRaciList: getRaciList,
  deleteRaci: deleteRaci

};

async function createRaci(body) {
  body = Object.assign({id: generateRaciId()}, body);
  
  let raci = await Raci.create(body).fetch();

  return raci;
}

async function updateRaci(id, body) {
  return await Raci.update({id: id}, body).fetch();
}

async function getRaci(id) {
  return await Raci.findOne({
    id: id,
    isDeleted: false
  });
}

async function getRaciList() {
  return await Raci.find({isDeleted: false});
}

async function deleteRaci(id, body) {
  let raci = await getRaci(id);
  raci = Object.assign(raci, {isDeleted: true});

  return await updateRaci(id, raci);
}

function generateRaciId() {
  return "groot:raciid:" + uuid();
}