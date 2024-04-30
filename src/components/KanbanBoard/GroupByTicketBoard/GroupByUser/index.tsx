'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import {
  Active,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  Over,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStores } from '@/store/storeProvider';
import {
  BoardTicketProps,
  GroupTicketsByUserAndStage,
  TicketByBoard,
} from '@/common/type/ticket.type';
import { User } from '@/common/type/user.type';
import UserAvatar from '@/components/UserAvatar';
import Button from '@/components/ui/button';
import TicketCardByBoard from '@/components/Ticket/TicketCardByBoard';
import { ProjectStage } from '@/common/type/project.type';

import './index.scss';

const parseId = (idStr: UniqueIdentifier | null | undefined) => {
  const parsedId = `${idStr}`.split('-');
  return Number(parsedId[1]);
};

const checkisSortTicketOrder = (active: Active, over: Over | null) => {
  return (
    active.id.toString().includes('ticket') &&
    over?.id.toString().includes('ticket') &&
    active &&
    over &&
    active.id !== over.id
  );
};

const checkISMoveTicketAcrossStages = (active: Active, over: Over | null) => {
  return (
    active.id.toString().includes('ticket') &&
    over?.id.toString().includes('stage') &&
    active &&
    over &&
    active.id !== over.id
  );
};

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
  tickets = [],
  className,
  stage,
}: {
  tickets: TicketByBoard[];
  className: string;
  stage: ProjectStage;
}) => {
  const {
    ProjectStore: { findRequestType },
  } = useStores();

  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `stage-${stage.id}`,
    data: {
      type: 'stage',
    },
  });
  const filteredTickets = tickets.filter((t) => t);

  return (
    <div
      className={`stage-item ${className}`}
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <SortableContext items={filteredTickets.map((i) => i._id)}>
        <div className="stage-inner">
          {filteredTickets.map((ticket, index) => {
            return (
              <TicketCardByBoard
                {...{
                  ticket: {
                    ...ticket,
                    requestTypeName: findRequestType(ticket.requestTypeId).name,
                  },
                }}
                key={index}
              />
            );
          })}
        </div>
      </SortableContext>
    </div>
  );
};

const TicketBoards = ({
  group: { user, ticketsGroupByStage },
}: {
  group: GroupTicketsByUserAndStage;
}) => {
  const {
    ProjectStore: { findRequestType, stages },
    TicketsStore: { findBoardTicketById, setTicketGroupsByUserAndStage },
  } = useStores();
  const [stageColumns, setStageColumns] = useState(ticketsGroupByStage);
  const [activeTicketId, setActiveTicketId] = useState<UniqueIdentifier | null>(
    null,
  );

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;
    setActiveTicketId(parseId(id));
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    if (checkisSortTicketOrder(active, over)) {
      const activeId = parseId(active.id);
      const overId = parseId(over?.id);
      const activeStage = findValueOfItems(active.id, 'ticket');
      const overStage = findValueOfItems(over?.id, 'ticket');

      if (!activeStage || !overStage) return;

      const activeTicketIndex = findIndexOfTicket(activeId, activeStage.id);
      const overTicketIndex = findIndexOfTicket(overId, overStage.id);

      if (activeStage.id === overStage.id) {
        let newGroups = { ...stageColumns };
        newGroups[activeStage.id] = arrayMove(
          newGroups[activeStage.id],
          activeTicketIndex,
          overTicketIndex,
        );
        setNewTicketGroups(newGroups);
      } else {
        let newGroups = { ...stageColumns };
        const [removeditem] = newGroups[activeStage.id].splice(
          activeTicketIndex,
          1,
        );
        newGroups[overStage.id].splice(overTicketIndex, 0, removeditem);
      }
    }

    if (checkISMoveTicketAcrossStages(active, over)) {
      const activeId = parseId(active.id);
      const overId = parseId(over?.id);

      const activeStage = findValueOfItems(activeId, 'ticket');
      const overStage = findValueOfItems(overId, 'stage');
      if (!activeStage || !overStage) return;

      const activeTicketIndex = findIndexOfTicket(activeId, activeStage.id);
      let newGroups = { ...stageColumns };
      const [removeditem] = newGroups[activeStage.id].splice(
        activeTicketIndex,
        1,
      );
      if (!newGroups[overStage.id]) newGroups[overStage.id] = [];
      newGroups[overStage.id].push(removeditem);
      setNewTicketGroups(newGroups);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (checkisSortTicketOrder(active, over)) {
      const activeId = parseId(active.id);
      const overId = parseId(over?.id);
      const activeStage = findValueOfItems(activeId, 'ticket');
      const overStage = findValueOfItems(overId, 'ticket');

      if (!activeStage || !overStage) return;

      const activeTicketIndex = findIndexOfTicket(activeId, activeStage.id);
      const overTicketIndex = findIndexOfTicket(overId, overStage.id);

      if (activeStage.id === overStage.id) {
        let newGroups = { ...stageColumns };
        newGroups[activeStage.id] = arrayMove(
          newGroups[activeStage.id],
          activeTicketIndex,
          overTicketIndex,
        );
        setNewTicketGroups(newGroups);
      } else {
        let newGroups = { ...stageColumns };

        const [removedTicket] = newGroups[activeStage.id].splice(
          activeTicketIndex,
          1,
        );
        newGroups[overStage.id].splice(overTicketIndex, 0, removedTicket);
        setNewTicketGroups(newGroups);
      }
    }

    if (checkISMoveTicketAcrossStages(active, over)) {
      const activeId = parseId(active.id);
      const overId = parseId(over?.id);
      const activeStage = findValueOfItems(activeId, 'ticket');
      const overStage = findValueOfItems(overId, 'stage');

      if (!activeStage || !overStage) return;

      const activeTicketIndex = findIndexOfTicket(activeId, activeStage.id);
      let newGroups = { ...stageColumns };
      const [removeditem] = newGroups[activeStage.id].splice(
        activeTicketIndex,
        1,
      );
      if (!newGroups[overStage.id]) newGroups[overStage.id] = [];
      newGroups[overStage.id].push({ ...removeditem, stageId: overStage.id });
      setNewTicketGroups(newGroups);
    }

    setActiveTicketId(null);
  };

  const setNewTicketGroups = (newGroups: Record<string, TicketByBoard[]>) => {
    setTicketGroupsByUserAndStage(newGroups, user._id);
    setStageColumns(newGroups);
  };

  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === 'stage') {
      return stages.find((s) => s.id == id);
    }
    if (type === 'ticket') {
      return findStageByTicketId(id);
    }
  }

  const findStageByTicketId = (ticketId: UniqueIdentifier | undefined) => {
    const stage = stages.find(({ id }) => {
      const targetStage = stageColumns[id];
      return targetStage && targetStage.find((t) => t._id == ticketId);
    });
    return stage;
  };

  const findIndexOfTicket = (
    id: UniqueIdentifier | undefined,
    stageId: number,
  ) => {
    return stageColumns[stageId].findIndex(({ _id }) => _id == id);
  };

  const findActiveTicketData = () => {
    const ticket = findBoardTicketById(Number(activeTicketId));
    const requestTypeName = findRequestType(ticket.requestTypeId).name;
    return {
      ...ticket,
      requestTypeName,
    } as BoardTicketProps;
  };

  return (
    <div className="stages-container">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={stages.map((i) => i.id)}>
          {stages.map((stage, index) => (
            <StageBoard
              tickets={stageColumns[stage.id]}
              stage={stage}
              className={`w-[${Math.round(100 / stages.length)}]`}
              key={index}
            />
          ))}
        </SortableContext>
        <DragOverlay adjustScale={false}>
          {`${activeTicketId}` && activeTicketId !== null && (
            <TicketCardByBoard {...{ ticket: findActiveTicketData() }} />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

const UserBoard = ({ group }: { group: GroupTicketsByUserAndStage }) => {
  const [isExpand, setIsExpand] = useState(true);
  const {
    TicketsStore: { getTotalTicketsByUser },
  } = useStores();

  const ticketNumber = getTotalTicketsByUser(group.user._id);

  return (
    <div className="user-board">
      <UserBoardHeader
        {...{
          user: group.user,
          ticketNumber,
          isExpand,
          setIsExpand,
        }}
      />
      {isExpand && <TicketBoards {...{ group }} />}
    </div>
  );
};

const GroupByUser = () => {
  const {
    TicketsStore: { groupTicketsByUserAndStage },
  } = useStores();
  const ticketGroups = groupTicketsByUserAndStage();

  return (
    <div className="group-by-user-boards">
      {Object.values(ticketGroups).map((group, index) => (
        <UserBoard group={group} key={index} />
      ))}
    </div>
  );
};

export default observer(GroupByUser);
