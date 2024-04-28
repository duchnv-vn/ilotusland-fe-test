import {
  faArrowUpLong,
  faGripLines,
  faArrowDownLong,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

export const TicketPriorityIcon = {
  High: faArrowUpLong,
  Medium: faGripLines,
  Low: faArrowDownLong,
} as Record<string, IconDefinition>;

export const DATETIME_FORMAT = {
  ddmmyyyy: 'DD/MM/YYYY',
};

export const HCM_TIMEZONE = 'Asia/Ho_Chi_Minh';
