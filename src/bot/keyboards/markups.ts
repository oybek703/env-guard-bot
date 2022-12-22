import { Markup } from 'telegraf'
import {
  backButtonText,
  reportButtonText,
  reportSituationButtonText,
  statisticsButtonText,
  taskListButtonText
} from './texts'

export const mainKeyboard = Markup.keyboard([
  [reportButtonText],
  [taskListButtonText],
  [statisticsButtonText]
]).resize()

export const reportSituationMenuKeyboard = Markup.keyboard([
  [reportSituationButtonText],
  [backButtonText]
]).resize()
