# NodeMiner

## Installation

To use this bot, you need to download and install [NodeJS](https://nodejs.org/en).  
It's the only dependency that the program needs  

## Starting

To start the bot, open a terminal, move to the good folder and execute the command `npm start`.  
If you want to automatically restart it if you make any changes, then run `npm test` instead.  
> [!NOTE]
> If you run it for the first time, you'll need to run `npm i` or `npm install` first.

## Open Webview

There's a kind of freecam that you can access through your browser to see the chunks around the bot.  
To access it, just go to your browser and type the URL `localhost`. It will open it.  
> [!NOTE]
> You may need to interact with the chunks for the webview to load them
> [!NOTE]
> There can be some bugs with the new blocks, as the bot won't understand these blocks and so won't load their textures

## Modifying bot settings

The bot settings are directly written in the `main.js` file. They are specifically in the "Create bot" part of the file.  
The data like username, server on which you need to login and so on is here.  
To change the server IP, look for the `host` parameter and type the IP address between quotes.
> [!WARNING]
> If a port is specified, you mustn't add a colon in the IP address. You'll need to add a `port` parameter with the port directly written

### Login to a Cracked account

To login to a Cracked account, you just need to edit the `username` parameter. You can choose anything but the bot will work only on crackd servers.

### Login to a Microsoft account

To login to a Microsoft account, you must add the following arguments :

```js
const bot = mineflayer.createBot({
    host: 'exampleip.com',
    auth: 'microsoft',
    username: 'microsoftAccountEmail@gmail.com',
    password: 'supersecretpassword'
});
```

## Modifying cheats settings

All the configuration is in the `cheatsconfig.cjs` file.  
So, to toggle a cheat or modifiy its settings, you'll need to edit it.  
In the file, type the name of the cheat between quotes and add a colon, followed by a curly bracket.  
The list of all configs for the cheats will be described below, but, as for now, you can type `"enabled": true` to enable a cheat and `"enabled": false` to disable it.

## List of all possible configurations for each cheat

### AutoArmor

- enabled: boolean  

Default :

```json
{
    "AutoArmor": {
        "enabled": true
    }
}
```

### AutoEat

- enabled: boolean
- minFood: number (Minimum food level before eating)
- priority: "foodPoints"|"saturation" (Food choosing criteria)
- bannedFood: string[] (List of not allowed food)
- offhand: boolean (**Doesn't seems to work**) (Whether or not to put the food in offhand)

Default :

```json
{
    "AutoEat": {
        "enabled": true,
        "minFood": 16,
        "priority": "saturation",
        "bannedFood": ["pufferfish", "spider_eye", "poisonous_potato", "rotten_flesh", "chorus_fruit", "chicken", "suspicious_stew", "golden_apple"],
        "offhand": false
    }
}
```

### AutoLog

- enabled: boolean
- minHealth: number (Minimum health before logging out)

Default :

```json
{
    "AutoLog": {
        "enabled": false,
        "minHealth": 8
    }
}
```

### ChatBot

- enabled: boolean
- executions: object[] (Array of rules about when to send message/command)
- executions.test: string|RegExp (Pattern or literal that must match)
- executions.message: string (Message to send back)

Default :

```js
{
    "ChatBot": {
        "enabled": true,
        "executions": [
            {"test": "bot", "message": "NodeMiner"},
            {"test": /.*bot.*/m, "message": "NodeMiner"}
        ]
    }
}
```

### KillAura

- enabled: boolean
- friends: string[] (List of players that the bot mustn't kill)
- maxReach: number (The maximum reach to attack mobs. **Setting it over 6.5 will just make it punch the air**)

Default :

```json
{
    "KillAura": {
        "enabled": true,
        "friends": [],
        "maxReach": 6.5
    }
}
```

### MessageSwarm

- enabled: boolean
- executions: object[] (Array of rules about when to perform action)
- executions.test: string|RegExp (Pattern or literal that must match)
- executions.action: string (Action that the bot will do, allowed actions are written below)
- authors: string[] (Authors that are allowed to perform the actions)

> [!TIP]
> The messages in `executions.test` only works with private messages from allowed authors, which are none by default.  

| Actions                           | Description                                     | Keywords                                               |
|-----------------------------------|-------------------------------------------------|--------------------------------------------------------|
| Say \<message>                    | Makes the bot send `message` to the global chat | **%p**: The original author of the message             |
| Whisper \<player> \<message>      | Makes the bot send `message` to `player`        | **%msg**: The original message that was sent to the bot <br/> **%msg:\<digit>**: The original message that was sent to the bot, sliced from `digit` characters |

Default :

```js
{
    "MessageSwarm": {
        "enabled": true,
        "executions": [
            {"test": /swarm/m, "action": 'Whisper %p MessageSwarm is working'},
            {"test": /say .*/m, "action": 'Say %msg:4'}
        ],
        "authors": []
    }
}
```

### Spam

- enabled: boolean
- messages: string[] (List of messages or commands to send)
- delay: number (Delay between messages)
- randomize: boolean (Whether or not to choose message randomly. **It won't send the same message twice in a row, enable it only if you have at least 3 messages**)

Default :

```json
{
    "Spam": {
        "enabled": false,
        "messages": [
            "Hello"
        ],
        "delay": 1000,
        "randomize": false
    }
}
```
