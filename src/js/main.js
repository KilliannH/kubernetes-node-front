let catapultVotes, trebuchetVotes, totalVotes = 0;
let catapultPercent, trebuchetPercent = 0;

let catapultPercentElm, catapultTotalElm, trebuchetPercentElm, trebuchetTotalElm = document.getElementById('trebuchetTotal');


$(document).ready(() => {

  catapultPercentElm = document.getElementById('catapultPercent');
  catapultTotalElm = document.getElementById('catapultTotal');

  trebuchetPercentElm = document.getElementById('trebuchetPercent');
  trebuchetTotalElm = document.getElementById('trebuchetTotal');


  Promise.all([getCatapultVotes(), getTrebuchetVotes()]).then((results) => {

    catapultVotes = results[0];
    trebuchetVotes = results[1];
    computeVotes();
  });

  $('#catapult-button').click(() => {
    return vote('catapult');
  });

  $('#trebuchet-button').click(() => {
    return vote('trebuchet');
  });
});

computeVotes = () => {
  totalVotes = catapultVotes + trebuchetVotes;
  catapultPercent = catapultVotes / totalVotes;
  trebuchetPercent = trebuchetVotes / totalVotes;

  catapultPercentElm.innerText = Math.round(catapultPercent * 100) * 100 / 100 + ' %';
  catapultTotalElm.innerText = catapultVotes.toString();

  trebuchetPercentElm.innerText = Math.round(trebuchetPercent * 100) * 100 / 100 + ' %';
  trebuchetTotalElm.innerText = trebuchetVotes.toString();
};

getCatapultVotes = () => {
  return Promise.resolve(10);//$.ajax()
};

getTrebuchetVotes = () => {
  return Promise.resolve(10);
};

vote = (value) => {
  if(value === 'catapult') {
    catapultVotes += 1;
    computeVotes();
    return Promise.resolve();
  } else if(value === 'trebuchet') {
    trebuchetVotes += 1;
    computeVotes();
    return Promise.resolve();
  }
};
