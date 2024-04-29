'use client';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/store/storeProvider';

const ProjectName = () => {
  const {
    ProjectStore: {
      project: { name },
    },
  } = useStores();

  return (
    <div className="project-name-container">
      <h1 className="project-name">{name}</h1>
    </div>
  );
};

export default observer(ProjectName);
