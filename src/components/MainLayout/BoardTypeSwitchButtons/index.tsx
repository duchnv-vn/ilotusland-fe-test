'use client';
import { observer } from 'mobx-react-lite';
import {
  IconDefinition,
  faBorderAll,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { BoardTypes } from '@/common/enum/board';
import { useStores } from '@/store/storeProvider';
import Button from '@/components/ui/button';

type SwitchButtonProps = {
  icon: IconDefinition;
  boardType: number;
  isActive: boolean;
  setBoardType: (boardType: number) => void;
};

const SwitchButton = ({
  boardType,
  icon,
  isActive,
  setBoardType,
}: SwitchButtonProps) => {
  return (
    <Button
      {...{
        className: `switch-button button-1 ${isActive && 'active'}`,
        onClick: () => setBoardType(boardType),
        icon,
      }}
    />
  );
};

const BoardTypeSwitchButtons = () => {
  const {
    CommonStore: { setBoardType, boardType },
  } = useStores();

  return (
    <div className="board-type-switch-buttons">
      <SwitchButton
        {...{
          icon: faBorderAll,
          boardType: BoardTypes.board,
          isActive: boardType === BoardTypes.board,
          setBoardType,
        }}
      />
      <SwitchButton
        {...{
          icon: faBars,
          boardType: BoardTypes.list,
          isActive: boardType === BoardTypes.list,
          setBoardType,
        }}
      />
    </div>
  );
};

export default observer(BoardTypeSwitchButtons);
