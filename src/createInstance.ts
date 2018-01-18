import loadConfig from './loadConfig';
import * as db from './db';
import up from './commands/up';

const createInstance = async (env: string = 'development') => {
  const config = await loadConfig();

  if (!config[env]) {
    // tslint:disable-next-line:no-console
    console.log(
      `Could not find a configuration object for the ${env} environment`
    );
    return;
  }

  const dbConnection =
    config[env] instanceof String
      ? {
          connectionString: config[env]
        }
      : config[env];

  db.initPool(dbConnection);
  return {
    config,
    up
  };
};

export default createInstance;
