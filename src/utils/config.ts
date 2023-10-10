const { DataBaseUrl = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { PORT = 3000 } = process.env;

export {
  DataBaseUrl,
  PORT,
};
