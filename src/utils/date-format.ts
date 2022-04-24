import moment from "moment";
import 'moment/locale/ru';

const dateFormat = (dateStr: string) => {
    moment.locale('ru')
    const date = moment(dateStr)
    const now = moment()
    const diff = now.diff(date, 'days')
    const timeZone = date.format('ZZ')
    const time = date.format(`HH:mm i-[GMT]${timeZone[0]}${timeZone[2]}`)

    let daysAgo
    switch (diff) {
        case 0:
            daysAgo = 'Сегодня'
            break
        case 1:
            daysAgo = 'Вчера'
            break
        default:
            daysAgo = date.fromNow()
    }

    return (`${daysAgo}, ${time}`)
}

export default dateFormat;