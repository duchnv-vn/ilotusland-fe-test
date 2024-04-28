import NextImage from 'next/image';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

const Image: React.FC<Props> = (props) => {
  const { src, alt, width, height } = props;

  return <NextImage {...{ src, alt, width, height }} />;
};

export default Image;
