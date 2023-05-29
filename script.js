// Load the Google API client library
function loadGoogleApiClient(callback) {
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/api.js';
  script.onload = callback;
  document.body.appendChild(script);
}

// Function to handle Google Calendar API initialization
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

// Initialize the Google Calendar API client
function initClient() {
  gapi.client.init({
    apiKey: 'YOUR_API_KEY',
    clientId: 'YOUR_CLIENT_ID',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    scope: 'https://www.googleapis.com/auth/calendar.readonly'
  }).then(function() {
    // Call the function to fetch calendar data and update the widget
    fetchCalendarData();
  });
}

// Function to fetch data from Google Calendar API
function fetchCalendarData() {
  gapi.client.calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 2,
    orderBy: 'startTime'
  }).then(function(response) {
    const events = response.result.items;

    if (events.length > 0) {
      // Assuming the first event is "current" and the second event is "future"
      const currentEvent = events[0];
      const futureEvent = events[1];

      // Update the "current" event information
      document.getElementById("current-event-name").textContent = currentEvent.summary;
      document.getElementById("current-event-date").textContent = currentEvent.end.dateTime;
      document.getElementById("current-event-image").src = currentEvent.attachments ? currentEvent.attachments[0].fileUrl : '';

      // Update the "future" event information
      document.getElementById("future-event-name").textContent = futureEvent.summary;
      document.getElementById("future-event-date").textContent = futureEvent.end.dateTime;
      document.getElementById("future-event-image").src = futureEvent.attachments ? futureEvent.attachments[0].fileUrl : '';

      // Generate screenshot of the widget
      html2canvas(document.getElementById("widget")).then(function(canvas) {
        // Convert the canvas to a data URL
        const dataUrl = canvas.toDataURL();

        // Create a link element to save the screenshot
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'createdWidget.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  }, function(error) {
    console.error('Error fetching calendar events:', error);
  });
}

// Load the Google API client library and initialize the Calendar API
loadGoogleApiClient(handleClientLoad);

// Schedule periodic widget updates (every hour)
setInterval(fetchCalendarData, 3600000);
