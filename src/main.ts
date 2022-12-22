import { DatabaseManager } from './database/database-manager'
import { getEnvConfig } from './config/env.config'
import { BotBase } from './bot/bot.base'
import { Handlers } from './bot/handlers'

async function start() {
  getEnvConfig()
  const dbManager = new DatabaseManager()
  await dbManager.init()
  const botBase = new BotBase()
  await botBase.start()
  const handlers = new Handlers(botBase.bot, dbManager)
  await handlers.init()
}

;(async () => await start())()
