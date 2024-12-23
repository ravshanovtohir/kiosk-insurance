import moment from 'moment'
export function formatDate() {
  const date = moment()
  const formattedDate = date.format('YYYY-MM-DD')
  return formattedDate.toString()
}
