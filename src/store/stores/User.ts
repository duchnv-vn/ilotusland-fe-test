import { makeAutoObservable } from 'mobx';
import { dummyAsignee0 } from './dummy-data';
import { User } from '@/common/type/user.type';

class UserStore {
  user: User = dummyAsignee0;
  notificationNumber: number = 10;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user: User) => {
    this.user = user;
  };

  hydrate = (data: { user: User }) => {
    if (!data) return;
    this.setUser(data.user);
  };
}

export default UserStore;
