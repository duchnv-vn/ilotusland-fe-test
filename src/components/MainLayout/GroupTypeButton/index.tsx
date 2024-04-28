import { BoardGroupBy } from '@/common/enum/board';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const labelFormat = 'Group By: {value}';

type GroupByButtonProps = {
  currentGroupBy: BoardGroupBy;
};

const SelectOptions = () => {
  return Object.values(BoardGroupBy).map((option, index) => {
    return (
      <SelectItem value={option} key={index}>
        {labelFormat.replace('{value}', BoardGroupBy[option])}
      </SelectItem>
    );
  });
};

const GroupByButton = ({ currentGroupBy }: GroupByButtonProps) => {
  const label = labelFormat.replace('{value}', BoardGroupBy[currentGroupBy]);

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

export default GroupByButton;
