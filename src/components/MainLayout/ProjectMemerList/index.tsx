'use client';
import { observer } from 'mobx-react-lite';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useStores } from '@/store/storeProvider';

type MemberAvatarProps = {
  src: string;
  alt: string;
};

const MemberAvatar = ({ src, alt }: MemberAvatarProps) => {
  return (
    <Avatar className="member-avatar">
      <AvatarImage {...{ src, alt }} className="image" />
      <AvatarFallback className="fallback" />
    </Avatar>
  );
};

const ProjectMembersList = () => {
  const {
    ProjectStore: { members },
  } = useStores();

  return (
    <div className="member-list">
      {members.map((member, index) => {
        return (
          <MemberAvatar
            {...{
              src: member.avatarUrl,
              alt: member.name,
            }}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default observer(ProjectMembersList);
