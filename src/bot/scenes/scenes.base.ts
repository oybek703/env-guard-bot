import { Scenes, session, Telegraf } from 'telegraf'
import { MainComposers } from './composers/main-composers'
import { BotWizardContext } from '../../interfaces/context.interface'
import { addTaskWizardId } from '../constants'
import { DatabaseManager } from '../../database/database-manager'

export class ScenesBase {
  stage: Scenes.Stage<Scenes.SceneContext>
  composers: MainComposers
  constructor(
    private readonly bot: Telegraf<Scenes.SceneContext>,
    private readonly dbManger: DatabaseManager
  ) {
    this.composers = new MainComposers(dbManger)
  }

  init = async () => {
    this.stage = new Scenes.Stage<Scenes.SceneContext>([this.addTaskScene() as any])
    this.bot.use(session())
    this.bot.use(this.stage.middleware())
  }

  addTaskScene = (): Scenes.WizardScene<BotWizardContext> => {
    return new Scenes.WizardScene<BotWizardContext>(
      addTaskWizardId,
      this.composers.chooseRegion(),
      this.composers.chooseDistrict()
    )
  }
}
