import { makeAutoObservable } from 'mobx';
import {
  GroupTicketsByUser,
  TicketByBoard,
  TicketByList,
} from '@/common/type/ticket.type';
import { dummyTickets } from './dummy-data';

class TicketsStore {
  ticketsByBoard: TicketByBoard[] = dummyTickets;
  ticketsByList: TicketByList[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get totalTickets() {
    return this.ticketsByBoard.length;
  }

  setTickets = (tickets: TicketByBoard[]) => {
    this.ticketsByBoard = tickets;
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

  hydrate = (data: { tickets: TicketByBoard[] }) => {
    if (!data) return;
    this.setTickets(data.tickets);
  };
}

export default TicketsStore;
