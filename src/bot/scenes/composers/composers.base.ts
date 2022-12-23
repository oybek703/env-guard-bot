import { DatabaseManager } from '../../../database/database-manager'
import { Composer, Markup } from 'telegraf'
import { BotWizardContext } from '../../../interfaces/context.interface'
import { splitArray } from '../../../utils'
import {
  backButtonText,
  chooseDistrictText,
  chooseRegionText,
  invalidAreaWarn,
  mainMenuSelectOptionsText,
  reportSituationText
} from '../../keyboards/texts'
import { mainKeyboard, reportSituationKeyboard } from '../../keyboards/markups'
import { addTaskWizardId, taskListWizardId } from '../../constants'

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

  chooseDistrict = (): Composer<BotWizardContext> => {
    return this.createComposer(composer => {
      composer.on('text', async ctx => {
        const { text } = ctx.update.message
        const sceneId = ctx.scene.current?.id
        if (text === backButtonText) {
          await ctx.scene.leave()
          if (sceneId === addTaskWizardId) {
            return ctx.reply(reportSituationText, reportSituationKeyboard)
          } else if (sceneId === taskListWizardId) {
            return ctx.reply(mainMenuSelectOptionsText, mainKeyboard)
          }
        }

        const region = await this.dbManager.getRegionByName(text)
        if (!region) return ctx.reply(invalidAreaWarn)
        else {
          ctx.scene.state = { regionId: region.id }
          const markUp = await this.getDistrictsMarkup(region.id)
          await ctx.reply(chooseDistrictText, Markup.keyboard(markUp).resize())
          return ctx.wizard.next()
        }
      })
    })
  }
}
