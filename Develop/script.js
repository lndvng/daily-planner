// this function displays the currentDate after the page is rendered
$(document).ready(function(){
  // display current date
  const currentDate = dayjs().format('dddd, MMMM d');
  $('#currentDay').text(currentDate);
});

// defining variable for button using jquery
const saveButtonEl = $('.btn');

// function listens to button 'click' and saves an entry to local storage
$(document).on('click', '.btn', function () {

  // grabbing user input from timeBlock and description
  let timeBlockId = $(this).closest('.time-block').attr('id');
  let userEntry = $(this).siblings('textarea').val();
  // saves user input to local storage with timeBlock as key and textArea as userEntry value  
  localStorage.setItem(timeBlockId, userEntry);
});

// function to apply past/present/future classes based on current time
$(document).ready(function () {

  // defining variable for currentHour using dayjs
  const currentHour = dayjs().hour();

  // applying function to each element with a class of timeBlock by parsing out the "-number" in the attribute.
  $('.time-block').each(function () {
    let timeBlockId = $(this).attr('id');
    let hour = parseInt(timeBlockId.split('-')[1]);

    // compare's block time with current hour to apply color styles accordingly
    if (hour < currentHour) {
      $(this).addClass('past');
    } else if (hour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }

    // retrieves user input from localStorage and displays savedEntry as static on webpage until savedEntry is changed. 
    const savedEntry = localStorage.getItem(timeBlockId);
    if (savedEntry !== null) {
      $(this).find('textarea').val(savedEntry);
    }
  });
});