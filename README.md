# BoogieBot

## Installation
1. Install Node
2. Install NPM
3. Optional: Install pm2 `npm install pm2 -g`
3. Clone this repo `git clone https://github.com/eriteric/boogiebot.git`
4. Install dependencies: Cd to project root and: `npm install`
5. Add an auth.json file in the project root with your bot key
```
{
   "token": "xXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx"
}
```

## Boogie Down

To start the bot type: `npm run bot`
To start the bot in a process managed cluster: `pm2 start pm2.json -i 1`
To reload managed cluster with latest version: `pm2 reload boogiebot`

Boogiebot will store each triggering message and its reply in the logs.
To view logs: `pm2 logs`
To clear logs: `pm2 flush`

## Third-Party Documentation
1. [Discord.js API](https://discord.js.org/#/docs)
