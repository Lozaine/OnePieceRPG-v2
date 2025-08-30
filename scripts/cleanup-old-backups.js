const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '../backups');
const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

if (!fs.existsSync(backupDir)) {
    console.log('No backup directory found');
    process.exit(0);
}

const files = fs.readdirSync(backupDir)
    .filter(file => file.startsWith('backup-') && file.endsWith('.json'))
    .map(file => ({
        name: file,
        path: path.join(backupDir, file),
        stats: fs.statSync(path.join(backupDir, file))
    }));

const now = Date.now();
let deletedCount = 0;

files.forEach(file => {
    const age = now - file.stats.mtime.getTime();
    if (age > maxAge) {
        fs.unlinkSync(file.path);
        console.log(`🗑️ Deleted old backup: ${file.name}`);
        deletedCount++;
    }
});

console.log(`✅ Cleanup complete. Deleted ${deletedCount} old backup files.`);