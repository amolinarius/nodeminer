export interface KillAuraConfig extends CheatConfig {
    friends?: String[],
    maxReach?: number
}
export interface AutoLogConfig extends CheatConfig {
    minHealth?: number
}
export interface AutoArmorConfig extends CheatConfig {}
export interface AutoEatConfig extends CheatConfig {
    minFood?: number,
    priority?: "foodPoints"|"saturation",
    bannedFood?: string[],
    offhand?: boolean
}
export interface SpamConfig extends CheatConfig {
    messages?: string[],
    delay?: number,
    randomize?: boolean
}
export interface ChatBotConfig extends CheatConfig {
    executions?: {test: RegExp|string, message: string}[]
}
export interface MessageSwarmConfig extends CheatConfig {
    authors?: string[],
    executions?: {test: RegExp|string, action: string}[]
}

export interface CheatConfig {
    enabled: boolean
}