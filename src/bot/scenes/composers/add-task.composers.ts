import { Composer, Markup } from 'telegraf'
import { BotWizardContext } from '../../../interfaces/context.interface'
import { ComposersBase } from './composers.base'
import {
  backButtonText,
  chooseDistrictText,
  invalidAreaWarn,
  leaveCommentText,
  mainMenuSelectOptionsText,
  passLocationButtonText,
  sendLocationText,
  sendLocationWarn,
  sendPhotoText,
  sendPhotoWarn,
  taskAddedText
} from '../../keyboards/texts'
import { askLocationMenuKeyboard, backKeyboard, mainKeyboard } from '../../keyboards/markups'

export class AddTaskComposers extends ComposersBase {
  saveArea = (): Composer<BotWizardContext> => {
    return this.createComposer(composer => {
      composer.on('text', async ctx => {
        const { text } = ctx.update.message
        if (text === backButtonText) return ctx.scene.reenter()
        const district = await this.dbManager.getDistrictByName(text)
        if (!district) return ctx.reply(invalidAreaWarn)
        else {
          ctx.scene.state = { ...ctx.scene.state, districtId: district.id }
          await ctx.reply(sendPhotoText, backKeyboard.oneTime())
          return ctx.wizard.next()
        }
      })
    })
  }

  getPhoto = (): Composer<BotWizardContext> => {
    return this.createComposer(composer => {
      composer.on('text', async ctx => {
        const { text } = ctx.update.message
        if (text === backButtonText) {
          // @ts-ignore
          const { regionId } = ctx.scene.state
          const districtsMarkUp = await this.getDistrictsMarkup(regionId)
          await ctx.reply(chooseDistrictText, Markup.keyboard(districtsMarkUp).resize())
          return ctx.wizard.back()
        }
        ctx.reply(sendPhotoWarn, backKeyboard.oneTime())
      })
      composer.on('photo', async ctx => {
        const { file_id } = ctx.update.message.photo[0]
        ctx.scene.state = { ...ctx.scene.state, image: file_id }
        await ctx.reply(leaveCommentText, backKeyboard.oneTime())
        return ctx.wizard.next()
      })
    })
  }

  askComment = (): Composer<BotWizardContext> => {
    return this.createComposer(composer => {
      composer.on('text', async ctx => {
        const { text } = ctx.update.message
        if (text === backButtonText) {
          await ctx.reply(sendPhotoText, backKeyboard.oneTime())
          return ctx.wizard.back()
        }
        ctx.scene.state = { ...ctx.scene.state, comment: text }
        await ctx.reply(sendLocationText, askLocationMenuKeyboard)
        return ctx.wizard.next()
      })
    })
  }

  askLocation = (): Composer<BotWizardContext> => {
    return this.createComposer(composer => {
      composer.on('text', async ctx => {
        const { text } = ctx.update.message
        if (text === backButtonText) {
          await ctx.reply(leaveCommentText, backKeyboard.oneTime())
          return ctx.wizard.back()
        }
        if (text === passLocationButtonText) {
          // @ts-ignore
          const { regionId, districtId, image, comment } = ctx.scene.state
          const { id: telegramUserId } = ctx.update.message.from
          const { id: chatId } = ctx.update.message.chat
          await this.dbManager.createTask({
            comment,
            image,
            districtId,
            regionId,
            chatId,
            telegramUserId
          })
          await ctx.reply(taskAddedText)
          await ctx.reply(mainMenuSelectOptionsText, mainKeyboard)
          return ctx.scene.leave()
        } else return ctx.reply(sendLocationWarn)
      })
      composer.on('location', async ctx => {
        const location = JSON.stringify(ctx.update.message.location)
        // @ts-ignore
        const { regionId, districtId, image, comment } = ctx.scene.state
        const { id: telegramUserId } = ctx.update.message.from
        const { id: chatId } = ctx.update.message.chat
        await this.dbManager.createTask({
          comment,
          image,
          districtId,
          regionId,
          chatId,
          telegramUserId,
          location
        })
        await ctx.reply(taskAddedText)
        await ctx.reply(mainMenuSelectOptionsText, mainKeyboard)
        return ctx.scene.leave()
      })
    })
  }
}
