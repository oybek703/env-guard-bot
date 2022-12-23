import { ComposersBase } from './composers.base'
import { Composer, Markup, TelegramError } from 'telegraf'
import { BotWizardContext } from '../../../interfaces/context.interface'
import {
  backButtonText,
  backToMainButtonText,
  botBlockedWarn,
  cancelButtonText,
  canChooseTaskText,
  confirmButtonText,
  invalidAreaWarn,
  mainMenuSelectOptionsText,
  taskCheckSendText,
  taskFinishedButtonText,
  tasksListEmptyText
} from '../../keyboards/texts'
import { backToMainKeyboard, mainKeyboard } from '../../keyboards/markups'
import { askConfirmationCaption, taskByAreaCaption } from '../../../utils'

export class TaskListComposers extends ComposersBase {
  showTasks = (): Composer<BotWizardContext> => {
    return this.createComposer(composer => {
      composer.on('text', async ctx => {
        const { text } = ctx.update.message
        if (text === backToMainButtonText) {
          // @ts-ignore
          const { sendTasks } = ctx.scene.state
          await Promise.all(sendTasks.map((messageId: number) => ctx.deleteMessage(messageId)))
          await ctx.scene.leave()
          return ctx.reply(mainMenuSelectOptionsText, mainKeyboard)
        }
        if (text === backButtonText) return ctx.scene.reenter()
        const district = await this.dbManager.getDistrictByName(text)
        if (!district) return ctx.reply(invalidAreaWarn)
        else {
          // @ts-ignore
          const { regionId } = ctx.scene.state
          const tasks = await this.dbManager.getTasksByArea({ districtId: district.id, regionId })
          if (tasks.length === 0) {
            await ctx.reply(tasksListEmptyText, backToMainKeyboard)
            return ctx.scene.leave()
          }
          await ctx.reply(canChooseTaskText, backToMainKeyboard)
          const sendTasks: number[] = []
          const { id: chatId } = ctx.update.message.chat
          await Promise.all(
            tasks.map(async task => {
              const { message_id } = await ctx.replyWithPhoto(task.image, {
                caption: taskByAreaCaption(task),
                ...Markup.inlineKeyboard(
                  task.finished
                    ? []
                    : [Markup.button.callback(taskFinishedButtonText, task.id.toString())]
                )
              })
              sendTasks.push(message_id)
            })
          )
          ctx.scene.state = { ...ctx.scene.state, sendTasks }
        }
      })
      composer.action(/\d/, async ctx => {
        // @ts-ignore
        const { data: taskId } = ctx.update.callback_query
        // @ts-ignore
        const { sendTasks } = ctx.scene.state
        const task = await this.dbManager.getTaskWithArea(taskId)
        if (task) {
          await Promise.all(sendTasks.map((messageId: number) => ctx.deleteMessage(messageId)))
          await ctx.replyWithPhoto(task.image, {
            caption: taskByAreaCaption(task)
          })
          await ctx.reply(taskCheckSendText, backToMainKeyboard)
          try {
            // @ts-ignore
            const { id: senderChatId } = ctx.update.callback_query.message?.chat
            await ctx.telegram.sendPhoto(task.chatId, task.image, {
              caption: askConfirmationCaption(task),
              ...Markup.inlineKeyboard([
                Markup.button.callback(confirmButtonText, `confirm_${task.id}_${senderChatId}`),
                Markup.button.callback(cancelButtonText, `cancel_${task.id}_${senderChatId}`)
              ])
            })
          } catch (e) {
            if (e instanceof TelegramError) {
              if (e.response.error_code === 403) {
                await ctx.reply(botBlockedWarn, mainKeyboard)
              }
            }
          }
          return ctx.scene.leave()
        }
      })
    })
  }
}
