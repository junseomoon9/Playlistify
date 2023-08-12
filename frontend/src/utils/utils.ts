export const convert_ms_to_minutes_and_seconds = (duration_ms: number) => {
  const minutes = Math.floor((duration_ms / 1000) / 60)
  const seconds = Math.floor((duration_ms / 1000) % 60)

  const secondsFormatted = seconds.toString().padStart(2, '0')

  return `${minutes}:${secondsFormatted}`
}