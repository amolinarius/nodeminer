import mineflayer from "mineflayer";
import Cheat from "./Cheat.ts";
import { AutoArmorConfig } from "./CheatConfigs.ts";

class AutoArmor extends Cheat {
    config: AutoArmorConfig = this.config;
    constructor() {
        super("AutoArmor", "Automatically equips armor.");
    }
    
    main(bot: mineflayer.Bot): void {
        bot.on('physicsTick', ()=>{
            if (!bot.autoEat.isEating) bot.armorManager.equipAll();
        });
    }
}

export default new AutoArmor();