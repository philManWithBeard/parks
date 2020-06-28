"use strict"

const states = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}

for (let [key, value] of Object.entries(states)) {
  $("#locality-dropdown").append($('<option></option>').val(key).html(value))
}

for (let i = 1; i <= 10; i++) {
  $("#number-of-results").append($('<option></option>').val(i).html(i))
}

$( "#target" ).submit(function( event ) {
  event.preventDefault()
  let selectedState = $('#locality-dropdown option:selected').val()
  let selectedResultNo = $('#number-of-results option:selected').val()
  fetchParks(selectedState, selectedResultNo)
});


let requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

function fetchParks(callState, callNumber) {
  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${callState}&limit=${callNumber}&api_key=`, requestOptions)
    .then(response => response.json())
    .then(result => displayParks(result.data))
    .catch(error => console.log('error', error));
}

function displayParks(result) {
  for (var i = 0; i < Object.keys(result).length; i++) {
    $(".results").append($('<h1></h1>').html(result[i].fullName))
    $(".results").append($('<p></p>').html(result[i].description))
    $(".results").append($(`<a href="${result[i].url}"></a>`).html(result[i].url))
  }
}
