// Load the Google Calendar API
gapi.load('client', initClient);

function initClient() {
  // Initialize the API client
  gapi.client.init({
    apiKey: '746541266615-s9b4aejdegh0mufernqk8a6n9cf4de7g.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  }).then(function() {
    // Call the function to load the calendar events
    loadCalendarEvents();
  }).catch(function(error) {
    console.log('Error initializing the Google Calendar API: ' + error);
  });
}

function loadCalendarEvents() {
  // Make a request to the Google Calendar API
  gapi.client.calendar.events.list({
    calendarId: '9c007573747b29bbb3089d9b0f8cde06717d3c2abb17db7af599955410dbd368@group.calendar.google.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 1,
    orderBy: 'startTime',
    singleEvents: true,
  }).then(function(response) {
    var events = response.result.items;
    if (events.length > 0) {
      var event = events[0];
      var eventTitle = event.summary;
      var eventDate = event.start.dateTime || event.start.date;
      
      // Set the event title and date in the widget
      document.getElementById('eventTitle').textContent = eventTitle;
      document.getElementById('eventDate').textContent = eventDate;
    }
  }).catch(function(error) {
    console.log('Error loading calendar events: ' + error);
  });
}
