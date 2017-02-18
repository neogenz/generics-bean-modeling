//This is an example of call from an Factory AngularJS
function _findClientById(id) {
  if (neogenz.utilities.isUndefinedOrNull(id)) {
    throw new Error('Client id is null or undefined.');
  }
  var requestOptions = neogenz.httpUtilities.buildGetRequestOptToCallThisUrl(
    '/client/' + id
  );
  return $http(requestOptions).then(function (response) {
    //with the call to the factory, we control the structure of response.data
    return neogenz.beans.factory.getBean('Client', response.data);
  });
}



//Real data to test the call :
var clientDataFromWS = {
  "_id": "57e2ed5052d4e105cea9ab5e",
  "createdAt": "2016-09-21T20:28:00.717Z",
  "updatedAt": "2016-09-21T20:28:00.717Z",
  "lastName": "Neo",
  "firstName": "Genz",
  "birthDate": "1994-11-16T23:00:00.000Z",
  "address": "Where you want",
  "licensingDate": "1994-11-16T23:00:00.000Z",
  "__v": 0,
  "locationsClosed": [],
  "comingLocations": [],
  "locations": []
};

console.log(neogenz.beans.factory.getBean('Client', clientDataFromWS));

//Nullable constraint
clientDataFromWS.lastName = null;
try {
  console.log(neogenz.beans.factory.getBean('Client', clientDataFromWS));
} catch (err) {
  clientDataFromWS.lastName = 'reset';
}

//Mandatory constraint
delete clientDataFromWS.firstName;
try {
  console.log(neogenz.beans.factory.getBean('Client', clientDataFromWS));
} catch (err) {
  clientDataFromWS.firstName = 'reset';
}

//Type constraint
clientDataFromWS.address = 3;
try {
  console.log(neogenz.beans.factory.getBean('Client', clientDataFromWS));
} catch (err) {
  throw err;
}
