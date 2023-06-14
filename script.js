// Load the Google Calendar API
gapi.load('client', initialize);

// Initialize the API client library and set up the credentials
function initialize() {
  gapi.client.init({
    apiKey: '746541266615-s9b4aejdegh0mufernqk8a6n9cf4de7g.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  }).then(function() {
    // Call the function to load events from Google Calendar
    loadEvents();
  }).catch(function(error) {
    console.log('Error initializing Google Calendar API:', error);
  });
}

//---------------DATA IS NOT IMPORTING INTO HTML YET------------------
// Update the widget with the event information
document.getElementById('eventDate').textContent = "Access +";
document.getElementById('eventTitle').textContent = "Access +";

// Load events from Google Calendar
function loadEvents() {
  gapi.client.calendar.events.list({
    calendarId: '9c007573747b29bbb3089d9b0f8cde06717d3c2abb17db7af599955410dbd368@group.calendar.google.com',
    timeMin: new Date().toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    
    if (events.length > 0) {
      var event = events[0]; // Assuming the first event is the next one
      var eventDate = new Date(event.start.dateTime);
      var eventTitle = event.summary;
      
      // Update the widget with the event information
      document.getElementById('eventDate').textContent = eventDate.toLocaleDateString();
      document.getElementById('eventTitle').textContent = eventTitle;
    } else {
      console.log('No upcoming events found.');
    }
  }).catch(function(error) {
    console.log('Error loading events:', error);
  });
}
