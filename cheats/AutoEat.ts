import mineflayer from "mineflayer";
import Cheat from "./Cheat.ts";
import { AutoEatConfig } from "./CheatConfigs.ts";

class AutoEat extends Cheat {
    config: AutoEatConfig = this.config;
    constructor() {
        super("AutoEat", "Automatically eats.");
    }
    
    main(bot: mineflayer.Bot): void {
        bot.once('spawn', ()=>{
            if (this.config.minFood) bot.autoEat.options.startAt = this.config.minFood;
            if (this.config.priority) bot.autoEat.options.priority = this.config.priority;
            if (this.config.bannedFood) bot.autoEat.options.bannedFood = this.config.bannedFood;
            else bot.autoEat.options.bannedFood.push('enchanted_golden_apple');
            if (this.config.offhand) bot.autoEat.options.offhand = this.config.offhand;
        });
    }

    ifDisabled(bot: mineflayer.Bot): void {
        bot.autoEat.disable();
    }
}

export default new AutoEat();
