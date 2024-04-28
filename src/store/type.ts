import { BoardGroupBy, BoardTypes } from '@/common/enum/board';
import { ThemeModes } from '@/common/enum/theme';
import { Project } from '@/common/type/project.type';
import { TicketByBoard, TicketByList } from '@/common/type/ticket.type';
import { User } from '@/common/type/user.type';

export type CommonStoreData = {
  mode?: ThemeModes;
  boardType?: BoardTypes;
  groupBy?: BoardGroupBy;
};

export type UserStoreData = {
  user?: User;
  notificationNumber?: number;
};

export type ProjectStoreData = {
  project?: Project;
  members?: User[];
};

export type TicketStoreData = {
  ticketsByBoard?: TicketByBoard[];
  ticketsByList?: TicketByList[];
};
