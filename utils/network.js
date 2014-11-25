/**
 * Utility functionality related with network
 * @module utils/network
 */

/***
 * Return the ip address
 * @param request {Object} express request object
 * @returns {*}
 */
module.exports.getIpAddress = function(request){
    if (request && request.headers && request.headers['x-forwarded-for']){
        return request.headers['x-forwarded-for'].split(',')[0];
    }
    return request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;
};