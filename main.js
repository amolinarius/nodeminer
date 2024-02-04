//. Import modules
import mineflayer from 'mineflayer';
import { mineflayer as viewer } from 'prismarine-viewer';
import armorManager from 'mineflayer-armor-manager';
import autoeat from 'mineflayer-auto-eat';
import fs from 'fs';

//. Create Bot
const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'testbot'
});
bot.loadPlugin(armorManager)
bot.loadPlugin(autoeat.plugin)

//. Forward chat messages to console
bot.on('chat', (username, message)=>{
    console.log(`<${username}> ${message}`)
});

//. Handle Spawn & Enable webview
bot.once('spawn', ()=>{
    viewer(bot, {port: 80, firstPerson: false, viewDistance: 6});
    // setTimeout(()=>bot.chat('/skin url https://imgur.com/6OnKkaL'), 5000)
});

//. Clear terminal
console.clear();

//. Load Cheats
const blacklist = ['Cheat.ts', 'CheatConfigs.ts'];
const cheats = fs.readdirSync('./cheats').filter(f=>(f.endsWith('.ts') || f.endsWith('.js')) && !blacklist.includes(f)).map(f=>f.slice(0, f.length-3));
for (const cheat of cheats) {
    const module = (await import(`./cheats/${cheat}`)).default;
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(module));
    if (module.enabled) {
        module.main(bot);
        console.log(`Loaded ${cheat}`);
    }
    else if (methods.indexOf('ifDisabled')!=-1) {
        module.ifDisabled(bot);
        console.log(`Loaded ${cheat} fallback because it was disabled`);
    }
}

//. Handle Disconnection
bot.on('kicked', (reason)=>console.log(`${bot.username} has been kicked. Reason : ${reason}`));