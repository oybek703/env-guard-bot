import 'colors'
import { Scenes, Telegraf } from 'telegraf'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import { startCommand } from './keyboards/texts'

export class MyBot {
  private readonly token: string
  bot: Telegraf<Scenes.SceneContext>
  commands: BotCommand[] = [{ command: startCommand, description: 'Start bot' }]

  constructor() {
    this.token = process.env.BOT_TOKEN || ''
  }

  async start(): Promise<Telegraf<Scenes.SceneContext> | undefined> {
    try {
      this.bot = new Telegraf<Scenes.SceneContext>(this.token)
      this.bot.catch((err, ctx) => {
        if (err instanceof Error) {
          console.log(`${err.message.red.underline.bold} \n ${err.stack}`)
        }
      })
      console.log(`Bot started successfully!`.yellow.underline.bold)
      return this.bot
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(`Error while launching bot: ${e.message}`.red.underline.bold)
      }
    }
  }
}
