/**
 * Project controller router
 *
 * @description :: Server-side routes for handling incoming requests for project.
 */

module.exports.routes = {

    'post /project': {
        controller: 'ProjectController',
        action: 'create'
    },
    'get /project/:id': {
        controller: 'ProjectController',
        action:'get'
    },
    'put /project/:id': {
        controller: 'ProjectController',
        action:'update'      
    },
    'get /projects': {
        controller: 'ProjectController',
        action:'getList'
    },
    'delete /project/:id': {
        controller: 'ProjectController',
        action:'delete'      
    }
    
};