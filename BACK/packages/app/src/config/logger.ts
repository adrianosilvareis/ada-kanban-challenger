export const logger = (message: string) => {
  // eslint-disable-next-line no-console
  console.log(`${new Date()} - ${message}`);
};
