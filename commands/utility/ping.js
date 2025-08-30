const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the bot\'s response time and status.'),
    async execute(interaction) {
        try {
            const sent = await interaction.reply({ 
                content: '🏓 Pinging...', 
                fetchReply: true,
                ephemeral: true 
            });

            const latency = sent.createdTimestamp - interaction.createdTimestamp;
            const apiLatency = Math.round(interaction.client.ws.ping);

            // Determine status based on latency
            let statusColor = 0x00FF00; // Green
            let statusEmoji = '🟢';
            let statusText = 'Excellent';

            if (latency > 200 || apiLatency > 200) {
                statusColor = 0xFFFF00; // Yellow
                statusEmoji = '🟡';
                statusText = 'Good';
            }
            if (latency > 500 || apiLatency > 500) {
                statusColor = 0xFF6600; // Orange
                statusEmoji = '🟠';
                statusText = 'Fair';
            }
            if (latency > 1000 || apiLatency > 1000) {
                statusColor = 0xFF0000; // Red
                statusEmoji = '🔴';
                statusText = 'Poor';
            }

            const embed = new EmbedBuilder()
                .setColor(statusColor)
                .setTitle('🏓 Pong!')
                .setDescription('Bot status and response times')
                .setThumbnail('https://i.imgur.com/ping_pong.png')
                .addFields(
                    { 
                        name: '⚡ Bot Latency', 
                        value: `${latency}ms`, 
                        inline: true 
                    },
                    { 
                        name: '📡 API Latency', 
                        value: `${apiLatency}ms`, 
                        inline: true 
                    },
                    { 
                        name: `${statusEmoji} Status`, 
                        value: statusText, 
                        inline: true 
                    }
                )
                .setFooter({ text: 'One Piece Bot • Ready to set sail!' })
                .setTimestamp();

            await interaction.editReply({ 
                content: '', 
                embeds: [embed] 
            });
        } catch (error) {
            console.error('Error in ping command:', error);
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('❌ Error')
                .setDescription('An error occurred while checking ping.')
                .setTimestamp();
            await interaction.editReply({ 
                content: '', 
                embeds: [embed] 
            });
        }
    },
};