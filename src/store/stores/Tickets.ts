import { makeAutoObservable } from 'mobx';
import {
  GroupTicketsByUser,
  TicketByBoard,
  TicketByList,
} from '@/common/type/ticket.type';
import { TicketStoreData } from '../type';
class TicketsStore {
  ticketsByBoard: TicketByBoard[] = [];
  ticketsByList: TicketByList[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get totalTickets() {
    return this.ticketsByBoard.length;
  }

  setTicketsByBoard = (tickets: TicketByBoard[]) => {
    this.ticketsByBoard = tickets;
  };

  setTicketsByList = (tickets: TicketByList[]) => {
    this.ticketsByList = tickets;
  };

  groupTicketsByUser = (): GroupTicketsByUser[] => {
    const ticketGroups = this.ticketsByBoard.reduce(
      (groups, ticket) => {
        const groupyUser = groups[ticket.asignee._id];

        if (!groupyUser) {
          groups[ticket.asignee._id] = {
            user: ticket.asignee,
            tickets: [ticket],
          };
        } else {
          groups[ticket.asignee._id].tickets.push(ticket);
        }

        return groups;
      },
      {} as Record<number, GroupTicketsByUser>,
    );

    return Object.values(ticketGroups);
  };

  hydrate = ({ ticketsByBoard, ticketsByList }: TicketStoreData) => {
    ticketsByBoard && this.setTicketsByBoard(ticketsByBoard);
    ticketsByList && this.setTicketsByList(ticketsByList);
  };
}

export default TicketsStore;
