const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('View your character profile.'),
	async execute(interaction) {
		const player = interaction.client.players.get(interaction.user.id);
		if (!player) {
			return interaction.reply({ content: "You don't have a character yet. Use `/start` to create one.", ephemeral: true });
		}

		const embed = new EmbedBuilder()
			.setColor(0x1E90FF)
			.setTitle(`${interaction.user.username}'s Profile`)
			.addFields(
				{ name: '💪 Power', value: `**${player.stats.power}**`, inline: true },
				{ name: '🌏 Location', value: player.progression.location, inline: true },
				{ name: '📜 Origin', value: player.character.origin, inline: false },
				{ name: '✨ Dream', value: player.character.dream, inline: false },
				{ name: ' race', value: player.character.race, inline: false }
			);

		await interaction.reply({ embeds: [embed] });
	},
};