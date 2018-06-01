/**
 * Status controller router
 *
 * @description :: Server-side routes for handling incoming requests for status.
 */

module.exports.routes = {

    'post /status': {
        controller: 'StatusController',
        action: 'create'
    },
    'get /status/:id': {
        controller: 'StatusController',
        action:'get'
    },
    'put /status/:id': {
        controller: 'StatusController',
        action:'update'      
    },
    'get /status': {
        controller: 'StatusController',
        action:'getList'
    },
    'delete /status/:id': {
        controller: 'StatusController',
        action:'delete'      
    }
    
};