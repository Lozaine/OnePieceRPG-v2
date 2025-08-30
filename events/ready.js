const { Events, ActivityType } = require('discord.js');
const { botName } = require('../config.json');

module.exports = {
		name: Events.ClientReady,
		once: true,
		execute(client) {
				console.log(`Ready! Logged in as ${client.user.tag}`);
				console.log(`${botName || 'One Piece Bot'} is online and ready to set sail!`);
				console.log(`Serving ${client.guilds.cache.size} guilds and ${client.users.cache.size} users`);

				// Set up rotating status messages
				const activities = [
						{ name: 'the Grand Line', type: ActivityType.Watching },
						{ name: 'for Devil Fruits', type: ActivityType.Searching },
						{ name: 'pirate adventures', type: ActivityType.Playing },
						{ name: 'the seas', type: ActivityType.Competing },
						{ name: 'One Piece', type: ActivityType.Streaming, url: 'https://twitch.tv/onepiece' }
				];

				let activityIndex = 0;

				// Change activity every 5 minutes
				setInterval(() => {
						const activity = activities[activityIndex];
						client.user.setActivity(activity.name, { 
								type: activity.type,
								url: activity.url // Only used for streaming
						});
						activityIndex = (activityIndex + 1) % activities.length;
				}, 5 * 60 * 1000); // 5 minutes

				// Log some startup statistics
				console.log('='.repeat(50));
				console.log('📊 Bot Statistics:');
				console.log(`👥 Guilds: ${client.guilds.cache.size}`);
				console.log(`👤 Users: ${client.users.cache.size}`);
				console.log(`💾 Players in DB: ${client.players.size}`);
				console.log(`⚡ Commands loaded: ${client.commands.size}`);
				console.log('='.repeat(50));
		},
};
