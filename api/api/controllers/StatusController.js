/**
 * StatusController
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
    delete: deleteStatus

};

async function create(req, res) {
    let data = await Status.createStatus(req.body);

    return res.json(data);
}

async function get(req, res) {
    let data = await Status.getStatus(req.params.id);

    return res.json(data);
}

async function update(req, res) {
    let data = await Status.updateStatus(req.params.id, req.body);

    return res.json(data);
}

async function getList(req, res) {
    return res.json(await Status.getStatusList());
}

async function deleteStatus(req, res) {
    return res.json(await Status.deleteStatus(req.params.id));
}
