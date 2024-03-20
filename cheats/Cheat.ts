import fs from 'fs';
import { CheatConfig } from './CheatConfigs';
import config from '../cheatsconfig.cjs';

export default class Cheat {
    name: String;
    desc: String;
    config: CheatConfig;

    constructor(name: String, desc: String) {
        this.name = name;
        this.desc = desc;
        this.config = config[name.toString()] || {enabled: true};
    }

    get enabled(): boolean {
        return this.config.enabled;
    }
}