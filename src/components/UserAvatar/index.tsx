import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import './index.scss';

type Props = { src: string; alt: string };

const UserAvatar = ({ src, alt }: Props) => {
  return (
    <Avatar className="user-avatar">
      <AvatarImage {...{ src, alt }} className="image" />
      <AvatarFallback className="fallback" />
    </Avatar>
  );
};

export default UserAvatar;
