const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "Authorizer": "https://stage-fin-authorizer.valepro.com.co/remoteEntry.js",
    "Missions": "https://stage-fin-missions.valepro.com.co/remoteEntry.js",
    "Account": "https://stage-fin-account.valepro.com.co/remoteEntry.js",
    "Catalog": "https://stage-fin-catalog.valepro.com.co/remoteEntry.js",
    "Redeem": "https://stage-fin-redeem.valepro.com.co/remoteEntry.js",
    "Content": "https://stage-fin-content.valepro.com.co/remoteEntry.js",
    "ValeproDashboards": "https://stage-dashboard.valepro.com.co/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
