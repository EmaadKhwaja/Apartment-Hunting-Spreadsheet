var Your_API_KEY = "";

function isBusinessDay(date){
var day = date.getDay();
if(day == 0 || day == 6  ){
    return false;
}
return true;
}


function lastbusinessday(){
    var date = new Date();
    while (!isBusinessDay(date)) { date.setDate(date.getDate() - 1) }

    date.setHours(9)
    date.setMinutes(00)

    Logger.log(date)

    return Math.round(date.getTime()/1000)
}

Logger.log(lastbusinessday())


function TransitMeters(origin, destination) {
  var directions = Maps.newDirectionFinder()
  .setMode(Maps.DirectionFinder.Mode.TRANSIT)
  .setOrigin(origin)
  .setDestination(destination)
  .getDirections();
  if (directions && directions.error_message) throw directions.error_message
  if (directions && directions.routes && directions.routes[0] && directions.routes[0].legs && directions.routes[0].legs[0] && directions.routes[0].legs[0].distance) 
    return directions.routes[0].legs[0].distance.value;
  return "";
    Utilities.sleep(2000)
}

function TransitMiles(origin, destination) {
  return TransitMeters(origin, destination)/1609.34;
      Utilities.sleep(2000)

}

function TransitSeconds(origin, destination) {
  var directions = Maps.newDirectionFinder()
  .setMode(Maps.DirectionFinder.Mode.TRANSIT)
  .setOrigin(origin)
  .setDestination(destination)
  .getDirections();
  if (directions && directions.error_message) throw directions.error_message
  if (directions && directions.routes && directions.routes[0] && directions.routes[0].legs && directions.routes[0].legs[0] && directions.routes[0].legs[0].duration) 
    return directions.routes[0].legs[0].duration.value;
  return ""
  Utilities.sleep(2000);
}

function TransitHours(origin, destination) {
  return TransitSeconds(origin, destination)/(60*60);
      Utilities.sleep(2000)

}



function DrivingMeters(origin, destination) {
        Utilities.sleep(2000)

  var directions = Maps.newDirectionFinder()
  .setMode(Maps.DirectionFinder.Mode.DRIVING)
  .setOrigin(origin)
  .setDestination(destination)
  .getDirections();
  if (directions && directions.error_message) throw directions.error_message
  if (directions && directions.routes && directions.routes[0] && directions.routes[0].legs && directions.routes[0].legs[0] && directions.routes[0].legs[0].distance) 
    return directions.routes[0].legs[0].distance.value;
  return ""
  Utilities.sleep(2000);
}

function DrivingMiles(origin, destination) {
  return DrivingMeters(origin, destination)/1609.34;
      Utilities.sleep(2000)

}

function DrivingSeconds(origin, destination) {
        Utilities.sleep(2000)

  var directions = Maps.newDirectionFinder()
  .setMode(Maps.DirectionFinder.Mode.DRIVING)
  .setOrigin(origin)
  .setDestination(destination)
  .getDirections();
  if (directions && directions.error_message) throw directions.error_message
  if (directions && directions.routes && directions.routes[0] && directions.routes[0].legs && directions.routes[0].legs[0] && directions.routes[0].legs[0].duration) 
    return directions.routes[0].legs[0].duration.value;
      Utilities.sleep(2000)
  return ""
  Utilities.sleep(2000);
}

function DrivingHours(origin, destination) {
  return DrivingSeconds(origin, destination)/(60*60);
      Utilities.sleep(2000)

}


function TrainTime(origin, destination) {
  Utilities.sleep(1000);

  var time = lastbusinessday()

  var serviceUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origin+"&destinations="+destination+"&arrival_time="+time+"&mode=transit&transit_mode=rail"+
"&key="+Your_API_KEY;

Logger.log(serviceUrl)

 var options={
  muteHttpExceptions:true,
  contentType: "application/json",
 };

 var response=UrlFetchApp.fetch(serviceUrl, options);
  if(response.getResponseCode() == 200) {
   var directions = JSON.parse(response.getContentText());
    if (directions !== null){
      traveltime=directions.rows[0].elements[0].duration.value/60
     return traveltime;
     }
    }
  return false;
 }

function BusTime(origin, destination) {
    Utilities.sleep(1000);
    var time = lastbusinessday()
 var serviceUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origin+"&destinations="+destination+"&arrival_time="+time+"&mode=transit&transit_routing_preference=fewer_transfers&transit_mode=bus"+
"&key="+Your_API_KEY;

  Logger.log(serviceUrl)

 var options={
  muteHttpExceptions:true,
  contentType: "application/json",
 };

 var response=UrlFetchApp.fetch(serviceUrl, options);
  if(response.getResponseCode() == 200) {
   var directions = JSON.parse(response.getContentText());
    if (directions !== null){
      traveltime=directions.rows[0].elements[0].duration.value/60
     return traveltime;
     }
    }
  return 0;
 }


function BusFare(origin, destination) {
    Utilities.sleep(1000);

    var time = lastbusinessday()

 var serviceUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origin+"&destinations="+destination+"&arrival_time="+time+"&mode=transit&transit_routing_preference=fewer_transfers&transit_mode=bus"+
"&key="+Your_API_KEY;

  Logger.log(serviceUrl)

 var options={
  muteHttpExceptions:true,
  contentType: "application/json",
 };

 var response=UrlFetchApp.fetch(serviceUrl, options);
  if(response.getResponseCode() == 200) {
   var directions = JSON.parse(response.getContentText());
    if (directions !== null){
      var cost=directions.rows[0].elements[0].fare.value
     return cost;
     }
    }
  return "n/a";
 }


function PrefMethod(origin, destination) {
  if (BusTime(origin, destination)-TrainTime(origin, destination)>0)
    return "Train"
            Utilities.sleep(1000)

  if (BusTime(origin, destination)-TrainTime(origin, destination)<=0)
    return "Bus"
        Utilities.sleep(1000)

}

function TransitTime(origin, destination) {
    Utilities.sleep(1000);

  if (PrefMethod(origin, destination)=="Train")
    return TrainTime(origin, destination)
  if (PrefMethod(origin, destination)=="Bus")
    return BusTime(origin, destination)
}

function TrainFare(origin, destination) {
    Utilities.sleep(1000);

    var time = lastbusinessday()

 var serviceUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="+origin+"&destination="+destination+"&arrival_time="+time+"&mode=transit&transit_mode=rail"+
"&key="+Your_API_KEY;



  Logger.log(serviceUrl)

 var options={
  muteHttpExceptions:true,
  contentType: "application/json",
 };

 var response=UrlFetchApp.fetch(serviceUrl, options);
  if(response.getResponseCode() == 200) {
   var directions = JSON.parse(response.getContentText());
    if (directions !== null){
      var cost=directions.routes[0].fare.value
     return cost;
     }
    }
  return "n/a";
 }

 Logger.log(BusFare("UC Berkeley","UCSF"))


function TransitCost(origin, destination) {
    Utilities.sleep(1000);

  if (PrefMethod(origin, destination)=="Train")
    return TrainFare(origin, destination)
  if (PrefMethod(origin, destination)=="Bus")
    return 0
}
