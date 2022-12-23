import { format } from 'date-fns'
import { ITaskByArea } from '../interfaces/bot.interfaces'
import {
  askConfirmationText,
  cancelConfirmText,
  captionIconComment,
  captionIconCreatedDate,
  captionIconDistrict,
  captionIconRegion,
  districtText,
  infoText,
  regionText,
  taskFinishedText,
  taskInProcessText,
  taskStatusIconText,
  taskStatusText,
  thanksForConfirmationText,
  thanksText,
  yourSendInfoText
} from '../bot/keyboards/texts'

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
