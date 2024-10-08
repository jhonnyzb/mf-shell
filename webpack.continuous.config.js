const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "Authorizer": "https://stage-mc-fin-authorizer.valepro.com.co/remoteEntry.js",
    "Missions": "https://stage-mc-missions.valepro.com.co/remoteEntry.js",
    "Account": "https://stage-mc-fin-account.valepro.com.co/remoteEntry.js",
    "Catalog": "https://stage-mc-fin-catalog.valepro.com.co/remoteEntry.js",
    "Redeem": "https://stage-mc-fin-redeem.valepro.com.co/remoteEntry.js",
    "Content": "https://stage-mc-fin-content.valepro.com.co/remoteEntry.js",
    "ValeproDashboards": "https://stage-mc-dashboard.valepro.com.co/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
