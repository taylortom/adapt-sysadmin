// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require) {
  var _ = require('underscore');
  var Origin = require('core/origin');
  var SidebarItemView = require('modules/sidebar/views/sidebarItemView');
  var SysadminSidebarView = SidebarItemView.extend({

    /*
    addSidebarButton: function(data) {
      _.defaults(data, { icon: 'fa-chevron-right' });
      var template = Handlebars.templates['sysadminSidebarButton'];
      this.$el.append(template(data));
      this.$('.button-' + data.name).click(this.onButtonclick);
    },
    */

    onButtonclick: function(event) {
      event && event.preventDefault();
      var eventName = $(event.currentTarget).attr('data-event');
      if(eventName) Origin.trigger(eventName);
    }
  }, {
    template: 'sysadminSidebar'
  });
  return SysadminSidebarView;
});
