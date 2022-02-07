const config = {
  screens: {
    Search: {
      path: 'search',
    },
    App: {
      screens: {
        Me: {
          path: 'me',
        },
        FavoriteList: {
          path: 'bookmarks',
        },
        Search: {
          screens: {
            LinkedProduct: {
              path: 'products/:product',
              parse: {
                product: product => {
                  return {
                    id: product,
                  };
                },
              },
            },
          },
        },
      },
    },
  },
};

const linking = {
  prefixes: [
    'https://lorylist.com/',
    'https://staging.lorylist.com/',
    'lorylistapp://',
  ],
  config,
};

export default linking;
