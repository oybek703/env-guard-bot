import { Markup } from 'telegraf'
import {
  backButtonText,
  backToMainButtonText,
  passLocationButtonText,
  reportButtonText,
  reportSituationButtonText,
  sendLocationButtonText,
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

export const backKeyboard = Markup.keyboard([backButtonText]).resize()
export const backToMainKeyboard = Markup.keyboard([backToMainButtonText]).resize()

export const askLocationMenuKeyboard = Markup.keyboard([
  [{ text: sendLocationButtonText, request_location: true }],
  [passLocationButtonText],
  [backButtonText]
]).resize()
