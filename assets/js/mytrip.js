/*
 * Record: Initially define as local variables
 *
 *    - Duration
 *    - Distance
 *    - Path
 *    - Title
 *
 *
 *//* Define Textual Code Before Applying */

var
  clock,
  click = 0;
  
var time = new Array(0,0,0);
  
function count() {
  for (var i = 0; i < time.length; i++) {
    
    if (time[i] == 60)
      time[i] = 0;

    time[0]++;
    
    if (time[0] == 60) {
      time[1]++;
    }
    
    if (time[1] == 60) {
      time[2]++;
    }
    
    $("[data-record-time='seconds']").html(time[0]+"sec");
    $("[data-record-time='minutes']").html(time[1]+"min");
    $("[data-record-time='hours']").html(time[2]+"hr");
  }
}


/*
 * Distance Calculation
 * 
 *    a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
 *    c = 2 ⋅ atan2( √a, √(1−a) )
 *    d = R ⋅ c
 *
 *//* Calculate Distance w/ Longitude and Latitude */

function getLocation() {
  
  if (!Number.prototype.toRad || (typeof(Number.prototype.toRad) === undefined)) {
    Number.prototype.toRadians = function() {
      return this * Math.PI / 180;
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

      var
        lat1 = position.coords.latitude,
        lon1 = position.coords.longitude;
      
      setInterval(function() {
        
        var
          lat2 = position.coords.latitude,
          lon2 = position.coords.longitude,
        
          φ1 = lat1.toRadians(),
          φ2 = lat2.toRadians(),
        
          Δφ = (lat2-lat1).toRadians(),
          Δλ = (lon2-lon1).toRadians(),
        
          a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2),
          c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        $("[data-record-location]").html(6371000 * c + "miles");

      }, 1000);
    });
  }
}

$(document).ready(function() {
  $("[data-record-mytrip]").on("click", function(event) {

    click++;
    
    if (click < 2) {
      setInterval(count, 1000);
      getLocation();
    }
  });
});