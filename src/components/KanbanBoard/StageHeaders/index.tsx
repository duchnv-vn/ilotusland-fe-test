import { ProjectStage } from '@/common/type/project.type';
import { useStores } from '@/store/storeProvider';

import './index.scss';

const Header = ({
  stage: { name, ticketQuantity },
  className,
}: {
  stage: ProjectStage;
  className: string;
}) => {
  const label = `${name} ${ticketQuantity && `(${ticketQuantity})`}`;
  return (
    <div className={`item ${className}`}>
      <p className="title">{label.trim()}</p>
    </div>
  );
};

const StageHeaders = () => {
  const { ProjectStore } = useStores();

  return (
    <div className="stage-headers">
      {ProjectStore.stages.map((stage, index) => (
        <Header
          {...{
            stage,
            className: `w-[${Math.round(100 / ProjectStore.stages.length)}]`,
          }}
          key={index}
        />
      ))}
    </div>
  );
};

export default StageHeaders;
