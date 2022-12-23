import { ComposersBase } from './composers.base'
import { Composer } from 'telegraf'
import { BotWizardContext } from '../../../interfaces/context.interface'
import {
  allIconReportsCountText,
  allText,
  backButtonText,
  finishedCountText,
  inProcessCountText,
  invalidAreaWarn,
  selectStatisticsText
} from '../../keyboards/texts'
import { statisticsKeyboard } from '../../keyboards/markups'
import { byAreaStatisticsCaption, normalizeCaption } from '../../../utils'

export class StatisticsComposers extends ComposersBase {
  showStatistics = (): Composer<BotWizardContext> => {
    return this.createComposer(composer => {
      composer.on('text', async ctx => {
        const { text } = ctx.update.message
        if (text === backButtonText) {
          await ctx.scene.leave()
          return ctx.reply(selectStatisticsText, statisticsKeyboard)
        }
        const region = await this.dbManager.getRegionByName(text)
        if (!region) return await ctx.reply(invalidAreaWarn)
        else {
          const districts = await this.dbManager.getDistrictsByRegion(region.id)
          let caption = ``
          await Promise.all(
            districts.map(async ({ id, name }, index) => {
              const allDistrictTasks = await this.dbManager.getDistrictsTasksCount(id)
              const finishedDistrictTasks = await this.dbManager.getDistrictsFinishedTasksCount(id)
              caption += normalizeCaption(`
              ${index === 0 ? `\n` : ''}${name}: 
              ${allIconReportsCountText} ${allDistrictTasks} 
              ${finishedCountText} ${finishedDistrictTasks} 
              ${inProcessCountText} ${allDistrictTasks - finishedDistrictTasks}
              `)
            })
          )
          const allRegionTasks = await this.dbManager.getRegionTasksCount(region.id)
          const finishedRegionTasks = await this.dbManager.getRegionFinishedTasksCount(region.id)
          await ctx.reply(caption)
          await ctx.reply(
            byAreaStatisticsCaption(region.name, allRegionTasks, finishedRegionTasks),
            statisticsKeyboard
          )
          return ctx.scene.leave()
        }
      })
    })
  }
}
