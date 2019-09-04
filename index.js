var LaunchDarkly = require('launchdarkly-node-server-sdk');
var ldclient = LaunchDarkly.init('sdk-49a3a501-ab2a-42aa-99cd-3a03b6a6c44d');

var user = {
  firstName: 'Michael',
  lastName: 'Vittiglio',
  key: 'UNIQUE IDENTIFIER',
  custom: {
    groups: 'beta_testers'
  }
};

ldclient.once('ready', function() {
  ldclient.variation('test-feature-flag', user, false, function(err, showFeature) {
    if (showFeature) {
      console.log(`Hey ${user.firstName}, hope you're enjoying this feature!`);
    } else {
      console.log(`We're sorry ${user.firstName}, we aren't ready for you yet...`);
    }

    ldclient.flush(function() {
      ldclient.close();
    });
  });
});

