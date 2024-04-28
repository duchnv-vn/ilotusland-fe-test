'use client';
import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/store/storeProvider';
import { BoardTypes } from '@/common/enum/board';
import Loading from '../Loading';

const DynamicKanbanBoard = dynamic(() => import('../KanbanBoard'), {
  ssr: false,
  loading: () => <Loading />,
});
const DynamicListBoard = dynamic(() => import('../ListBoard'), {
  ssr: false,
  loading: () => <Loading />,
});

const boardTypeComponent = {
  [BoardTypes.board]: DynamicKanbanBoard,
  [BoardTypes.list]: DynamicListBoard,
};

const ProjectBoard = () => {
  const {
    CommonStore: { boardType },
  } = useStores();

  const Board = boardTypeComponent[boardType];

  return (
    <div className="relative">
      <Board />
    </div>
  );
};

export default observer(ProjectBoard);
