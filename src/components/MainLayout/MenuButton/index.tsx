import { faListUl } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/ui/button';

const MenuButton: React.FC = () => {
  return (
    <Button
      {...{
        icon: faListUl,
        className: 'menu-button button-1',
      }}
    />
  );
};

export default MenuButton;
