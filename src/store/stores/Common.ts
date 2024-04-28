import { makeAutoObservable } from 'mobx';
import { BoardGroupBy, BoardTypes } from '@/common/enum/board';
import { ThemeModes } from '@/common/enum/theme';
import { CommonStoreData } from '../type';

class CommonStore {
  themeMode: ThemeModes | string = '';
  boardType: BoardTypes = 0;
  groupBy: BoardGroupBy | string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setThemeMode = (mode: ThemeModes) => {
    this.themeMode = mode;
  };

  setBoardType = (type: BoardTypes) => {
    this.boardType = type;
  };

  setGroupBy = (type: BoardGroupBy) => {
    this.groupBy = type;
  };

  hydrate = ({ boardType, mode, groupBy }: CommonStoreData) => {
    mode && this.setThemeMode(mode);
    typeof boardType === 'number' &&
      !isNaN(boardType) &&
      this.setBoardType(boardType);
    groupBy && this.setGroupBy(groupBy);
  };
}

export default CommonStore;
