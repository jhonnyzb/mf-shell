const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "Authorizer": "https://site-authorizer.valepro.com.co/remoteEntry.js",
    "Missions": "https://site-missions.valepro.com.co/remoteEntry.js",
    "Account": "https://site-account.valepro.com.co/remoteEntry.js",
    "Catalog": "https://site-catalog.valepro.com.co/remoteEntry.js",
    "Redeem": "https://site-redeem.valepro.com.co/remoteEntry.js",
    "Content": "https://site-content.valepro.com.co/remoteEntry.js",
    "ValeproDashboards": "https://prod-dashboard.valepro.com.co/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
