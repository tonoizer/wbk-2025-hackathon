export function formatDateEU(dateString: string | null | undefined): string {
  if (!dateString)
    return '-'
  try {
    const date = new Date(dateString)
    // Format to Berlin time
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Europe/Berlin',
    }
    // Format: DD.MM.YYYY, HH:MM:SS
    const parts = new Intl.DateTimeFormat('de-DE', options).formatToParts(date)
    const get = (type: string) => parts.find(p => p.type === type)?.value.padStart(2, '0')
    return `${get('day')}.${get('month')}.${get('year')} ${get('hour')}:${get('minute')}:${get('second')}`
  }
  catch {
    return '-'
  }
}
