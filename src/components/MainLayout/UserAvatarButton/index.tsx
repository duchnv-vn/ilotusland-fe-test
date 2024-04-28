import UserAvatar from '@/components/UserAvatar';
import { useStores } from '@/store/storeProvider';
import { observer } from 'mobx-react-lite';

const UserAvatarButton = () => {
  const { UserStore } = useStores();
  return (
    <UserAvatar
      {...{ src: UserStore.user.avatarUrl, alt: UserStore.user.name }}
    />
  );
};

export default observer(UserAvatarButton);
