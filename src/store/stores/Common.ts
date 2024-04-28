import { makeAutoObservable } from 'mobx';
import { BoardGroupBy, BoardTypes } from '@/common/enum/board';
import { ThemeModes } from '@/common/enum/theme';

class CommonStore {
  themeMode: ThemeModes = ThemeModes['theme-light'];
  boardType: BoardTypes = BoardTypes['board'];
  groupBy: BoardGroupBy = BoardGroupBy['User'];

  constructor() {
    makeAutoObservable(this);
  }

  setThemeMode = (mode: ThemeModes) => {
    this.themeMode = mode;
  };

  setBoardType = (type: BoardTypes) => {
    this.boardType = type;
  };

  hydrate = (data: { mode: ThemeModes; boardType: BoardTypes }) => {
    if (!data) return;
    this.setThemeMode(data.mode);
    this.setBoardType(data.boardType);
  };
}

export default CommonStore;
