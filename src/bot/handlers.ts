import { Scenes, Telegraf } from 'telegraf'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import { DatabaseManager } from '../database/database-manager'
import {
  backButtonText,
  backToMainButtonText,
  byAreaStatisticsButtonText,
  cancelInfoSendText,
  mainMenuSelectOptionsText,
  personalStatisticsButtonText,
  reportButtonText,
  reportSituationButtonText,
  reportSituationText,
  selectStatisticsText,
  startCommand,
  startHelloText,
  statisticsButtonText,
  taskListButtonText
} from './keyboards/texts'
import { mainKeyboard, reportSituationKeyboard, statisticsKeyboard } from './keyboards/markups'
import { ScenesBase } from './scenes/scenes.base'
import { addTaskWizardId, statisticsWizardId, taskListWizardId } from './constants'
import {
  cancelConfirmCaption,
  personalStatisticsCaption,
  taskFinishCaption,
  thanksCaption
} from '../utils'

export class Handlers {
  scenes: ScenesBase
  private readonly dbManager: DatabaseManager
  private commands: BotCommand[] = [{ command: startCommand, description: 'Start bot' }]

  constructor(private readonly bot: Telegraf<Scenes.SceneContext>, dbManager?: DatabaseManager) {
    if (dbManager) this.dbManager = dbManager
    this.scenes = new ScenesBase(bot, this.dbManager)
  }

  init = async () => {
    await this.scenes.init()
    await this.setBotCommands()
    this.onStart()
    this.onBackNavigate()
    this.onAddReport()
    this.onTaskList()
    this.onStatistics()
    this.onTaskFinishedConfirm()
    this.onTaskFinishedCancel()
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

  onBackNavigate = () => {
    this.bot.hears([backButtonText, backToMainButtonText], ctx =>
      ctx.reply(mainMenuSelectOptionsText, mainKeyboard)
    )
  }

  onAddReport = () => {
    this.bot.hears(reportButtonText, ctx => ctx.reply(reportSituationText, reportSituationKeyboard))
    this.bot.hears(reportSituationButtonText, ctx => ctx.scene.enter(addTaskWizardId))
  }

  onTaskList = () => {
    this.bot.hears(taskListButtonText, ctx => ctx.scene.enter(taskListWizardId))
  }

  onStatistics = () => {
    this.bot.hears(statisticsButtonText, ctx => ctx.reply(selectStatisticsText, statisticsKeyboard))
    this.bot.hears(personalStatisticsButtonText, async ctx => {
      const { id } = ctx.update.message.chat
      const allUserTasks = await this.dbManager.getUserTasksCount(id)
      const finishedUserTasks = await this.dbManager.getUserFinishedTasksCount(id)
      return await ctx.reply(personalStatisticsCaption(allUserTasks, finishedUserTasks))
    })
    this.bot.hears(byAreaStatisticsButtonText, ctx => ctx.scene.enter(statisticsWizardId))
  }

  onTaskFinishedConfirm = () => {
    this.bot.action(/^confirm/, async ctx => {
      // @ts-ignore
      const { data } = ctx.update.callback_query
      const [_, taskId, senderChatId] = data.split('_')
      const task = await this.dbManager.getTaskWithArea(taskId)
      if (task) {
        await this.dbManager.markTaskAsFinished(taskId)
        await ctx.deleteMessage()
        await ctx.telegram.sendPhoto(senderChatId, task.image, {
          caption: thanksCaption({ ...task, finished: true })
        })
        await ctx.answerCbQuery('✅')
        return await ctx.replyWithPhoto(task.image, {
          caption: taskFinishCaption({ ...task, finished: true })
        })
      }
    })
  }

  onTaskFinishedCancel = () => {
    this.bot.action(/^cancel/, async ctx => {
      // @ts-ignore
      const { data } = ctx.update.callback_query
      const [_, taskId, senderChatId] = data.split('_')
      const task = await this.dbManager.getTaskWithArea(taskId)
      if (task) {
        await ctx.deleteMessage()
        await ctx.telegram.sendPhoto(senderChatId, task.image, {
          caption: cancelConfirmCaption(task)
        })
        return await ctx.reply(cancelInfoSendText)
      }
    })
  }
}
