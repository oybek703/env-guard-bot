import { DatabaseManager } from './database/database-manager'
import { getEnvConfig } from './config/env.config'
import { BotClass } from './bot/bot.class'
import { Handlers } from './bot/handlers'

async function start() {
  getEnvConfig()
  const dbManager = new DatabaseManager()
  await dbManager.init()
  const myBot = new BotClass()
  await myBot.start()
  const handlers = new Handlers(myBot.bot, dbManager, myBot.commands)
  await handlers.init()
}

;(async () => await start())()
