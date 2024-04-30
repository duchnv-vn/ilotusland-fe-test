import { makeAutoObservable } from 'mobx';
import {
  GroupTicketsByUser,
  GroupTicketsByUserAndStage,
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
  ticketGroupsByUserAndStage: Record<number, GroupTicketsByUserAndStage> = {};

  constructor() {
    makeAutoObservable(this);
  }

  get totalTickets() {
    return this.ticketsByBoard.length;
  }

  setTicketGroupsByUserAndStage = (
    groups: Record<string, TicketByBoard[]>,
    userId: number,
  ) => {
    this.ticketGroupsByUserAndStage[userId].ticketsGroupByStage = groups;
  };

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

  groupTicketsByUserAndStage = () => {
    const ticketGroups = this.ticketsByBoard.reduce(
      (groups, ticket) => {
        const groupyUser = groups[ticket.assignee._id];

        if (!groupyUser) {
          groups[ticket.assignee._id] = {
            user: ticket.assignee,
            ticketsGroupByStage: { [ticket.stageId]: [ticket] },
          };
        } else {
          let ticketsGroupByStage =
            groups[ticket.assignee._id].ticketsGroupByStage[ticket.stageId];

          !ticketsGroupByStage
            ? (ticketsGroupByStage = [ticket])
            : ticketsGroupByStage.push(ticket);

          groups[ticket.assignee._id].ticketsGroupByStage[ticket.stageId] =
            ticketsGroupByStage;
        }

        return groups;
      },
      {} as Record<number, GroupTicketsByUserAndStage>,
    );

    this.ticketGroupsByUserAndStage = ticketGroups;
    return ticketGroups;
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

  findBoardTicketById = (id: number) => {
    return this.ticketsByBoard.find(
      (ticket) => ticket._id === id,
    ) as TicketByBoard;
  };

  hydrate = ({ ticketsByBoard, ticketsByList }: TicketStoreData) => {
    ticketsByBoard && this.setTicketsByBoard(ticketsByBoard);
    ticketsByList && this.setTicketsByList(ticketsByList);
  };
}

export default TicketsStore;
