/**
 * Time formatting utilities
 */

/**
 * Formats a timestamp into a human-readable "time ago" string
 *
 * Examples:
 *   - "just now"
 *   - "5 minutes ago"
 *   - "2 hours ago"
 *   - "3 days ago"
 *   - "1 week ago"
 *
 * @param date - Date object or ISO string
 * @returns Formatted time ago string
 */
export function formatTimeAgo(date: Date | string): string {
  const now = new Date()
  const past = typeof date === 'string' ? new Date(date) : date

  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (seconds < 10) {
    return 'just now'
  }

  if (seconds < 60) {
    return `${seconds} seconds ago`
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`
  }

  const days = Math.floor(hours / 24)
  if (days < 7) {
    return days === 1 ? '1 day ago' : `${days} days ago`
  }

  const weeks = Math.floor(days / 7)
  if (weeks < 4) {
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
  }

  const months = Math.floor(days / 30)
  if (months < 12) {
    return months === 1 ? '1 month ago' : `${months} months ago`
  }

  const years = Math.floor(days / 365)
  return years === 1 ? '1 year ago' : `${years} years ago`
}

/**
 * Formats a date into a readable string with time
 *
 * @param date - Date object or ISO string
 * @returns Formatted date string (e.g., "Nov 16, 2024 at 2:30 PM")
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(d)
}

/**
 * Formats a date into a short readable string
 *
 * @param date - Date object or ISO string
 * @returns Formatted date string (e.g., "Nov 16, 2024")
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d)
}

/**
 * Returns true if the date is today
 */
export function isToday(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  const today = new Date()

  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  )
}

/**
 * Returns true if the date is within the last N days
 */
export function isWithinDays(date: Date | string, days: number): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const daysDiff = diff / (1000 * 60 * 60 * 24)

  return daysDiff <= days
}
