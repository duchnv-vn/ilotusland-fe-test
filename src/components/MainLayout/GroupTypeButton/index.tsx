import { observer } from 'mobx-react-lite';
import { BoardGroupBy } from '@/common/enum/board';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStores } from '@/store/storeProvider';

const labelFormat = 'Group By: {value}';

const SelectOptions = () => {
  return Object.values(BoardGroupBy).map((option, index) => {
    return (
      <SelectItem value={option} key={index}>
        {labelFormat.replace('{value}', BoardGroupBy[option])}
      </SelectItem>
    );
  });
};

const GroupByButton = () => {
  const {
    CommonStore: { groupBy },
  } = useStores();

  const label = labelFormat.replace(
    '{value}',
    BoardGroupBy[groupBy as BoardGroupBy],
  );

  return (
    <div className="group-by-button button-1">
      <Select>
        <SelectTrigger className="label">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent className="ml-0">
          <SelectOptions />
        </SelectContent>
      </Select>
    </div>
  );
};

export default observer(GroupByButton);
