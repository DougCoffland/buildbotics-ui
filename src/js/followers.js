'use strict'


var $bb = require('./buildbotics');


module.exports = {
  replace: true,
  template: '#followers-template',
  paramAttributes: ['profile'],


  methods: {
    isActive: function () {
      return require('./app').isFollowing(this.profile.name);
    },


    setActive: function (active) {
      var app = require('./app');
      var profile = this.profile;
      var name = profile.name;
      var url = 'profiles/' + name + '/follow';

      if (app.getUser().name == name) {
        app.error('You cannot follow yourself.');
        var defer = $.Deferred();
        defer.reject();
        return defer.promise();
      }

      if (active) return $bb.put(url)
        .success(function () {
          profile.followers += 1;
          app.setFollowing(name, true);
        })

      else return $bb.delete(url)
        .success(function () {
          profile.followers -= 1;
          app.setFollowing(name, false);
        })
    }
  },


  mixins: [require('./widget')]
}