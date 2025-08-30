module.exports = {
    COLORS: {
        SUCCESS: 0x00FF00,
        ERROR: 0xFF0000,
        WARNING: 0xFFFF00,
        INFO: 0x0099FF,
        PRIMARY: 0x7289DA,
        SECONDARY: 0x99AAB5
    },

    EMOJIS: {
        SUCCESS: '✅',
        ERROR: '❌',
        WARNING: '⚠️',
        INFO: 'ℹ️',
        LOADING: '⏳',
        POWER: '💪',
        LOCATION: '📍',
        QUEST: '📜',
        TREASURE: '💰',
        SWORD: '⚔️',
        SHIP: '🚢'
    },

    LIMITS: {
        MAX_POWER: 1000,
        MAX_CHARACTERS_PER_USER: 1,
        COMMAND_COOLDOWN: 3000, // 3 seconds
        MAX_MESSAGE_LENGTH: 2000
    },

    THUMBNAILS: {
        DEFAULT: 'https://i.imgur.com/onepiece_logo.png',
        SUCCESS: 'https://i.imgur.com/treasure.png',
        ERROR: 'https://i.imgur.com/warning.png',
        QUEST: 'https://i.imgur.com/quest_scroll.png',
        CHARACTER: 'https://i.imgur.com/character_avatar.png'
    }
};