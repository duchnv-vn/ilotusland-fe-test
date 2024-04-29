import { makeAutoObservable } from 'mobx';
import {
  GroupTicketsByUser,
  TicketByBoard,
  TicketByList,
  TicketDetail,
} from '@/common/type/ticket.type';
import { TicketStoreData } from '../type';
import { dummyTicketsByBoard } from './dummy-data';
class TicketsStore {
  ticketsByBoard: TicketByBoard[] = [];
  ticketsByList: TicketByList[] = [];
  activeTicketId: number | null = null;
  ticketDetail: TicketDetail = dummyTicketsByBoard[0] as TicketDetail;

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
        const groupyUser = groups[ticket.assignee._id];

        if (!groupyUser) {
          groups[ticket.assignee._id] = {
            user: ticket.assignee,
            tickets: [ticket],
          };
        } else {
          groups[ticket.assignee._id].tickets.push(ticket);
        }

        return groups;
      },
      {} as Record<number, GroupTicketsByUser>,
    );

    return Object.values(ticketGroups);
  };

  setActiveTicketId(id: number) {
    this.activeTicketId = id;
  }

  fetchTicketDetail = async (id: number) => {
    this.setActiveTicketId(id);
    const data: TicketDetail = await new Promise((res) => {
      setTimeout(() => {
        res(
          dummyTicketsByBoard.find(
            (ticket) => ticket._id === id,
          ) as TicketDetail,
        );
      }, 1000);
    });

    this.ticketDetail = data;
    return data;
  };

  hydrate = ({ ticketsByBoard, ticketsByList }: TicketStoreData) => {
    ticketsByBoard && this.setTicketsByBoard(ticketsByBoard);
    ticketsByList && this.setTicketsByList(ticketsByList);
  };
}

export default TicketsStore;
