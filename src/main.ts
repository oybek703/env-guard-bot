import { DatabaseManager } from './database/database-manager'
import { getEnvConfig } from './config/env.config'
import { MyBot } from './bot/my-bot'
import { Handlers } from './bot/handlers'

async function start() {
  getEnvConfig()
  const dbManager = new DatabaseManager()
  await dbManager.init()
  const myBot = new MyBot()
  await myBot.start()
  const handlers = new Handlers(myBot.bot, dbManager)
  await handlers.init()
}

;(async () => await start())()
