
// creates an API that accepts a string month name and sets that as a default birthday month.
// then allows interested applications to get and set a new month.
var _BirthdayMonthAPI = (function (initialMonth) {
  // private variables
  var birthdayMonth = initialMonth,
  
  //public members
      getMonth = function() {
        return birthdayMonth;
      },

      setMonth = function(month) {
        birthdayMonth = month;
        console.log('BirthdayMonth API recieved  "' + month + '" as the new birthday month');
      };

  return{
    setMonth: setMonth,
    getMonth: getMonth
  };
})("March");