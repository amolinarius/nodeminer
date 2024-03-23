import mineflayer from "mineflayer";
import Cheat from "./Cheat.ts";
import { MessageSwarmConfig } from "./CheatConfigs.ts";

class MessageSwarm extends Cheat {
    config: MessageSwarmConfig = this.config;
    constructor() {
        super("MessageSwarm", "Allows you to execute certain actions by sending private messages to the bot.");
    }
    
    main(bot: mineflayer.Bot): void {
        bot.once('spawn', ()=>{
            bot.on('whisper', (user, msg)=>{
                console.log('whisper of '+user+': '+msg); 

                const allowedAuthors = this.config.authors||[];
                if (user === bot.username || allowedAuthors.indexOf(user) === -1) {return}
                const execution = this.config.executions?.find(exec=>{
                    if (typeof(exec.test) == 'string') {return exec.test == msg}
                    else if (isRegex(exec.test)) {return exec.test.test(msg)}
                    else {
                        console.error("[ChatBot] Invalid test syntax : "+exec.test);
                        return false;
                    }
                });
                const action = execution?.action;

                if (!action) {return}

                const args = action.split(' ');
                const command = args.shift()?.toLowerCase();
                if (command === 'whisper') {
                    bot.whisper(replaceAll(args[0], '%p', user), args.slice(1).join(' '));
                }
                else if (command === 'say') {
                    var message = args.join(' ');
                    const msgPartRegex = /%msg:(?:\d+|\*)/;
                    console.log(msgPartRegex.exec(args.join(' ')), msgPartRegex.exec(message));

                    while (msgPartRegex.test(message)) {
                        var coords: RegExpExecArray|string|null = msgPartRegex.exec(message);
                        console.log('xxx', coords);
                        if (!coords) {continue}
                        coords = coords[0];
                        console.log('abc', coords, coords.split(':')[1]);
                        message = message.replace(msgPartRegex, msg.slice(parseInt(coords.split(':')[1])))
                    }
                    bot.chat(replaceAll(message, '%msg', msg));
                }
                console.log('whisper of '+user+': '+msg); 
                console.log(action);
            });
        })
    }
}

function isRegex(obj: any): boolean {
    const properties = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
    return properties.indexOf('test') !== -1 && properties.indexOf('exec') !== -1;
}

function replaceAll(str: string, old: string|RegExp, _new: string): string {
    var final = str;
    if (typeof(old) == 'string') {
        while (final.indexOf(old) !== -1) {final = final.replace(old, _new)}
    }
    else {
        while (old.test(final)) {final = final.replace(old, _new)}
    }
    return final;
}

export default new MessageSwarm();