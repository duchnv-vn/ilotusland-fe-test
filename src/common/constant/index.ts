import {
  faArrowUpLong,
  faGripLines,
  faArrowDownLong,
  IconDefinition,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFileText,
  faFileCsv,
  faFile,
} from '@fortawesome/free-solid-svg-icons';

export const TicketPriorityIcon = {
  High: faArrowUpLong,
  Medium: faGripLines,
  Low: faArrowDownLong,
} as Record<string, IconDefinition>;

export const DATETIME_FORMAT = {
  ddmmyyyy: 'DD/MM/YYYY',
  yyyymmdd: 'YYYY/MM/DD',
  hhMMA: 'hh:MM A',
};

export const HCM_TIMEZONE = 'Asia/Ho_Chi_Minh';

export const FileTypeIcons = {
  pdf: faFilePdf,
  doc: faFileWord,
  excel: faFileExcel,
  txt: faFileText,
  csv: faFileCsv,
  unknown: faFile,
} as Record<string, IconDefinition>;
