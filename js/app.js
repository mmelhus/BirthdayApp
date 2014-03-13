/*
This application creates a list of blue buttons representing the months of the year.
It retreives a birthday month from the BirthdayMonth API and sets that month's button as red.

As a user clicks each month's button, it changes teh display to show the last clicked button as red, and 
sets a new birthday month in the BirthdayMonth API.

There are 2 buttons that can be use dto sort the display by month name and month number.

TODO:
 - Implement handlebars templating to separate templates from views.
 - Use requireJS to dynamically load scripts and manage dependency injection
 - Use r.js to create a minified deployable
 - Consider the benefit of using CDN's for all vendor code
 - consider using lodash.js to speed up some underscore methods
 - move sort buttons into appview's template to remove hardwiring of jQuery $('selector').onclick
 - 

*/

$( document ).ready(function() {

  var monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      // create new year collection. It is empty, and we will give it an object collection below.
      year = new Year();

  // iterate over months array and add a new model to Year collection for each month
  monthsArray.forEach(function(monthName, index) {
    // we use the array index plus 1 to represent the month number
    var tmpIndex = index + 1;
    year.add( new Month({name: monthName, number: tmpIndex}) );
  });

  var appView = new AppView({collection: year});

  // click handlers for reordering the display based on name or month number.
  // each handler changes teh sort key for the collection, forces a sort, then redraws the view.
  $( "#alphabetize" ).click(function() {
    year.sortKey = "name";
    year.sort();
    appView.render();
  });

  $( "#numerical" ).click(function() {
    year.sortKey = "number";
    year.sort();
    appView.render();
  });
});