// scripts/toggle-live-reload.cjs
const fs = require('fs');
const path = require('path');
const os = require('os');

const configPath = path.join(__dirname, '..', 'capacitor.config.json');

function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    let bestIp = null;
    
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Skip over internal (127.0.0.1) and non-IPv4 addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                const isWirelessOrEthernet = name.toLowerCase().includes('wi-fi') || 
                                             name.toLowerCase().includes('wifi') || 
                                             name.toLowerCase().includes('wlan') || 
                                             name.toLowerCase().includes('ethernet') || 
                                             name.toLowerCase().includes('eth');
                
                if (isWirelessOrEthernet) {
                    return iface.address; // Return immediately if it's a primary Wi-Fi/Ethernet interface
                }
                bestIp = iface.address; // Fallback to any other network interface
            }
        }
    }
    return bestIp || '10.0.2.2'; // '10.0.2.2' is Android emulator's alias for host localhost
}

function main() {
    const args = process.argv.slice(2);
    const mode = args[0];

    if (!mode || (mode !== '--enable' && mode !== '--disable')) {
        console.error('Usage: node scripts/toggle-live-reload.cjs [--enable | --disable]');
        process.exit(1);
    }

    if (!fs.existsSync(configPath)) {
        console.error(`Error: capacitor.config.json not found at ${configPath}`);
        process.exit(1);
    }

    let configText = fs.readFileSync(configPath, 'utf8');
    let config;
    try {
        config = JSON.parse(configText);
    } catch (e) {
        console.error('Error: capacitor.config.json is not valid JSON');
        process.exit(1);
    }

    if (mode === '--enable') {
        const ip = getLocalIpAddress();
        const serverUrl = `http://${ip}:5173`;
        
        config.server = {
            url: serverUrl,
            cleartext: true
        };
        
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
        console.log(`\x1b[32m✔ Live-reload ENABLED in capacitor.config.json\x1b[0m`);
        console.log(`Configured server URL: \x1b[36m${serverUrl}\x1b[0m`);
        console.log(`\x1b[33mEnsure your mobile device is on the same Wi-Fi network as your computer!\x1b[0m`);
    } else {
        if (config.server) {
            delete config.server;
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
            console.log(`\x1b[32m✔ Live-reload DISABLED in capacitor.config.json (Production mode)\x1b[0m`);
        } else {
            console.log(`Live-reload was already disabled.`);
        }
    }
}

main();
