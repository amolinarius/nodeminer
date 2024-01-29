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
export interface AutoEzConfig extends CheatConfig {
    maxRange?: number,
    sendIfPopTotem?: boolean
}

export interface CheatConfig {
    enabled: boolean
}