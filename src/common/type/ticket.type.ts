import { Company } from './company.type';
import { Customer } from './customer.type';
import { User } from './user.type';

export type TicketAttachedFile = {
  name: string;
  type: string;
  url: string;
  size: string;
};

export type TicketDetail = {
  _id: number;
  title: string;
  description: string;
  assignee: Pick<User, '_id' | 'name' | 'avatarUrl' | 'email'>;
  reporter: Pick<User, '_id' | 'name' | 'avatarUrl' | 'email'>;
  customer: Pick<Customer, '_id' | 'name' | 'phoneNumber'>;
  company: Pick<Company, '_id' | 'name' | 'address'>;
  stageId: number;
  requestTypeId: number;
  priority: number;
  timeTracking: number;
  dueDate: number;
  attachedFiles: TicketAttachedFile[];
  createdUser: Pick<User, '_id' | 'name' | 'avatarUrl' | 'email'>;
  createdAt: string;
  updatedAt: string;
};

export type TicketByBoard = {
  _id: number;
  title: string;
  assignee: Pick<User, '_id' | 'name' | 'avatarUrl' | 'email'>;
  reporter: Pick<User, '_id' | 'name' | 'avatarUrl' | 'email'>;
  stageId: number;
  requestTypeId: number;
  priority: number;
  timeTracking: number;
  dueDate: number;
};

export type TicketByList = {
  _id: number;
  title: string;
  assignee: Pick<User, '_id' | 'name' | 'avatarUrl' | 'email'>;
  stageId: number;
  priority: number;
  dueDate: number;
};

export type GroupTicketsByUser = {
  tickets: TicketByBoard[];
  user: User;
};

export type GroupTicketsByUserAndStage = {
  ticketsGroupByStage: Record<string, TicketByBoard[]>;
  user: User;
};

export type BoardTicketProps = TicketByBoard & { requestTypeName: string };
