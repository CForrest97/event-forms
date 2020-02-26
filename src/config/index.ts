const env = process.env.NODE_ENV || 'development';
export default {
  env,
  // eslint-disable-next-line global-require
  ...require(`./${env}`), // eslint-disable-line import/no-dynamic-require
};
