import { observer } from 'mobx-react-lite';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/ui/button';
import { useStores } from '@/store/storeProvider';

const NotificationButton = () => {
  const {
    UserStore: { notificationNumber },
  } = useStores();

  return (
    <div className="notification-button">
      <Button {...{ icon: faBell, className: 'button-1' }} />
      <Button
        {...{ label: `${notificationNumber}`, className: 'quantity-number' }}
      />
    </div>
  );
};

export default observer(NotificationButton);
