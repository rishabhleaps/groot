/**
 * ProjectController
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
    delete: deleteProject,
    getProjectStatusList: getProjectStatusList

};

async function create(req, res) {
    let data = await Project.createProject(req.body);

    return res.json(data);
}

async function get(req, res) {
    let data = await Project.getProject(req.params.id);

    return res.json(data);
}

async function update(req, res) {
    let data = await Project.updateProject(req.params.id, req.body);

    return res.json(data);
}

async function getList(req, res) {
    return res.json(await Project.getProjectList());
}

async function deleteProject(req, res) {
    return res.json(await Project.deleteProject(req.params.id));
}

async function getProjectStatusList(req, res) {
    return res.json(await Project.getProjectStatusList(req.params.id));
}
