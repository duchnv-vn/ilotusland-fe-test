'use client';
import { useStores } from '@/store/storeProvider';
import StageHeaders from './StageHeaders';
import { BoardGroupBy } from '@/common/enum/board';
import GroupByUser from './GroupByTicketBoard/GroupByUser';

const TicketBoards = {
  [BoardGroupBy.User]: GroupByUser,
} as Record<string, () => JSX.Element>;

const KanbanBoard = () => {
  const { CommonStore } = useStores();
  const BoardComponent = TicketBoards[CommonStore.groupBy];

  return (
    <div className="kanban-board">
      <StageHeaders />
      <BoardComponent />
    </div>
  );
};

export default KanbanBoard;
