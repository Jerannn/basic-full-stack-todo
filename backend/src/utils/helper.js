export function getWeekDates() {
  let now = new Date();

  now.setHours(0, 0, 0, 0);
  let dayOfWeek = now.getDay();

  let mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  let start = new Date(now);
  start.setDate(now.getDate() - mondayOffset);

  // Calculate the date for Sunday: add 6 days to the Monday date
  let end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return [start, end];
}

export function getTomorrowDate() {
  const today = new Date();

  const start = new Date(today);
  start.setDate(start.getDate() + 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setDate(end.getDate() + 2);
  end.setHours(0, 0, 0, 0);

  return [start, end];
}

export function getTodayDate() {
  const now = new Date();

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  return [start, end];
}
