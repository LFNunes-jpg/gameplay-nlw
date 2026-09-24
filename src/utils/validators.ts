const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const normalizeEmail = (email: string) => email.trim().toLowerCase();
export const isValidEmail = (email: string) => EMAIL_REGEX.test(normalizeEmail(email));

// Confere se dia/mês formam uma data real (ex.: 31/02 é inválido). Usa ano bissexto para aceitar 29/02.
export function isValidDayMonth(day: number, month: number) {
  if (!Number.isInteger(day) || !Number.isInteger(month)) return false;
  const date = new Date(2024, month - 1, day);
  return date.getMonth() === month - 1 && date.getDate() === day;
}

export function isValidTime(hour: number, minute: number) {
  return Number.isInteger(hour) && Number.isInteger(minute) && hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
}

export const pad = (value: string | number) => String(value).padStart(2, '0');

export const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
