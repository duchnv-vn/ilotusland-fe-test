import MenuButton from '../MenuButton';
import ProjectName from '../ProjectName';
import BoardTypeSwitchButtons from '../BoardTypeSwitchButtons';
import SearchBar from '../SearchBar';
import ProjectMembersList from '../ProjectMemerList';
import ListAllTeamButton from '../ListAllTeamButton';
import GroupByButton from '../GroupTypeButton';
import CreateTaskButton from '../CreateTaskButton';
import NotificationButton from '../NotificationButton';
import ProjectLogo from '../ProjectLogo';
import UserAvatarButton from '../UserAvatarButton';

const Header = () => {
  return (
    <div className="header">
      <div className="left-bar">
        <MenuButton />
        <ProjectLogo />
        <ProjectName />
        <BoardTypeSwitchButtons />
        <SearchBar />
        <ProjectMembersList />
      </div>
      <div className="right-bar">
        <ListAllTeamButton />
        <GroupByButton />
        <CreateTaskButton />
        <NotificationButton />
        <UserAvatarButton />
      </div>
    </div>
  );
};

export default Header;
