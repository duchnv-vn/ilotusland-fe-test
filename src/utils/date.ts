import moment, { tz } from 'moment-timezone';
import { DATETIME_FORMAT, HCM_TIMEZONE } from '@/common/constant';

moment.suppressDeprecationWarnings = false;

export const getNowTmp = () => {
  return moment().unix() * 1000; // milisecond unit
};

export const getDateStringByFormat = (
  time: number = Date.now(),
  format: string = DATETIME_FORMAT.ddmmyyyy,
) => {
  const dateString = tz(time, HCM_TIMEZONE).format(format);
  return dateString;
};

export const checkIsInYesterdayOrToday = (dateString: string) => {
  const dateTime = moment(dateString);

  const yesterday = new Date(
    `${moment().subtract(1, 'day').format(DATETIME_FORMAT.yyyymmdd)} 00:00:00`,
  ).getTime();
  const subtractWithYesterday =
    (new Date(dateString).getTime() - yesterday) / 1000 / 60 / 60;
  const isYesterday = subtractWithYesterday >= 0 && subtractWithYesterday <= 24;

  const today = new Date(
    `${moment().format(DATETIME_FORMAT.yyyymmdd)} 00:00:00`,
  ).getTime();
  const subtractWithToday =
    (new Date(dateString).getTime() - today) / 1000 / 60 / 60;
  const isToday = subtractWithToday >= 0 && subtractWithToday <= 24;

  return {
    isYesterday,
    isToday,
    date: dateTime.format(DATETIME_FORMAT.yyyymmdd),
    time: dateTime.format(DATETIME_FORMAT.hhMMA),
  };
};

export const calculateTimeDistance = (dateString: string) => {
  const dateTime = moment(dateString);
  const today = moment();
  const subtractWithToday = (today.unix() - dateTime.unix()) / 60 / 60; // hour unit

  return {
    unit: subtractWithToday <= 24 ? 'hours' : 'days',
    number:
      subtractWithToday <= 24
        ? Math.floor(subtractWithToday)
        : Math.floor(subtractWithToday / 24),
  };
};
