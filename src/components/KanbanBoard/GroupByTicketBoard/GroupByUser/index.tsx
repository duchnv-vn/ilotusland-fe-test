import { Dispatch, SetStateAction, useState } from 'react';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useStores } from '@/store/storeProvider';
import { GroupTicketsByUser, TicketByBoard } from '@/common/type/ticket.type';
import { User } from '@/common/type/user.type';
import UserAvatar from '@/components/UserAvatar';
import Button from '@/components/ui/button';
import TicketCardByBoard from '@/components/Ticket/TicketCardByBoard';
import { ProjectRequestType } from '@/common/type/project.type';

import './index.scss';

const UserBoardHeader = ({
  user: { avatarUrl, name },
  ticketNumber,
  isExpand,
  setIsExpand,
}: {
  user: User;
  ticketNumber: number;
  isExpand: boolean;
  setIsExpand: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="board-header">
      <Button
        {...{
          icon: faCaretRight,
          className: 'expand-button',
          iconClassName: `expand-icon ${isExpand ? 'rotate-90' : 'rotate-revert-90'}`,
          onClick: () => setIsExpand(!isExpand),
        }}
      />
      <UserAvatar
        {...{
          src: avatarUrl,
          alt: name,
        }}
      />
      <span className="username">{name}</span>
      <span className="ticket-number">{ticketNumber} tickets</span>
    </div>
  );
};

const StageBoard = ({
  tickets,
  className,
}: {
  tickets: TicketByBoard[];
  className: string;
}) => {
  const { ProjectStore } = useStores();

  return (
    <div className={`stage-item ${className}`}>
      {tickets.map((ticket, index) => {
        return (
          <TicketCardByBoard
            {...{
              ticket: {
                ...ticket,
                requestTypeName: (
                  ProjectStore.project.requestTypes.find(
                    (type) => type.id === ticket.requestTypeId,
                  ) as ProjectRequestType
                ).name,
              },
            }}
            key={index}
          />
        );
      })}
    </div>
  );
};

const TicketBoards = ({ tickets }: { tickets: TicketByBoard[] }) => {
  const { ProjectStore } = useStores();

  return (
    <div className="stages-container">
      {ProjectStore.stages.map((stage, index) => {
        const ticketsByStage = tickets.filter(
          (ticket) => ticket.stageId === stage.id,
        );

        return (
          <StageBoard
            tickets={ticketsByStage}
            className={`w-[${Math.round(100 / ProjectStore.stages.length)}]`}
            key={index}
          />
        );
      })}
    </div>
  );
};

const UserBoard = ({ group }: { group: GroupTicketsByUser }) => {
  const [isExpand, setIsExpand] = useState(true);

  return (
    <div className="user-board">
      <UserBoardHeader
        {...{
          user: group.user,
          ticketNumber: group.tickets.length,
          isExpand,
          setIsExpand,
        }}
      />
      {isExpand && <TicketBoards tickets={group.tickets} />}
    </div>
  );
};

const GroupByUser = () => {
  const { TicketsStore } = useStores();
  const ticketGroups = TicketsStore.groupTicketsByUser();

  return (
    <div className="group-by-user-boards">
      {ticketGroups.map((group, index) => (
        <UserBoard group={group} key={index} />
      ))}
    </div>
  );
};

export default GroupByUser;
