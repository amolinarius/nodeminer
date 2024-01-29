//. Import modules
import mineflayer from 'mineflayer';
import { mineflayer as viewer } from 'prismarine-viewer';
import armorManager from 'mineflayer-armor-manager';
import autoeat from 'mineflayer-auto-eat';

import KillAura from './cheats/KillAura.ts';
import AutoLog from './cheats/AutoLog.ts';
import AutoArmor from './cheats/AutoArmor.ts';
import AutoEat from './cheats/AutoEat.ts';

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
if (KillAura.enabled) KillAura.main(bot);
if (AutoLog.enabled) AutoLog.main(bot);
if (AutoArmor.enabled) AutoArmor.main(bot);
if (AutoEat.enabled) AutoEat.main(bot);
else bot.autoEat.disable();

//. Handle Disconnection
bot.on('kicked', (reason)=>console.log(`${bot.username} has been kicked. Reason : ${reason}`));