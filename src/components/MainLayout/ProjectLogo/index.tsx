'use client';
import { observer } from 'mobx-react-lite';
import Image from '@/components/Image';
import { useStores } from '@/store/storeProvider';

const ProjectLogo = () => {
  const { ProjectStore } = useStores();

  const {
    project: { name, logoUrl },
  } = ProjectStore;

  return (
    <Image
      {...{
        src: logoUrl,
        alt: name,
        width: 80,
        height: 40,
      }}
    />
  );
};

export default observer(ProjectLogo);
