'use client';
import { observer } from 'mobx-react-lite';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TicketPriorityIcon } from '@/common/constant';
import { TicketPriority } from '@/common/enum/ticket';
import { TicketByList } from '@/common/type/ticket.type';
import { useStores } from '@/store/storeProvider';
import { getDateStringByFormat } from '@/utils/date';
import UserAvatar from '../UserAvatar';
import { TableRow, TableCell } from '../ui/table';

import './TicketRowByList.scss';

type Props = { ticket: TicketByList };

const TicketRowByList: React.FC<Props> = ({ ticket }) => {
  const { _id, title, stageId, priority, dueDate, assignee } = ticket;

  const {
    ProjectStore: { findStage },
    CommonStore: { setIsOpenTicketModal },
    TicketsStore: { fetchTicketDetail },
  } = useStores();

  const stage = findStage(stageId);

  const handleClick = async () => {
    await fetchTicketDetail(_id);
    setIsOpenTicketModal(true);
  };

  return (
    <TableRow className="ticket-row" onClick={handleClick}>
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
      <TableCell className="assignee">
        <UserAvatar {...{ src: assignee.avatarUrl, alt: assignee.name }} />
        <span className="name">{assignee.name}</span>
      </TableCell>
    </TableRow>
  );
};

export default observer(TicketRowByList);
