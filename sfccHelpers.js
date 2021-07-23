/*
 * Helper functions for SFCC controllers
 */

const { get } = require('./get')
const { loadGlobal } = require('./helpers')
const { forEach } = require('./protos.sfcc')

module.exports.forEach = (input, callback) => get(input, forEach(callback))

//for browser static import
loadGlobal({ SFCC: module.exports })
