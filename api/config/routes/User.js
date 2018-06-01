/**
 * User controller router
 *
 * @description :: Server-side routes for handling incoming requests for user.
 */

module.exports.routes = {

    'post /user': {
        controller: 'UserController',
        action: 'create'
    },
    'get /user/:id': {
        controller: 'UserController',
        action:'get'
    },
    'put /user/:id': {
        controller: 'UserController',
        action:'update'      
    },
    'get /users': {
        controller: 'UserController',
        action:'getList'
    },
    'delete /user/:id': {
        controller: 'UserController',
        action:'delete'      
    }
    
};