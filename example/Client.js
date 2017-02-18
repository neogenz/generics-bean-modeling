var myProjectNamespace = {
  beans: {}
};

(function init(exports, factory) {
  'use strict';

  var Client = neogenz.beans.AbstractBean.extend({
    initialize: function () {
      neogenz.beans.AbstractBean.prototype.initialize.apply(this, arguments);
      this.id = null;
      this.lastName = null;
      this.firstName = null;
      this.birthDate = null;
      this.address = null;
      this.licensingDate = null;
      this.locations = null;
      this.comingLocations = null;
      this.locationsClosed = null;
      this._schema = {
        id: new neogenz.beans.AbstractSchema({
          type: neogenz.beans.type.STRING,
          persistingName: '_id'
        }),
        lastName: new neogenz.beans.AbstractSchema({
          type: neogenz.beans.type.STRING
        }),
        firstName: new neogenz.beans.AbstractSchema({
          type: neogenz.beans.type.STRING
        }),
        birthDate: new neogenz.beans.AbstractSchema({
          type: neogenz.beans.type.DATE
        }),
        address: new neogenz.beans.AbstractSchema({
          type: neogenz.beans.type.STRING
        }),
        licensingDate: new neogenz.beans.AbstractSchema({
          type: neogenz.beans.type.DATE
        }),
        locations: new neogenz.beans.AbstractSchema({
          type: neogenz.beans.type.ARRAY_OBJECT,
          defaultValue: [],
          contentObject: new neogenz.beans.AbstractSchema({
            type: neogenz.beans.type.OBJECT,
            beanName: 'Location',
            constructor: exports.Location
          })
        }),
        comingLocations: new neogenz.beans.AbstractSchema({
          type: neogenz.beans.type.ARRAY_OBJECT,
          defaultValue: [],
          contentObject: new neogenz.beans.AbstractSchema({
            type: neogenz.beans.type.OBJECT,
            beanName: 'Location',
            constructor: exports.Location
          })
        }),
        locationsClosed: new neogenz.beans.AbstractSchema({
          type: neogenz.beans.type.ARRAY_OBJECT,
          defaultValue: [],
          contentObject: new neogenz.beans.AbstractSchema({
            type: neogenz.beans.type.OBJECT,
            beanName: 'Location',
            constructor: exports.Location
          })
        })
      };
    }
  });

  exports.Client = Client;
  factory.registerBean('Client', exports.Client);
})(myProjectNamespace.beans, neogenz.beans.factory);
