/**
 * Raci.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var uuid = require('uuid4');

module.exports = {

  attributes: {
    raciid: {
      type: 'string',
      unique: true
    },
    pid: {
      type: 'string',
      required: true,
      unique: true
    },
    raciid: {
      type: 'string',
      required: true,
      unique: true      
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
    }
  },
  createRaci: createRaci,
  getRaci: getRaci,
  updateRaci: updateRaci,
  getRaciList: getRaciList,
  deleteRaci: deleteRaci

};

async function createRaci(body) {
  body = Object.assign({raciid: generateRaciId()}, body);
  
  let raci = await Raci.create(body).fetch();

  return raci;
}

async function updateRaci(raciid, body) {
  return await Raci.update({raciid: raciid}, body).fetch();
}

async function getRaci(raciid) {
  return await Raci.findOne({
    raciid: raciid
  });
}

async function getRaciList() {
  return await Raci.find({isDeleted: false});
}

async function deleteRaci(raciid, body) {
  let raci = await getRaci(raciid);
  raci = Object.assign(raci, {isDeleted: true});

  return await updateRaci(raciid, raci);
}

function generateRaciId() {
  return "groot:raciid:" + uuid();
}