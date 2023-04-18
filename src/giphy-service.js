export default class GiphyService{
  static getGif(gifSearch, gifLimit, gifRating) {
    return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${gifSearch}&limit=${gifLimit}&offset=0&rating=${gifRating}&lang=en`;
    request.addEventListener("loadend", function() {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        resolve([response, gifLimit]);
      } else {
        reject([this, response, gifSearch]); 
      }
    });
    request.open("GET", url, true);
    request.send();
    });
  }
}