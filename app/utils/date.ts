export function toIsoDateTime(dateString?: string | null): string | undefined {
  if (!dateString) return undefined
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString) ? `${dateString}T00:00:00Z` : dateString
}
