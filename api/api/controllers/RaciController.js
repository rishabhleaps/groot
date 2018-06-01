/**
 * RaciController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },
    create: create,
    get: get,
    update: update,
    getList: getList,
    delete: deleteRaci

};

async function create(req, res) {
    let data = await Raci.createRaci(req.body);

    return res.json(data);
}

async function get(req, res) {
    let data = await Raci.getRaci(req.params.id);

    return res.json(data);
}

async function update(req, res) {
    let data = await Raci.updateRaci(req.params.id, req.body);

    return res.json(data);
}

async function getList(req, res) {
    return res.json(await Raci.getRaciList());
}

async function deleteRaci(req, res) {
    return res.json(await Raci.deleteRaci(req.params.id));
}

