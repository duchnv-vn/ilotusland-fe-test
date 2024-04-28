import Image from '../../Image';
import MenuButton from '../MenuButton';
import ProjectName from '../ProjectName';
import BoardTypeSwitchButtons from '../BoardTypeSwitchButtons';
import SearchBar from '../SearchBar';
import ProjectMembersList from '../ProjectMemerList';
import ListAllTeamButton from '../ListAllTeamButton';
import { useStores } from '@/store/storeProvider';
import GroupByButton from '../GroupTypeButton';
import CreateTaskButton from '../CreateTaskButton';
import NotificationButton from '../NotificationButton';
import UserAvatar from '../../UserAvatar';

const Header = () => {
  const { ProjectStore, CommonStore, UserStore } = useStores();

  return (
    <div className="header">
      <div className="left-bar">
        <MenuButton />
        <Image
          {...{
            src: ProjectStore.project.logoUrl,
            alt: ProjectStore.project.name,
            width: 80,
            height: 40,
          }}
        />
        <ProjectName name={ProjectStore.project.name} />
        <BoardTypeSwitchButtons currentType={CommonStore.boardType} />
        <SearchBar />
        <ProjectMembersList members={ProjectStore.members} />
      </div>
      <div className="right-bar">
        <ListAllTeamButton />
        <GroupByButton currentGroupBy={CommonStore.groupBy} />
        <CreateTaskButton />
        <NotificationButton notificationNumber={UserStore.notificationNumber} />
        <UserAvatar
          {...{ src: UserStore.user.avatarUrl, alt: UserStore.user.name }}
        />
      </div>
    </div>
  );
};

export default Header;
