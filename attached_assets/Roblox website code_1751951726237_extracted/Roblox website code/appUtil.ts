// eslint-disable-next-line import/prefer-default-export
export const getUrlUserId = (): string | null => {
  const reg = /\/users\/(\d+)\//g;
  const match = reg.exec(window.location.pathname);
  return match ? match[1] : null;
};
