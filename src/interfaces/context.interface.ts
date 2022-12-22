import { Context, Scenes } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'

export type BotWizardContext = Context<Update> & {
  scene: Scenes.SceneContextScene<any, Scenes.WizardSessionData>
  wizard: Scenes.WizardContextWizard<any>
}
