import { Markup } from 'telegraf'
import {
  backButtonText,
  backToMainButtonText,
  byAreaStatisticsButtonText,
  passLocationButtonText,
  personalStatisticsButtonText,
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

export const reportSituationKeyboard = Markup.keyboard([
  [reportSituationButtonText],
  [backButtonText]
]).resize()

export const backKeyboard = Markup.keyboard([backButtonText]).resize()
export const backToMainKeyboard = Markup.keyboard([backToMainButtonText]).resize()

export const askLocationKeyboard = Markup.keyboard([
  [{ text: sendLocationButtonText, request_location: true }],
  [passLocationButtonText],
  [backButtonText]
]).resize()

export const statisticsKeyboard = Markup.keyboard([
  [personalStatisticsButtonText],
  [byAreaStatisticsButtonText],
  [backButtonText]
]).resize()
