/* eslint-disable @typescript-eslint/no-explicit-any */
export const isDate = (date: string): boolean => {
  const regExp = /^\d{4}-\d{2}-\d{2}$/;
  if(!(regExp.exec(date))) return false;
  if(!(Date.parse(date))) return false;
  return true;
};

export const isEntryType = (text: string): boolean => {
  const types = ['Hospital', 'OccupationalHealthcare', 'HealthCheck'];
  return types.includes(text);
};



