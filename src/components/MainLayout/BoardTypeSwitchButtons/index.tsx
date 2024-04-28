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
};

type BoardTypeSwitchButtonsProps = {
  currentType: number;
};

const SwitchButton = ({ boardType, icon, isActive }: SwitchButtonProps) => {
  const { CommonStore: commonStore } = useStores();
  const { setBoardType } = commonStore;

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

const BoardTypeSwitchButtons = ({
  currentType,
}: BoardTypeSwitchButtonsProps) => {
  return (
    <div className="board-type-switch-buttons">
      <SwitchButton
        {...{
          icon: faBorderAll,
          boardType: BoardTypes.board,
          isActive: currentType === BoardTypes.board,
        }}
      />
      <SwitchButton
        {...{
          icon: faBars,
          boardType: BoardTypes.list,
          isActive: currentType === BoardTypes.list,
        }}
      />
    </div>
  );
};

export default BoardTypeSwitchButtons;
