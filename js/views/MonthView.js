var MonthView = Backbone.View.extend({
  tagname: "div",

  initialize: function() {
    // fix loss of correct 'this' context in methods
    _.bindAll(this, 'render', 'buildCssClassString', 'selectMonth'); // fixes loss of context for 'this' within methods
    // this should be listeneing for a change kicked off by a user's click on a month, and calls the render function.
    // We are specifically listening for only changes on the isBirthdayMonth attribute to prevent unnecessary DOM redraws
    this.listenTo(this.model, 'change:isBirthdayMonth',  this.render );
  },

  // this is used to find out if this view's month model is the selected birthday and return the correct CSS classes
  // in a string that can be appended to the element template
  buildCssClassString: function() {
    if (this.model.get("isBirthdayMonth") === true) {
      return "btn btn-danger btn-lg month"; // creates a red month 
    }
    else {
      return "btn btn-primary btn-lg month"; // creates a blue month
    }
  },

  render: function() {
    // creates a div with the month and the correct classes based on whether this view's model
    // is the selected birthday month
    this.$el.html("<div class='" + this.buildCssClassString() + "'>" + this.model.get("name") + "</div>");
    return this; // to allow chaining
  },

  events: {
    // when the user clicks this, we want to set this view's model as teh birthday month
    "click":  "selectMonth"
  },
  
  // called when teh user clicks on this view's element.
  // it checks with the BirthdayMonth API to see what the current birthday month should be 
  // and updates each MonthView accordingly.
  selectMonth: function() {
    var newBDayMonth = this.model.get("name");

    // if the user clicked on what is already the current month, we don't need to do anthing.
    if (_BirthdayMonthAPI.getMonth() !== newBDayMonth) {
      // set new birthday month in API
      _BirthdayMonthAPI.setMonth(newBDayMonth);
      // set isBirthdayMonth attribute on this view's model. 
      // This will fire off a change event which that Month model's initialize function setup a listener for
      this.model.set({"isBirthdayMonth": true});

      // we need to update the view that had the previous birthday month
      this.model.collection.forEach(function(model, index) {
        // only do a model.set on the view that was actually the previous birthday month.
        // this will prevent unnecessary DOM redraws
        if (model.get("name") !== newBDayMonth && model.get("isBirthdayMonth") === true) {
          // set the isBirthdayMonth attribute to false.
          // This will fire off a change event which that Month model's initialize function setup a listener for
          model.set({"isBirthdayMonth": false});
        }
      });
    }
  }
});