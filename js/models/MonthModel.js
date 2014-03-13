var Month = Backbone.Model.extend({
  defaults: {
    name: "",
    number: 0,
    isBirthdayMonth: false
  },
  initialize: function() {
    // set this model's isBirthdayMonth attroibute only if this month's name
    // matches the month stored in the BirthdayMonth API
    if (this.get("name") === _BirthdayMonthAPI.getMonth()) {
      this.set({"isBirthdayMonth":true});
    }
  }
});