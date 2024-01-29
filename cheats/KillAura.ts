import mineflayer from "mineflayer";
import Cheat from "./Cheat.ts";
import { Entity } from "prismarine-entity";
import { KillAuraConfig } from "./CheatConfigs.ts";

class KillAura extends Cheat {
    config: KillAuraConfig = this.config;
    constructor() {
        super("KillAura", "Attacks nearby mobs of selected types.");
    }
    
    main(bot: mineflayer.Bot): void {
        bot.on('physicsTick', ()=>{
            const mob = bot.nearestEntity((e: Entity): boolean => {
                if (e.position.distanceTo(bot.entity.position) > (this.config.maxReach||7)) return false;
                if (e.type=='hostile') return true;
                if (e.type=='player' && e.username!=null && (!this.config.friends || !this.config.friends.includes(e.username))) return true;
                return false;
            });
            if (!mob) return;
            if (mob.type=='player' && mob.username!=null && bot.players[mob.username].gamemode==1) return;
            
            const pos = mob.position.offset(0, mob.height/2, 0);
            bot.lookAt(pos, true).then(()=>bot.attack(mob));

        });
        console.log('Loaded KillAura');
    }
}

export default new KillAura();