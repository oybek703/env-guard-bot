import 'colors'
import { Scenes, Telegraf } from 'telegraf'

export class BotBase {
  private readonly token: string
  bot: Telegraf<Scenes.SceneContext>

  constructor() {
    this.token = process.env.BOT_TOKEN || ''
  }

  async start() {
    try {
      this.bot = new Telegraf<Scenes.SceneContext>(this.token)
      this.bot.catch((err, ctx) => {
        if (err instanceof Error) {
          console.log(`${err.message.red.underline.bold} \n ${err.stack}`)
        }
      })
      console.log(`Bot started successfully!`.yellow.underline.bold)
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(`Error while launching bot: ${e.message}`.red.underline.bold)
      }
    }
  }
}
