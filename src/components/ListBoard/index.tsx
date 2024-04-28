'use client';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useStores } from '@/store/storeProvider';
import { TicketByList } from '@/common/type/ticket.type';
import { TicketPriority } from '@/common/enum/ticket';
import UserAvatar from '../UserAvatar';
import { getDateStringByFormat } from '@/utils/date';

import './index.scss';
import { TicketPriorityIcon } from '@/common/constant';

const tableColumns = [
  { title: 'Title', width: '50' },
  { title: 'Priority', width: '10' },
  { title: 'Status', width: '15' },
  { title: 'Due date', width: '10' },
  { title: 'Assignee', width: '15' },
];

const TableHeaders = () => {
  return (
    <TableHeader>
      <TableRow>
        {tableColumns.map(({ title, width }, index) => (
          <TableHead
            className="head-name"
            style={{ width: `${width}%` }}
            key={index}
          >
            {title}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

const TicketItem = ({ ticket }: { ticket: TicketByList }) => {
  const { _id, title, stageId, priority, dueDate, asignee } = ticket;

  const {
    ProjectStore: { findStage },
  } = useStores();

  const stage = findStage(stageId);
  return (
    <TableRow className="ticket-row">
      <TableCell className="ticket-name">
        <FontAwesomeIcon icon={faClipboardCheck} className="icon" />
        <span className="name">{title}</span>
      </TableCell>
      <TableCell className="ticket-priority">
        <FontAwesomeIcon
          icon={TicketPriorityIcon[TicketPriority[priority]]}
          className={`icon ticket-priority-${priority}`}
        />
        <span className="label">{TicketPriority[priority]}</span>
      </TableCell>
      {stage && (
        <TableCell>
          <div className={`status project-stage-${stageId}`}>{stage.name}</div>
        </TableCell>
      )}
      <TableCell>{getDateStringByFormat(dueDate)}</TableCell>
      <TableCell className="asignee">
        <UserAvatar {...{ src: asignee.avatarUrl, alt: asignee.name }} />
        <span className="name">{asignee.name}</span>
      </TableCell>
    </TableRow>
  );
};

const TicketsTable = () => {
  const {
    TicketsStore: { ticketsByList },
  } = useStores();

  return (
    <Table>
      <TableHeaders />
      <TableBody>
        {ticketsByList.map((ticket, index) => (
          <TicketItem ticket={ticket} key={index} />
        ))}
      </TableBody>
    </Table>
  );
};

const ListBoard = () => {
  return (
    <div className="list-board">
      <TicketsTable />
    </div>
  );
};

export default observer(ListBoard);
