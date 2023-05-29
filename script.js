window.addEventListener('DOMContentLoaded', function() {
    // Your Google Calendar API credentials
    var apiKey = 'YOUR_API_KEY';
    var calendarId = 'YOUR_CALENDAR_ID';
  
    // Fetch events from Google Calendar API
    fetch('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?key=' + apiKey)
      .then(response => response.json())
      .then(data => {
        // Get the current event and the future event
        var currentEvent = data.items[0];
        var futureEvent = data.items[1];
  
        //current event information
        var currentEventName = currentEvent.summary;
        var currentEventEndDate = new Date(currentEvent.end.dateTime);
        var currentEventImage = currentEvent.attachments && currentEvent.attachments.length > 0 ? currentEvent.attachments[0].fileUrl : '';
  
        //future event information
        var futureEventName = futureEvent.summary;
        var futureEventStartDate = new Date(futureEvent.start.dateTime);
        var futureEventImage = futureEvent.attachments && futureEvent.attachments.length > 0 ? futureEvent.attachments[0].fileUrl : '';
  
        //days until future event
        var currentDate = new Date();
        var daysUntilFutureEvent = Math.ceil((futureEventStartDate - currentDate) / (1000 * 60 * 60 * 24));
  
        //Update with current event information
        document.getElementById('current-event-name').textContent = currentEventName;
        document.getElementById('current-event-date').textContent = 'End Date: ' + currentEventEndDate.toLocaleString();
        document.getElementById('current-event-image').src = currentEventImage;
  
        //Update with future event information
        document.getElementById('future-event-name').textContent = futureEventName;
        document.getElementById('future-event-date').textContent = 'End Date: (Starts in ' + daysUntilFutureEvent + ' days)';
        document.getElementById('future-event-image').src = futureEventImage;
      })
      .catch(error => {
        //error
        console.error('Error fetching events from Google Calendar:', error);
      });
  });
  