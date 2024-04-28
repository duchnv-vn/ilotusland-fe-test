import CommonStore from './stores/Common';
import ProjectStore from './stores/Project';
import TicketsStore from './stores/Tickets';
import UserStore from './stores/User';

export const RootStore = {
  TicketsStore: new TicketsStore(),
  CommonStore: new CommonStore(),
  ProjectStore: new ProjectStore(),
  UserStore: new UserStore(),
};
