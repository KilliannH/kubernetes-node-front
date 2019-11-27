const parts = [];

$(document).ready(() => {
  for(let i = 1; i < 5; i++) {
    parts.push({elm: document.getElementById(`part${i}`)});
  }

  for(let i = 0; i < parts.length; i++) {
    $(parts[i].elm).addClass('end');
  }
});

window.addEventListener('wheel', (e) => {

  for (let i = 0; i < parts.length; i++) {
    doChanges(parts[i].elm);
  }

});

function checkVisible(elm, threshold) {
  threshold = threshold || 0;

  const tpt = elm.getBoundingClientRect();

  // console.log(tpt.width + tpt.x);

  const before = tpt.left - threshold < 0 && tpt.width + tpt.x > 0;

  return before;
}

function doChanges(elm) {

  var elmToChangeId = parseInt(elm.id.split('part')[1]) + 1;
  var elmToChange = $(`#part${elmToChangeId}`);

  if (checkVisible(elm, 0)) {

    if($(elmToChange).hasClass('end')) {
      $(elmToChange).removeClass('end');
    }
    if(!$(elmToChange).hasClass('start')) {
      $(elmToChange).addClass('start');
    }
  } else {
    if($(elmToChange).hasClass('start')) {
      $(elmToChange).removeClass('start');
    }

    if(!$(elmToChange).hasClass('end')) {
      $(elmToChange).addClass('end');
    }
  }
}