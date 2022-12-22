import { Composer, Markup } from 'telegraf'
import { BotWizardContext } from '../../../interfaces/context.interface'
import { ComposersBase } from './composers.base'
import {
  backButtonText,
  chooseDistrictText,
  invalidAreaWarn,
  reportSituationText
} from '../../keyboards/texts'
import { reportSituationMenuKeyboard } from '../../keyboards/markups'

export class MainComposers extends ComposersBase {
  chooseDistrict = (): Composer<BotWizardContext> => {
    const composer = new Composer<BotWizardContext>()
    composer.on('text', async ctx => {
      const { text } = ctx.update.message
      if (text === backButtonText) {
        await ctx.scene.leave()
        return ctx.reply(reportSituationText, reportSituationMenuKeyboard)
      }
      const region = await this.dbManager.findRegionByName(text)
      if (!region) {
        await ctx.reply(invalidAreaWarn)
        return ctx.scene.reenter()
      } else {
        const markUp = await this.getDistrictsMarkup(region.id)
        await ctx.reply(chooseDistrictText, Markup.keyboard(markUp).resize())
        ctx.scene.state = { RegionId: region.id }
        return ctx.wizard.next()
      }
    })
    return composer
  }
}
