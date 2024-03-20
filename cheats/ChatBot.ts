import mineflayer from "mineflayer";
import Cheat from "./Cheat.ts";
import { ChatBotConfig } from "./CheatConfigs.ts";

class ChatBot extends Cheat {
    config: ChatBotConfig = this.config;
    constructor() {
        super("ChatBot", "Automatically replies to chat messages.");
    }
    
    main(bot: mineflayer.Bot): void {
        bot.once('spawn', ()=>{
            bot.on('chat', (user, msg)=>{
                if (user === bot.username) {return}
                const action = this.config.executions?.find(exec=>{
                    if (typeof(exec.test) == 'string') {return exec.test == msg}
                    else if (isRegex(exec.test)) {return exec.test.test(msg)}
                    else {
                        console.error("[ChatBpt] Invalid test syntax : "+exec.test);
                        return false;
                    }
                });
                if (action) {
                    bot.chat(action.message);
                }
                console.log(`[ChatBot] <${user}> ${msg}`);
            });
        })
    }
}

function isRegex(obj: any): boolean {
    const properties = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
    return properties.indexOf('test') !== -1 && properties.indexOf('exec') !== -1;
}

export default new ChatBot();