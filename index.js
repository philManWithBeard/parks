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

const apiKey = 'pmR4TzuxnGHYZZcFfX8gchXlgxfdTbjPHLFy6mIN'

for (let [key, value] of Object.entries(states)) {
  $("#locality-dropdown").append($('<option></option>').val(key).html(value))
}

for (let i = 1; i <= 9; i++) {
  $("#number-of-results").append($('<option></option>').val(i).html(i))
}

$("#number-of-results").append($('<option selected="selected"></option>').val(10).html(10))

function watchForm() {
  $("#target").submit(function(event) {
    event.preventDefault()
    let selectedState
    $('#locality-dropdown option:selected').each(function(i) {
      selectedState += ',' + $(this).val();
    });
    let selectedResultNo = $('#number-of-results option:selected').val()
    const requestURL = `https://developer.nps.gov/api/v1/parks?stateCode=${selectedState}&limit=${selectedResultNo}&api_key=${apiKey}`
    fetchParks(requestURL)
  });
}




const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

function fetchParks(callURL) {
  fetch(callURL, requestOptions)
    .then(response => response.json())
    .then(result => displayParks(result.data))
    .catch(error => alert('Something went wrong', error));
}

function displayParks(result) {
  $(".results").html("")
  for (var i = 0; i < Object.keys(result).length; i++) {
    $(".results").append($('<h3></h3>').html(result[i].fullName))
    $(".results").append($('<p></p>').html(result[i].description))
    $(".results").append($(`<a href="${result[i].url}"></a>`).html(result[i].url))
  }
}

$(watchForm)
