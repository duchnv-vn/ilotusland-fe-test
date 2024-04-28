import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/common/type/user.type';

type MemberAvatarProps = {
  src: string;
  alt: string;
};

type MemberListProps = {
  members: User[];
};

const MemberAvatar = ({ src, alt }: MemberAvatarProps) => {
  return (
    <Avatar className="member-avatar">
      <AvatarImage {...{ src, alt }} className="image" />
      <AvatarFallback className="fallback" />
    </Avatar>
  );
};

const ProjectMembersList = (props: MemberListProps) => {
  const { members } = props;

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

export default ProjectMembersList;
