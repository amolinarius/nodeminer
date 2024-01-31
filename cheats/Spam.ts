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
            const random = this.config.randomize||false;
            var i = 0;
            setInterval(()=>{
                bot.chat(messages[i]);
                if (!random) {
                    if (i<messages.length-1) i++;
                    else i=0;
                }
                else {
                    var oldI = i;
                    while (oldI == i) {i = randomInRange(0, messages.length-1)}
                }
            }, delay);
        });
        console.log('Loaded Spam');
    }
}

// https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
function randomInRange(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default new Spam();