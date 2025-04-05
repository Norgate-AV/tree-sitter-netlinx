/**
 * @file NetLinx node definitions for tree-sitter
 * @license MIT
 */

const netlinx = require("./netlinx");

/**
 * Creates netlinx node rules
 *
 * @returns {object} NetLinx node rules
 */
module.exports = {
    variables: {
        date: (_) => netlinx.variables.date,
        day: (_) => netlinx.variables.day,
        time: (_) => netlinx.variables.time,
        ldate: (_) => netlinx.variables.ldate,
        push_device: (_) => netlinx.variables.push_device,
        push_channel: (_) => netlinx.variables.push_channel,
        push_devchan: (_) => netlinx.variables.push_devchan,
        release_device: (_) => netlinx.variables.release_device,
        release_channel: (_) => netlinx.variables.release_channel,
        release_devchan: (_) => netlinx.variables.release_devchan,
        system_number: (_) => netlinx.variables.system_number,
    },
};
