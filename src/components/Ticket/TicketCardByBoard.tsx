'use client';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BoardTicketProps } from '@/common/type/ticket.type';
import { TicketPriorityIcon } from '@/common/constant';
import { TicketPriority } from '@/common/enum/ticket';
import UserAvatar from '../UserAvatar';
import { useStores } from '@/store/storeProvider';
import { getNowTmp } from '@/utils/date';

import './TicketCardByBoard.scss';

type Props = {
  ticket: BoardTicketProps;
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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `ticket-${_id}`,
    data: {
      type: 'ticket',
    },
  });

  const {
    CommonStore: { setIsOpenTicketModal },
    TicketsStore: { fetchTicketDetail },
  } = useStores();

  const isOverDueDate = getNowTmp() > dueDate;

  const handleClick = async () => {
    await fetchTicketDetail(_id);
    setIsOpenTicketModal(true);
  };

  return (
    <div
      onClick={handleClick}
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`ticket-card ${isOverDueDate && 'overDueDate'} ${isDragging && 'opacity-50'}`}
      {...listeners}
    >
      <div className="card-inner">
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
            <div
              className={`request-type project-request-type-${requestTypeId}`}
            >
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
    </div>
  );
};

export default observer(TicketCardByBoard);
