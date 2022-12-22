import { Scenes, session, Telegraf } from 'telegraf'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import { DatabaseManager } from '../database/database-manager'
import { startScene } from './scenes/start.scene'
import { startWizardId } from './constants'

export class Handlers {
  stage: Scenes.Stage<Scenes.SceneContext>

  constructor(
    private readonly bot: Telegraf<Scenes.SceneContext>,
    private readonly dbManager: DatabaseManager,
    private readonly commands?: BotCommand[]
  ) {}

  async setBotCommands() {
    if (this.commands) return await this.bot.telegram.setMyCommands(this.commands)
  }

  init = async () => {
    this.stage = new Scenes.Stage<Scenes.SceneContext>([startScene as any])
    this.bot.use(session())
    this.bot.use(this.stage.middleware())
    this.onStart()
    this.onKeyboardCommands()
    await this.setBotCommands()
    await this.bot.launch()
  }

  onStart = () => {
    this.bot.start(ctx => ctx.scene.enter(startWizardId))
  }

  onKeyboardCommands = () => {}
}
