export function toISO(date) {
  return date.toISOString().split('T')[0];
}

export function fromToday(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}