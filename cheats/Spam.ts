import mineflayer from "mineflayer";
import Cheat from "./Cheat.ts";
import { SpamConfig } from "./CheatConfigs.ts";

class Spam extends Cheat {
    config: SpamConfig = this.config;
    constructor() {
        super("Spam", "Automatically sends messages/run commands.");
    }
    
    main(bot: mineflayer.Bot): void {
        bot.once('spawn', ()=>{
            if ((this.config.messages||[]).length == 0) {
                console.log('No messages in config, disabling');
                return;
            }
            const messages = this.config.messages||[];
            const delay = this.config.delay||1000;
            var i = 0;
            setInterval(()=>{
                bot.chat(messages[i]);
                if (i<messages.length-1) i++;
                else i=0;
            }, delay);
        });
        console.log('Loaded Spam');
    }
}

export default new Spam();