const { Events } = require('discord.js');
const { botName } = require('../config.json');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
        console.log(`${botName} is online and ready to set sail!`);
	},
};