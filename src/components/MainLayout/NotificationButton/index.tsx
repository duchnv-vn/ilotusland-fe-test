import { faBell } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/ui/button';

type Props = {
  notificationNumber: number;
};

const NotificationButton = ({ notificationNumber }: Props) => {
  return (
    <div className="notification-button">
      <Button {...{ icon: faBell, className: 'button-1' }} />
      <Button
        {...{ label: `${notificationNumber}`, className: 'quantity-number' }}
      />
    </div>
  );
};

export default NotificationButton;
