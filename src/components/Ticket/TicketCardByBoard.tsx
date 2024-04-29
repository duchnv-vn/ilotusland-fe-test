'use client';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { TicketByBoard } from '@/common/type/ticket.type';
import { TicketPriorityIcon } from '@/common/constant';
import { TicketPriority } from '@/common/enum/ticket';
import UserAvatar from '../UserAvatar';
import { useStores } from '@/store/storeProvider';
import { getNowTmp } from '@/utils/date';

import './TicketCardByBoard.scss';

type Props = {
  ticket: TicketByBoard & { requestTypeName: string };
};

const TicketCardByBoard: React.FC<Props> = ({ ticket }) => {
  const {
    _id,
    title,
    priority,
    requestTypeId,
    requestTypeName,
    timeTracking,
    dueDate,
    assignee,
  } = ticket;

  const [isTaskOverDueDate, setIsTaskOverDueDate] = useState(false);

  const {
    CommonStore: { setIsOpenTicketModal },
    TicketsStore: { fetchTicketDetail },
  } = useStores();

  const handleClick = async () => {
    await fetchTicketDetail(_id);
    setIsOpenTicketModal(true);
  };

  useEffect(() => {
    const now = getNowTmp();
    setIsTaskOverDueDate(now > dueDate);
  }, []);

  return (
    <div
      className={`ticket-card ${isTaskOverDueDate && 'overDueDate'}`}
      onClick={handleClick}
    >
      <div className="ticket-header">
        <div className="ticket-id">
          <FontAwesomeIcon icon={faClipboardCheck} className="icon" />
          <span className="id">[{_id}]</span>
        </div>
        <div className="time-tracking">
          <span className="preview-button">Preview</span>
          <div className="time">
            <FontAwesomeIcon icon={faClock} className="icon" />
            <span className="text">{timeTracking} hours</span>
          </div>
        </div>
      </div>
      <div className="ticket-title">
        <p className="text">{title}</p>
      </div>
      <div className="ticket-footer">
        <div className="left-section">
          <div className={`request-type project-request-type-${requestTypeId}`}>
            {requestTypeName}
          </div>
          <div className="priority">
            <FontAwesomeIcon
              icon={TicketPriorityIcon[TicketPriority[priority]]}
              className={`icon ticket-priority-${priority}`}
            />
          </div>
        </div>
        <div className="righ-section">
          <UserAvatar {...{ src: assignee.avatarUrl, alt: assignee.name }} />
        </div>
      </div>
    </div>
  );
};

export default observer(TicketCardByBoard);
