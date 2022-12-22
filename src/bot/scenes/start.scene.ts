import {Composer, Scenes} from 'telegraf'
import {startWizardId} from '../constants'
import {BotWizardContext} from '../../interfaces/context.interface'

const askName = new Composer<BotWizardContext>()

askName.on('message', async ctx => {
    const {first_name, last_name} = ctx.update.message.from
    await ctx.reply(`Hi ${first_name || ''} ${last_name || ''} 👋`)
    await ctx.scene.leave()
})

export const startScene = new Scenes.WizardScene(startWizardId, askName)
