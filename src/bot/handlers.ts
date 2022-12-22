import { Scenes, Telegraf } from 'telegraf'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import { DatabaseManager } from '../database/database-manager'
import {
  backButtonText,
  mainMenuSelectOptionsText,
  reportButtonText,
  reportSituationButtonText,
  reportSituationText,
  startCommand,
  startHelloText
} from './keyboards/texts'
import { mainKeyboard, reportSituationMenuKeyboard } from './keyboards/markups'
import { ScenesBase } from './scenes/scenes.base'
import { addTaskWizardId } from './constants'

export class Handlers {
  scenes: ScenesBase
  private readonly dbManager: DatabaseManager
  addTaskWizard = addTaskWizardId
  private commands: BotCommand[] = [{ command: startCommand, description: 'Start bot' }]

  constructor(private readonly bot: Telegraf<Scenes.SceneContext>, dbManager?: DatabaseManager) {
    if (dbManager) this.dbManager = dbManager
    this.scenes = new ScenesBase(bot, this.dbManager)
  }

  init = async () => {
    await this.scenes.init()
    await this.setBotCommands()
    this.onStart()
    this.onKeyboardCommands()
    await this.bot.launch()
  }

  setBotCommands = () => this.bot.telegram.setMyCommands(this.commands)

  onStart = () => {
    this.bot.start(async ctx => {
      await this.dbManager.saveUser(ctx.update.message.from)
      await ctx.reply(startHelloText)
      return await ctx.reply(mainMenuSelectOptionsText, mainKeyboard)
    })
  }

  onKeyboardCommands = () => {
    this.bot.hears(reportButtonText, ctx =>
      ctx.reply(reportSituationText, reportSituationMenuKeyboard)
    )
    this.bot.hears(reportSituationButtonText, ctx => ctx.scene.enter(this.addTaskWizard))
    this.bot.hears(backButtonText, ctx => ctx.reply(mainMenuSelectOptionsText, mainKeyboard))
  }
}
