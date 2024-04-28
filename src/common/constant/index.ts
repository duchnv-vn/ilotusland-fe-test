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
