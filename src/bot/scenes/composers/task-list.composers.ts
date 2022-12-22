import { ComposersBase } from './composers.base'
import { Composer } from 'telegraf'
import { BotWizardContext } from '../../../interfaces/context.interface'
import { backButtonText, invalidAreaWarn } from '../../keyboards/texts'

export class TaskListComposers extends ComposersBase {
  showTasks = (): Composer<BotWizardContext> => {
    return this.createComposer(composer => {
      composer.on('text', async ctx => {
        const { text } = ctx.update.message
        if (text === backButtonText) return ctx.scene.reenter()
        const district = await this.dbManager.getDistrictByName(text)
        if (!district) return ctx.reply(invalidAreaWarn)
        else {
          // @ts-ignore
          const { regionId } = ctx.scene.state
          const tasks = await this.dbManager.getTasksByArea({ districtId: district.id, regionId })
          console.log(tasks)
        }
      })
    })
  }
}
