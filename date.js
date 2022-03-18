
module.exports = getDate;

function getDate(){

    var day =   new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    
    day = day.toLocaleDateString("hi-IN", options)
  return day;

}