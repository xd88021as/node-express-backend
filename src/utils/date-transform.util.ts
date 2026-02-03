export const parseDateString = (dateString?: string): Date | undefined =>
  dateString ? new Date(dateString) : undefined;
