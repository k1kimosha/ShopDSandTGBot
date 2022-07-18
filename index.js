import { Client, Intents } from "discord.js";
import { Telegraf } from "telegraf";
import "dotenv/config";

if (process.env.DS_TOKEN != "") {

    const dsBot = new Client({
        intents: [
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGES
        ]
    });

    dsBot.login(process.env.DS_TOKEN);

}

if (process.env.TG_TOKEN != "") {

    const tgBot = new Telegraf(process.env.TG_TOKEN);

    tgBot.launch();
    
}