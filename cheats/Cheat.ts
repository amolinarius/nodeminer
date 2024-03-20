import fs from 'fs';
import { CheatConfig } from './CheatConfigs';

export default class Cheat {
    name: String;
    desc: String;
    config: CheatConfig;

    constructor(name: String, desc: String) {
        this.name = name;
        this.desc = desc;
        var config: object;
        config = JSON.parse(fs.readFileSync('./cheatsconfig.cjs').toString());
        this.config = config[name.toString()] || {enabled: true};
    }

    get enabled(): boolean {
        return this.config.enabled;
    }
}