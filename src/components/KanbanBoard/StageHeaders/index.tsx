'use client';
import { observer } from 'mobx-react-lite';
import { ProjectStage } from '@/common/type/project.type';
import { useStores } from '@/store/storeProvider';

import './index.scss';

const Header = ({
  stage: { name },
  className,
  ticketQuantity,
}: {
  stage: ProjectStage;
  className: string;
  ticketQuantity: number;
}) => {
  const label = `${name} (${ticketQuantity})`;
  return (
    <div className={`item ${className}`}>
      <p className="title">{label.trim()}</p>
    </div>
  );
};

const StageHeaders = () => {
  const {
    ProjectStore,
    TicketsStore: { getTotalTicketsByStage },
  } = useStores();

  return (
    <div className="stage-headers">
      {ProjectStore.stages.map((stage, index) => {
        return (
          <Header
            {...{
              stage,
              ticketQuantity: getTotalTicketsByStage(stage.id),
              className: `w-[${Math.round(100 / ProjectStore.stages.length)}]`,
            }}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default observer(StageHeaders);
