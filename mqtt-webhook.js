#!/usr/bin/env node

var args = require('args')

args
    .option('lport', 'The local mqtt port', 3000)
    .option('lhost', 'The local mqtt host', 'localhost')
    .option('lprotocol', 'The local mqtt protocol', 'ws')
    .option('lusername', 'The local mqtt username', 'username')
    .option('lpassword', 'The local mqtt password', 'password')
    .option('topic', 'The topic to observe', 'topic')
    .option('webhook', 'The webhook to launch', 'webhook')
    .option('method', 'The webhook method', 'get')
    .command('node', 'Serve your static site', ['n'])

const flags = args.parse(process.argv)

if (flags.lport) {
    console.log(`Local port ${flags.lport}`)
}

if (flags.lhost) {
    console.log(`Local host ${flags.lhost}`)
}

var mqtt = require('mqtt');

/**
 * local connect
 */
var local = mqtt.connect({
    "host": `${flags.lhost}`,
    "port": `${flags.lport}`,
    "protocol": `${flags.lprotocol}`,
    "username": `${flags.lusername}`,
    "password": `${flags.lpassword}`
});

local.on('connect', function () {
    console.log('Local running ...', flags.topic + '/#');
    local.subscribe(flags.topic + '/#');
});

process.on('uncaughtException', function (message) {
    console.log(message);
    if (!local.connected) local.reconnect()
});

local.on('message', function (topic, message) {
    // Log
    console.log("topic", topic, "message", message.toString())
    // Data must be json
    var data = JSON.parse(message.toString());
    var request = require('request');

    console.log("webhook", flags.webhook)
    if (flags.method === 'get') {
        request.get(flags.webhook,
            { },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            }
        );
    }
    if (flags.method === 'post') {
        request.post(flags.webhook,
            { json: data },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            }
        );
    }
});