/**
 * UserController
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
    delete: deleteUser

};

async function create(req, res) {
    let data = await User.createUser(req.body);

    return res.json(data);
}

async function get(req, res) {
    let data = await User.getUser(req.params.id);

    return res.json(data);
}

async function update(req, res) {
    let data = await User.updateUser(req.params.id, req.body);

    return res.json(data);
}

async function getList(req, res) {
    return res.json(await User.getUserList());
}

async function deleteUser(req, res) {
    return res.json(await User.deleteUser(req.params.id));
}
