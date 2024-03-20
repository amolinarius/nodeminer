module.exports = {
    KillAura: {
        enabled: true,
        friends: [],
        maxReach: 6.5
    },
    AutoLog: {
        enabled: false,
        minHealth: 8
    },
    AutoArmor: {
        enabled: true
    },
    AutoEat: {
        enabled: true,
        offhand: false
    },
    Spam: {
        enabled: false,
        messages: [
            "Hello"
        ]
    },
    ChatBot: {
        enabled: true,
        executions: [
            {test: 'bot', message: 'NodeMiner'},
            {test: /.*bot.*/m, message: 'NodeMiner'}
        ]
    }
}