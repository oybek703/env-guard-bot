import { DatabaseManager } from '../../../database/database-manager'
import { Composer, Markup } from 'telegraf'
import { BotWizardContext } from '../../../interfaces/context.interface'
import { splitArray } from '../../../utils'
import { backButtonText, chooseRegionText } from '../../keyboards/texts'

export class ComposersBase {
  constructor(protected readonly dbManager: DatabaseManager) {}

  getRegionsMarkUp = async () => {
    const regions = await this.dbManager.getAllRegions()
    const markUp = splitArray(regions)
    markUp.push([backButtonText])
    return markUp
  }

  getDistrictsMarkup = async (regionId: number) => {
    const districts = await this.dbManager.getDistrictsByRegion(regionId)
    const markUp = splitArray(districts)
    markUp.push([backButtonText])
    return markUp
  }

  createComposer = (
    handler: (composer: Composer<BotWizardContext>) => void
  ): Composer<BotWizardContext> => {
    const composer = new Composer<BotWizardContext>()
    handler(composer)
    return composer
  }

  chooseRegion = (): Composer<BotWizardContext> => {
    return this.createComposer(composer => {
      composer.on('text', async ctx => {
        const regionsMarkUp = await this.getRegionsMarkUp()
        await ctx.reply(chooseRegionText, Markup.keyboard(regionsMarkUp).resize())
        return ctx.wizard.next()
      })
    })
  }
}
