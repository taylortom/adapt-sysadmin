// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require) {
  var Origin = require('core/origin');
  var SysadminView = require('./views/sysadminView');
  var SysadminSidebarView = require('./views/sysadminSidebarView');

  var FEATURE_NAME = 'sysadmin';
  var FEATURE_PERMISSIONS = ["*/*:create","*/*:read","*/*:update","*/*:delete"];
  var plugins = [];

  Origin.on('globalMenu:' + FEATURE_NAME + ':open', function() {
    Origin.router.navigateTo(FEATURE_NAME);
  });

  Origin.on('router:' + FEATURE_NAME, function(location, subLocation, action) {
    Origin.trigger('location:title:update', {
      title: Origin.l10n.t('app.' + FEATURE_NAME)
    });
    Origin.sidebar.addView(new SysadminSidebarView().$el);
    Origin.contentPane.setView(SysadminView, { plugins: plugins });
  });

  Origin.on(FEATURE_NAME + ':addView', function(pluginData) {
    plugins.push(pluginData);
  });

  Origin.on('origin:dataReady login:changed', function() {
    Origin.permissions.addRoute(FEATURE_NAME, FEATURE_PERMISSIONS);
    if (Origin.permissions.hasPermissions(FEATURE_PERMISSIONS)) {
      Origin.globalMenu.addItem({
        "location": "global",
        "text": Origin.l10n.t('app.' + FEATURE_NAME),
        "icon": "fa-tachometer",
        "callbackEvent": FEATURE_NAME + ":open"
      });
      Origin.trigger(FEATURE_NAME + ':ready');
    }
  });
});
