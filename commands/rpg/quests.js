const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const allQuests = require('../../data/quests');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quests')
		.setDescription('View your active quests.'),
	async execute(interaction) {
		const player = interaction.client.players.get(interaction.user.id);
		const { saga, arc, origin, step } = player.progression.msq;
		const currentQuest = allQuests[saga]?.[arc]?.[origin]?.[step];

		if (!currentQuest) {
			const embed = new EmbedBuilder()
				.setColor(0x6A7482)
				.setTitle('Quest Log')
				.setDescription('You have no active quests at the moment.');
			return interaction.reply({ embeds: [embed] });
		}

		const embed = new EmbedBuilder()
			.setColor(0xFFD700)
			.setTitle('Main Story Quest')
			.addFields(
				{ name: `📘 ${saga}: ${arc}`, value: `**${currentQuest.title}**` },
				{ name: 'Description', value: currentQuest.description },
				{ name: 'Objective', value: `*${currentQuest.objective}*` }
			);

		await interaction.reply({ embeds: [embed] });
	},
};