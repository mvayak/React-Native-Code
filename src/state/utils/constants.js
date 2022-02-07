const environment = 'production'; // staging || production

// export const getEnvironment = () => environment;

// export const toggleEnvironment = () => {
//   if (environment === 'staging') {
//     environment = 'production';
//     return;
//   }

//   if (environment === 'production') {
//     environment = 'staging';
//     return;
//   }
// };

const _client = {
  staging: {
    id: 4,
    secret: '5CnvgIDAQLPgKOgCFrg47HZQDM9CPJhwMXswIr4R',
  },
  production: {
    id: 2,
    secret: 'muDiLJ28AH3y7cd2KWWn1s7h3C05sKMJzSDlerXY',
  },
};

const _host = {
  staging: 'https://staging.lorylist.com',
  production: 'https://lorylist.com',
};

export const API_CLIENT = {
  id: _client[environment].id,
  secret: _client[environment].secret,
};

export const API_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const API_HOST = _host[environment];
