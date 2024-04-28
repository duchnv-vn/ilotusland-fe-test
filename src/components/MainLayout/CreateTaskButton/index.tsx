import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/ui/button';

const CreateTaskButton = () => {
  return (
    <Button
      {...{
        label: 'Create',
        className: 'create-task-button button-1',
        icon: faPlus,
        iconPosition: 'left',
      }}
    />
  );
};

export default CreateTaskButton;
