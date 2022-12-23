import { Scenes, session, Telegraf } from 'telegraf'
import { AddTaskComposers } from './composers/add-task.composers'
import { BotWizardContext } from '../../interfaces/context.interface'
import { addTaskWizardId, taskListWizardId } from '../constants'
import { DatabaseManager } from '../../database/database-manager'
import { TaskListComposers } from './composers/task-list.composers'
import { startCommand } from '../keyboards/texts'

export class ScenesBase {
  stage: Scenes.Stage<Scenes.SceneContext>
  addTaskComposers: AddTaskComposers
  taskListComposers: TaskListComposers
  constructor(
    private readonly bot: Telegraf<Scenes.SceneContext>,
    private readonly dbManger: DatabaseManager
  ) {
    this.addTaskComposers = new AddTaskComposers(dbManger)
    this.taskListComposers = new TaskListComposers(dbManger)
  }

  init = async () => {
    this.stage = new Scenes.Stage<Scenes.SceneContext>([
      this.addTaskScene() as any,
      this.taskListScene() as any
    ])
    this.bot.use(session())
    this.bot.use(this.stage.middleware())
  }

  addTaskScene = (): Scenes.WizardScene<BotWizardContext> => {
    return new Scenes.WizardScene<BotWizardContext>(
      addTaskWizardId,
      this.addTaskComposers.chooseRegion(),
      this.addTaskComposers.chooseDistrict(),
      this.addTaskComposers.saveArea(),
      this.addTaskComposers.getPhoto(),
      this.addTaskComposers.askComment(),
      this.addTaskComposers.askLocation()
    ).command(startCommand, ctx => ctx.scene.leave())
  }

  taskListScene = (): Scenes.WizardScene<BotWizardContext> => {
    return new Scenes.WizardScene<BotWizardContext>(
      taskListWizardId,
      this.taskListComposers.chooseRegion(),
      this.taskListComposers.chooseDistrict(),
      this.taskListComposers.showTasks()
    ).command(startCommand, ctx => ctx.scene.leave())
  }
}
