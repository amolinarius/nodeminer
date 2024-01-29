import mineflayer from "mineflayer";
import Cheat from "./Cheat.ts";
import { AutoLogConfig } from "./CheatConfigs.ts";

class AutoLog extends Cheat {
    config: AutoLogConfig = this.config;
    constructor() {
        super("AutoLog", "Automatically disconnects the bot's health is too low.");
    }
    
    main(bot: mineflayer.Bot): void {
        bot.once('spawn', ()=>{
            var lastHealth = 0;
            var initedLife = false;
            bot.on('physicsTick', ()=>{
                if (bot.health >= lastHealth) {
                    lastHealth = bot.health;
                    return;
                };
                if (initedLife == false) {
                    initedLife = true;
                    return;
                }
                if (bot.health < (this.config.minHealth||6)) {
                    bot.end(`Health was going to be lower than ${this.config.minHealth||6}`);
                    console.log(`Disconnected bot for reason : Health was going to be lower than ${this.config.minHealth||6}`);
                }
                lastHealth = bot.health;
            });
        })
        console.log('Loaded AutoLog');
    }
}

export default new AutoLog();