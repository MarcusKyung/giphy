import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GiphyService from './giphy-service';

// Business Logic

function getGif(gifSearch, gifLimit, gifRating) {
  let promise = GiphyService.getGif(gifSearch, gifLimit, gifRating);
  
  promise.then(function(response) {
    printElements(response);
  }, function(errorMessage) {
    printError(errorMessage);
  });
}

// UI Logic

function printError(error) {
  document.querySelector('#errorMessage').innerText = `there was an error accessing gif data for ${error[2]}: ${error[0].status} ${error[1].meta.msg}`;
}

function printElements(response) {
  const ul = document.querySelector('ul');
  for (let i = 0; i < response[1]; i++) {
    const gifBullet = document.createElement("li");
    ul.append(gifBullet);
    const img = document.createElement("img");
    gifBullet.appendChild(img);
    img.setAttribute("src", `${response[0].data[i].images.original.url}`);
    img.setAttribute("width", "200px");
  }
}


function handleFormSubmission(event) {
  event.preventDefault();
  const gifSearch = document.querySelector('#searchQuery').value;
  const gifLimit = document.querySelector('#gifLimit').value;
  const gifRating = document.querySelector('#gifRating').value;
  document.querySelector('#searchQuery').value = null;
  document.querySelector('#gifLimit').value = null;
  document.querySelector('#gifRating').value = null;
  getGif(gifSearch, gifLimit, gifRating);
}


window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
