import { makeAutoObservable } from 'mobx';
import { User } from '@/common/type/user.type';
import { UserStoreData } from '../type';

class UserStore {
  user: User = {} as User;
  notificationNumber: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user: User) => {
    this.user = user;
  };

  setNotiNumber = (num: number) => {
    this.notificationNumber = num;
  };

  hydrate = ({ notificationNumber, user }: UserStoreData) => {
    user && this.setUser(user);
    notificationNumber && this.setNotiNumber(notificationNumber);
  };
}

export default UserStore;
