import { Spinner } from '@radix-ui/themes';

import './index.scss';

const Loading = () => {
  return (
    <div className="loading-contaier">
      <Spinner size="3" className="icon" />
    </div>
  );
};

export default Loading;
