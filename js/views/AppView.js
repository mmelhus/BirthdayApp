var AppView = Backbone.View.extend({
  el: $('#monthList'),

  initialize: function(){
    _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
    this.render(); // self-render
  },

  render: function() {
    this.$el.empty(); // make sure we clear before a redraw
    var monthView,    // holds the new MonthView for each loop
        // this wrapperDomNode will allow us to add each new view DOM element
        // and then append only 1 element to the DOM, preventing multiple redraws
        wrapperDomNode = document.createElement("div");

    // for each model in teh collection, we:
    // - create a view
    // - render the view's element
    // - sock the element in wrapperDomNode
    this.collection.forEach(function(month) {
      monthView = new MonthView({model: month});
      wrapperDomNode.appendChild(monthView.render().el);

    }, this);

    // finally, append wrapperDomNode to the AppView element, $('#monthList')
    $(this.el).append(wrapperDomNode);
  }
});