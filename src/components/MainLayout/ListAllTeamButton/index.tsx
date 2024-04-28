import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/ui/button';

const ListAllTeamButton = () => {
  return (
    <Button
      {...{
        label: 'All Team',
        className: 'list-all-team button-1',
        icon: faUserGroup,
      }}
    />
  );
};

export default ListAllTeamButton;
