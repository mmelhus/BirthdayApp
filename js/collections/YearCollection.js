  var Year = Backbone.Collection.extend({
    model: Month,
    sortKey: "number", // default sort order
    comparator: function ( model ) {
      // returns sortKey, which could be changed by the sort buttons to provide a different sort criteria
      return model.get(this.sortKey);
    }
  });