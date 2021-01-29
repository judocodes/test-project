export function getDateOnly(date: Date | string) {
  if (typeof date != 'string' && Boolean(date instanceof Date) == false) {
    throw new Error('Date must be in either String or Date format.');
  }

  if (typeof date == 'string') {
    date = new Date(date);
  } else {
    // needs to be shallow copied
    date = new Date(date.getTime());
  }

  date.setUTCHours(0, 0, 0, 0);

  return date;
}

export function getTimeOnly(date: Date | string): number {
  if (typeof date == 'string') {
    date = new Date(date);
  }

  return date.getTime() - getDateOnly(date).getTime();
}
