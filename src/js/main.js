let catapultVotes, trebuchetVotes, totalVotes = 0;
let catapultPercent, trebuchetPercent = 0;
let baseUrl = `http://${location.host}`;

let catapultPercentElm, catapultTotalElm, trebuchetPercentElm, trebuchetTotalElm = document.getElementById('trebuchetTotal');

let init = () => {
  return new Promise((resolve, reject) => {
    return Promise.all([getCatapultVotes(), getTrebuchetVotes()]).then((results) => {

      catapultVotes = results[0].length;
      trebuchetVotes = results[1].length;

      $('#trebuchetPercent').css('color', 'black');
      $('#catapultPercent').css('color', 'black');
      return resolve(computeVotes());
    });
  });
};

$(document).ready(() => {

  catapultPercentElm = document.getElementById('catapultPercent');
  catapultTotalElm = document.getElementById('catapultTotal');

  trebuchetPercentElm = document.getElementById('trebuchetPercent');
  trebuchetTotalElm = document.getElementById('trebuchetTotal');

  init();

  $('#catapult-button').click(() => {
    return vote('catapult');
  });

  $('#trebuchet-button').click(() => {
    return vote('trebuchet');
  });

  $('#reset-button').click(() => {
    return reset();
  });
});

let computeVotes = () => {
  totalVotes = catapultVotes + trebuchetVotes;
  catapultPercent = catapultVotes / totalVotes;
  trebuchetPercent = trebuchetVotes / totalVotes;

  catapultPercentElm.innerText = Math.round(catapultPercent * 100) * 100 / 100 + ' %';
  catapultTotalElm.innerText = catapultVotes.toString();

  trebuchetPercentElm.innerText = Math.round(trebuchetPercent * 100) * 100 / 100 + ' %';
  trebuchetTotalElm.innerText = trebuchetVotes.toString();

  if(trebuchetPercent > catapultPercent) {
    $('#trebuchetPercent').css('color', 'green');
    $('#catapultPercent').css('color', 'red');
  } else if(trebuchetPercent < catapultPercent) {
    $('#trebuchetPercent').css('color', 'red');
    $('#catapultPercent').css('color', 'green');
  } else if(trebuchetPercent === catapultPercent) {
    $('#trebuchetPercent').css('color', 'black');
    $('#catapultPercent').css('color', 'black');
  }
};

let reset = () => {
  return fetch(baseUrl + '/api/reset').then((res) => {
    if(res.status === 200) {
      return init();
    }
  });
};

let getCatapultVotes = () => {
  return fetch(baseUrl + '/api/votes/catapult').then((res) => {
    return Promise.resolve(res.json());
  });
};

let getTrebuchetVotes = () => {
  return fetch(baseUrl + '/api/votes/trebuchet').then((res) => {
    return Promise.resolve(res.json());
  });
};

let vote = (value) => {
  return fetch('http://localhost:9000/api/votes/', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify({value: value}) // body data type must match "Content-Type" header
  }).then((response) => {
    if(response.status === 200) {
      return init();
    }
  });
};
