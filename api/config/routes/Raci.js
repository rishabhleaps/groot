/**
 * Raci controller router
 *
 * @description :: Server-side routes for handling incoming requests for raci.
 */

module.exports.routes = {

    'post /raci': {
        controller: 'RaciController',
        action: 'create'
    },
    'get /raci/:id': {
        controller: 'RaciController',
        action:'get'
    },
    'put /raci/:id': {
        controller: 'RaciController',
        action:'update'      
    },
    'get /racis': {
        controller: 'RaciController',
        action:'getList'
    },
    'delete /raci/:id': {
        controller: 'RaciController',
        action:'delete'      
    }
    
};