import {
  countFinishedPlaceHolder,
  countFromPlaceHolder,
  notFinishedPlaceHolder,
  rgNamePlaceHolder
} from '../constants'

export const startCommand = `start`
export const reportButtonText = `📝 Xabar berish`
export const taskListButtonText = `✔ Vazifalar ro'yhati`
export const statisticsButtonText = `📊 Statistika`
export const backButtonText = '⏪ Orqaga'
export const reportSituationButtonText = '⚡ Holat haqida bildirish'
export const backToMainButtonText = `⏪ Asosiy bo'lim`
export const sendLocationButtonText = `📍 Lokatsiyani jo'natish`
export const passLocationButtonText = `➡ Lokatsiya yubormasdan o'tkazib yuborish`
export const taskFinishedButtonText = `✅ Bartaraf etilganini bildirish`
export const confirmButtonText = `✅ Tasdiqlash`
export const cancelButtonText = `❌ Rad etish`
export const personalStatisticsButtonText = `👤 Shaxsiy statistika`
export const byAreaStatisticsButtonText = `📊 Hududiy statistika`

export const startHelloText = `
Assalomu aleykum 👋
Tozalik xabarchisi botiga sizning tashrifingizdan benihoya 
xursandmiz.🙂
Bot atrof-muhitdagi ekologik muammolarga e'tiborni oshirish 
va tozalash ishlarini olib borishda samaradorlikni oshirish 
maqsadida ishlab chiqilgan. ✅
Siz ham yashab turgan muhitingizga e'tiborli bo'lgan holda
muammolar haqida xabar berishingiz yoki mavjud muammolarni
bartaraf qilishda o'z hissangizni qo'shishingiz mumkin. 🤝
`

export const mainMenuSelectOptionsText = `👇 Quyidagilardan birini tanlashingiz mumkin:`
export const selectStatisticsText = `Qaysi turdagi statistikani ko'rishni xohlaysiz?`

export const chooseRegionText = `👇 Viloyatlardan birini tanlang:`
export const chooseDistrictText = `👇 Tumanlardan birini tanlang:`
export const canChooseTaskText = `📝 Tanlashingiz mumkin`

export const reportSituationText = `
🌳 Bu bo'lim orqali siz ekologiyaga zarar keltirayotgan yoki zarar
keltirish xavfi mavjud bo'lgan holatlar haqida xabar berishingiz mumkin.
Sizning bildirishingiz vazifalar 
ro'yhatiga qo'shiladi va bartaraf etilgach tasdiqlashingiz mumkin bo'ladi.
`

export const taskCheckSendText = `
🥳 Sizdan benihoya minnatdormiz!
⌛ Muammo bartaraf etilgani haqidagi xabar tasqidlash uchun 
yuborildi. Sizga javobni tez orada ma'lum qilamiz. 
`

export const askConfirmationText = `
👏 Hurmatli foydalanuvchi, sizning yuborgan ma'lumotlaringizga ko'ra
aniqlangan muammo bartaraf etilgani haqida xabar oldik.
Sizdan bu xabar haqiqatdan to'g'ri ekanini tasdiqlashingizni so'raymiz ✅.
`

export const thanksText = `
✅ Siz tomondan bartaraf etilgan muammo tasdiqlandi.
🤝 Hamkorligingiz uchun minnatdormiz.
`

export const thanksForConfirmationText = `
👌 Tasdiqlaganingiz uchun tashakkur! Xabar yuboruvchisiga 
tasdiqlaganingiz haqida bildirdik.
Endilikda bu holat vazifalar ro'yhatida ko'rsatilmaydi.
🤝 Hamkorligingiz uchun minnatdormiz!
`

export const cancelConfirmText = `
⚠ Sizning so'rovingiz rad etildi.
Iltimos ma'lumotlar aniqligini tekshiring yoki keyinroq urinib ko'ring.
`

export const cancelInfoSendText = `
⚠ Sizning javobingiz yetkazildi.
`

export const taskAddedText = `✅ Bildirishnomangiz vazifalar ro'yhatiga qo'shildi, sizdan minnatdormiz.`
export const tasksListEmptyText = `🗑 Vazifalar ro'yhati bu hudud uchun bo'sh.`

export const sendPhotoText = `🗃 Ajoyib! Marhamat, holatni tasvirlovchi fotosuratni yuborishingiz mumkin.`
export const leaveCommentText = `💬 Holat haqida izoh qoldirishingiz mumkin.`
export const sendLocationText = '🛣 Holat joylashgan manzilni yuborishingiz mumkin'

export const invalidAreaWarn = `❌ Noto'g'ri hudud!`
export const sendPhotoWarn = `❌ Iltimos rasm yuboring!`
export const sendLocationWarn = `❌ Iltimos manzil yuboring!`
export const botBlockedWarn = `
⚠ Foydalanuvchi botni o'chirgan!
ℹ Iltimos keyinroq urinib ko'ring.
`

export const infoText = `Ma'lumotlar:`
export const commentText = `Izoh:`
export const regionText = `Viloyat:`
export const districtText = `Tuman:`
export const createdDataText = `Yuborilgan sana:`
export const taskStatusText = `Holati:`
export const allText = `Jami:`

export const captionIconComment = `💬 ${commentText}`
export const captionIconRegion = `🛣 ${regionText}`
export const captionIconDistrict = `🏢 ${districtText}`
export const captionIconCreatedDate = `🕛 ${createdDataText}`
export const yourSendInfoText = `Siz yuborgan ma'lumotlar:`
export const taskStatusIconText = `ℹ Holati:`
export const taskFinishedText = `bajarilgan.`
export const taskInProcessText = `jarayonda.`

export const reportsSituationText = `🤝 Xabar qilingan holatlar:`
export const allIconReportsCountText = `🧮 ${allText}`
export const finishedCountText = `✅ Bartaraf etilgan:`
export const inProcessCountText = `⌛ Vazifalar ro'yhatida:`
export const yourFinishedCountText = `😎 Siz tomoningizdan bartaraf etilgan holatlar:`
export const byRegionText = `Viloyat bo'yicha:`
export const byRegionStatisticsText = `📊 ${rgNamePlaceHolder} uchun hududiy statistika:`
export const countFromText = `${allIconReportsCountText} ${countFromPlaceHolder} ta holatdan`
export const countFinishedText = `✅ ${countFinishedPlaceHolder} tasi bartaraf etilgan.`
export const notFinishedText = `❌ ${notFinishedPlaceHolder} tasi hali bartaraf etilmagan.`
