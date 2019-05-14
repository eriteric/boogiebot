# BoogieBot

## Dependencies
1. Install Node
2. Install NPM
3. Install libtool-bin - `sudo apt install libtool-bin`
4. Install automake - `sudo apt install automake`
5. Install autoconf - `sudo apt install autoconf`
3. Optional: Install pm2 `npm install pm2 -g`

## Installation
1. Clone this repo `git clone https://github.com/eriteric/boogiebot.git`
2. Install dependencies: Cd to project root and: `npm install`
3. Add an auth.json file in the project root with your bot key
```
{
   "token": "xXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx"
}
```

## Boogie Down

- Start boogiebot: `npm run bot`
- Start boogiebot with Greeno to keep him awake: `pm2 start pm2.json -i 1`
- Have Greeno restart boogiebot with no dead air: `pm2 reload boogiebot`

Boogiebot will store each triggering message and its reply in the logs.
- View logs: `pm2 logs`
- Clear logs: `pm2 flush`

## Third-Party Documentation
1. [Discord.js API](https://discord.js.org/#/docs)
