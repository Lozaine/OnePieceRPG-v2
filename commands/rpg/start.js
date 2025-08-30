const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, MessageFlags } = require('discord.js');
const { races } = require('../../data/characterOptions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Begin your One Piece adventure by creating your character.'),
	async execute(interaction) {
        // We no longer need to check for sessions here, as a new command execution is a fresh start.
        // Old sessions will be overwritten or can be handled in interactionCreate.

        const raceMenu = new StringSelectMenuBuilder()
			.setCustomId('start_select_race')
			.setPlaceholder('Select your race')
			.addOptions(races.map(race => ({
                label: race.label,
                description: race.description,
                value: race.value,
            })));
        
        const row = new ActionRowBuilder().addComponents(raceMenu);

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Choose Your Destiny')
            .setDescription('Welcome to the world of One Piece! Your legend is about to begin. Let\'s start by forging your identity.')
            .addFields({ name: 'Step 1: Choose Your Race', value: 'Each race offers unique starting bonuses and abilities that will shape your journey.' });

		await interaction.reply({
            embeds: [embed],
            components: [row],
            flags: MessageFlags.Ephemeral
        });
	},
};