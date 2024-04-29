'use client';
import { observer } from 'mobx-react-lite';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useStores } from '@/store/storeProvider';
import TicketRowByList from '../Ticket/TicketRowByList';

import './index.scss';

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

const TicketsTable = () => {
  const {
    TicketsStore: { ticketsByList },
  } = useStores();

  return (
    <Table>
      <TableHeaders />
      <TableBody>
        {ticketsByList.map((ticket, index) => (
          <TicketRowByList ticket={ticket} key={index} />
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
