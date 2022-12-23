import { format } from 'date-fns'
import { ITaskByArea } from '../interfaces/bot.interfaces'
import {
  allIconReportsCountText,
  askConfirmationText,
  byRegionStatisticsText,
  byRegionText,
  cancelConfirmText,
  captionIconComment,
  captionIconCreatedDate,
  captionIconDistrict,
  captionIconRegion,
  countFinishedText,
  countFromText,
  districtText,
  finishedCountText,
  infoText,
  inProcessCountText,
  notFinishedText,
  personalStatisticsButtonText,
  regionText,
  reportsSituationText,
  taskFinishedText,
  taskInProcessText,
  taskStatusIconText,
  taskStatusText,
  thanksForConfirmationText,
  thanksText,
  yourFinishedCountText,
  yourSendInfoText
} from '../bot/keyboards/texts'
import {
  countFinishedPlaceHolder,
  countFromPlaceHolder,
  notFinishedPlaceHolder,
  rgNamePlaceHolder
} from '../bot/constants'

export function splitArray(array: { name: string }[]) {
  const markUp = []
  let i = 0,
    j = array.length - 1
  while (i <= j) {
    if (i === j) {
      const middle = Math.ceil(array.length / 2) - 1
      markUp.push([array[middle].name])
    } else {
      markUp.push([array[i].name, array[j].name])
    }
    i++
    j--
  }
  return markUp
}

export function normalizeCaption(text: string) {
  return text.replace(/  +/gm, '')
}

export function taskByAreaCaption(task: ITaskByArea) {
  return normalizeCaption(`
  ${captionIconComment} ${task.comment}
  
  ${captionIconRegion} ${task.regionName}
  ${captionIconDistrict} ${task.districtName}
  ${taskStatusIconText} ${task.finished ? taskFinishedText : taskInProcessText}
  
  ${captionIconCreatedDate} ${format(task.createdAt, 'dd/MM/yyyy HH:MM')}
  `)
}

export function thanksCaption(task: ITaskByArea) {
  return normalizeCaption(`
  ${thanksText}
  
  ${infoText} 
  ${regionText} ${task.regionName} 
  ${districtText} ${task.districtName}
  ${taskStatusText} ${task.finished ? taskFinishedText : taskInProcessText}
  
  ${captionIconCreatedDate} ${format(task.createdAt, 'dd/MM/yyyy HH:MM')} 
  `)
}

export function taskFinishCaption(task: ITaskByArea) {
  return normalizeCaption(`
  ${thanksForConfirmationText}
  
  ${infoText} 
  ${regionText} ${task.regionName} 
  ${districtText} ${task.districtName}
  ${taskStatusText} ${task.finished ? taskFinishedText : taskInProcessText}
  
  ${captionIconCreatedDate} ${format(task.createdAt, 'dd/MM/yyyy HH:MM')}
  `)
}

export function cancelConfirmCaption(task: ITaskByArea) {
  return normalizeCaption(`
  ${cancelConfirmText}
  
  ${infoText} 
  ${regionText} ${task.regionName} 
  ${districtText} ${task.districtName}
  ${taskStatusText} ${task.finished ? taskFinishedText : taskInProcessText}
  
  ${captionIconCreatedDate} ${format(task.createdAt, 'dd/MM/yyyy HH:MM')}
  `)
}

export function askConfirmationCaption(task: ITaskByArea) {
  return normalizeCaption(`
  ${askConfirmationText}
  
  ${yourSendInfoText}
  ${regionText} ${task.regionName} 
  ${districtText} ${task.districtName}
  ${taskStatusText} ${task.finished ? taskFinishedText : taskInProcessText}
  `)
}

export function personalStatisticsCaption(all: number, finished: number) {
  return normalizeCaption(`
  ${personalStatisticsButtonText}
  
  ${reportsSituationText}
  ${allIconReportsCountText} ${all}
  ${finishedCountText} ${finished}
  ${inProcessCountText} ${all - finished}
  
  ${yourFinishedCountText} ${finished}
  `)
}

export function byAreaStatisticsCaption(regionName: string, all: number, finished: number) {
  return normalizeCaption(`
  ${byRegionStatisticsText.replace(rgNamePlaceHolder, regionName)}
  
  ${byRegionText}
  ${countFromText.replace(countFromPlaceHolder, `${all}`)}
  ${countFinishedText.replace(countFinishedPlaceHolder, `${finished}`)}
  ${notFinishedText.replace(notFinishedPlaceHolder, `${all - finished}`)}
  `)
}
