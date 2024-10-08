const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "Authorizer": "https://dev-fin-authorizer.valepro.com.co/remoteEntry.js",
    "Missions": "https://dev-fin-missions.valepro.com.co/remoteEntry.js",
    "Account": "https://dev-fin-account.valepro.com.co/remoteEntry.js",
    "Catalog": "https://dev-fin-catalog.valepro.com.co/remoteEntry.js",
    "Redeem": "https://dev-fin-redeem.valepro.com.co/remoteEntry.js",
    "Content": "https://dev-fin-content.valepro.com.co/remoteEntry.js",
    "ValeproDashboards": "https://dev-dashboard.valepro.com.co/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
