export default [
    // {
    //   context: [
    //     '/keycloak',
    //   ],
    //   target: 'http://localhost:9081',
    //   secure: false,
    //   logLevel: 'debug',
    //   changeOrigin: true
    // },
    {
      context: [
        '/auth',
      ],
      target: 'https://localhost:2023',
      secure: false,
      logLevel: 'debug',
      changeOrigin: true
    }
  ];
  