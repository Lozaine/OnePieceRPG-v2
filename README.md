# One Piece Discord Bot

An enhanced Discord bot that provides an immersive One Piece RPG experience with character creation, quest systems, and location exploration.

## 🌟 Features

- **Character Creation**: Choose from 5 unique races, multiple origins, and diverse dreams
- **Quest System**: Engage in main story quests with meaningful progression
- **Location Exploration**: Explore iconic One Piece locations with interactive elements
- **Progress Tracking**: Detailed character stats and progression monitoring
- **Enhanced UI**: Rich embeds with thumbnails and interactive components
- **Robust Error Handling**: Comprehensive validation and user-friendly error messages

## 🚀 Quick Start

1. **Installation**
   ```bash
   git clone <your-repo>
   cd one-piece-discord-bot
   npm install
   ```

2. **Configuration**
   - Copy `.env.example` to `.env`
   - Add your Discord bot token and client ID
   - Customize `config.json` as needed

3. **Deploy Commands**
   ```bash
   npm run deploy
   ```

4. **Start the Bot**
   ```bash
   npm start
   ```

## 📋 Commands

### Adventure Commands
- `/start` - Create your character and begin your adventure
- `/profile` - View your character stats and information  
- `/quests` - Check active quests and objectives
- `/island` - Explore current location and take actions
- `/stats` - View detailed character statistics

### Utility Commands
- `/help [command]` - Get help with commands
- `/ping` - Check bot response time

## 🛠️ Development

### Scripts
- `npm run dev` - Start with nodemon for development
- `npm run backup` - Create database backup
- `npm run restore` - Restore from backup

### Project Structure
```
├── commands/
│   ├── rpg/          # Adventure-related commands
│   └── utility/      # Utility commands
├── data/             # Game data (quests, islands, etc.)
├── events/           # Discord.js event handlers
├── scripts/          # Utility scripts
├── utils/            # Helper functions
├── backups/          # Database backups
└── index.js          # Main bot file
```

## 🎮 Gameplay

1. **Character Creation**: Use `/start` to create your character
2. **Quest Progression**: Follow main story quests using `/quests` and `/island`  
3. **Exploration**: Discover new locations and opportunities
4. **Growth**: Gain power and unlock new abilities
5. **Adventure**: Experience the One Piece world your way

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔧 Configuration Options

### Environment Variables
- `DISCORD_TOKEN` - Your Discord bot token
- `CLIENT_ID` - Your Discord application client ID  
- `BOT_ADMINS` - Comma-separated list of admin user IDs
- `NODE_ENV` - Environment (development/production)
- `LOG_LEVEL` - Logging level (debug/info/warn/error)

### Config.json
- Customize bot name, limits, and feature flags
- Adjust quest progression and power scaling
- Configure database and backup settings

## 🐛 Troubleshooting

### Common Issues
1. **Commands not appearing**: Run `npm run deploy` to register commands
2. **Database errors**: Check Enmap installation and permissions
3. **Permission errors**: Ensure bot has required Discord permissions
4. **Memory issues**: Monitor database size and use backup/cleanup scripts

### Support
- Check the console logs for detailed error information
- Ensure all dependencies are installed correctly
- Verify environment variables are set properly
- Join our support server (if applicable)

## 📊 Performance

- Uses Enmap for efficient data storage
- Implements caching for frequently accessed data
- Includes database backup and cleanup utilities
- Supports thousands of concurrent users

---

*Set sail for the Grand Line and begin your One Piece adventure today!* ⚓🏴‍☠️