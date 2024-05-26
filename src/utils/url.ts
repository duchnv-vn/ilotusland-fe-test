export const getUrl = (host: string, pathname: string) => {
  const url =
    host.at(-1) === '/' ? `${host}${pathname}` : `${host}/${pathname}`;
  return url;
};
