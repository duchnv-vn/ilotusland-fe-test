import moment, { tz } from 'moment-timezone';
import { DATETIME_FORMAT, HCM_TIMEZONE } from '@/common/constant';

moment.suppressDeprecationWarnings = false;

export const getDateStringByFormat = (
  time: number = Date.now(),
  format: string = DATETIME_FORMAT.ddmmyyyy,
) => {
  const dateString = tz(time, HCM_TIMEZONE).format(format);
  return dateString;
};
