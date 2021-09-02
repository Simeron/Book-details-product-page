const bookTitle = document.querySelector('#bookTitle');
const bookDescription = document.querySelector('#bookDescription');
const bookContributor = document.querySelector('#bookContributor');
const bookContributorBio = document.querySelector('#bookContributorBio');
const bookImage = document.querySelector('#bookImage');
const bookPrice = document.querySelector("#bookPrice");
const bookSaleDate = document.querySelector("#bookSaleDate");
const bookReviews = document.querySelector('#bookReviews');
const bookRetailerLinks = document.querySelector('#bookRetailerLinks');
const bookFormat = document.querySelector('#bookFormat');

function loadDoc() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const jsonRawData = this.responseText;
      const data = JSON.parse(jsonRawData);
      console.log(data);
      //gets all the data above


      const getBookTitle = data.title;
      bookTitle.innerHTML = getBookTitle;

      const getBookContributor = data.contributors[0].contributor.name;
      bookContributor.innerHTML = getBookContributor;

      const getBookContributorBio = data.contributors[0].contributor.bio;
      bookContributorBio.innerHTML = getBookContributorBio;

      const getBookImage = data.assets[2].asset.path;
      bookImage.src = getBookImage;

      const getBookDescription = data.description;
      bookDescription.innerHTML = getBookDescription;

      const getBookPrice = data.formats[0].prices[0].amount;
      bookPrice.innerHTML = getBookPrice;

      const getBookSaleDate = data.sale_date.date;
      let dateObj = new Date(getBookSaleDate);
      let month = dateObj.getUTCMonth() + 1;
      let day = dateObj.getUTCDate();
      let year = dateObj.getUTCFullYear();
      newdate = year + "/" + month + "/" + day;
      bookSaleDate.innerHTML = newdate;

      const getBookReviews = data.reviews[0].review.description;
      bookReviews.innerHTML = getBookReviews;

      const getBookRetailerLinks = data.retailers[0].path;
      bookRetailerLinks.href = getBookRetailerLinks;

      const getbookFormat = data.formats[4].detail;
      bookFormat.innerHTML = getbookFormat;
    }

  };
  xhttp.open("GET", "https://v3-static.supadu.io/dev/products/9780060577315.json", true);
  xhttp.send();
  console.log(xhttp);

}
// https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json

function loadAllBookContent() {
  loadDoc();
}
loadAllBookContent();

function showTab(event) {
  document.querySelector('.showTab').classList.remove('showTab');
  document.querySelector('.activeTab').classList.remove('activeTab');

  let button = event.target;
  button.classList.add('activeTab');
  let buttonClass = event.target.classList[1];
  let content = document.querySelectorAll('.' + buttonClass)[1];
  content.classList.add('showTab');
  console.log('show content');
}

function defaultHide() {
	let a = document.querySelectorAll('.content');
	a.forEach(
		function addClass(info) {
      info.classList.add('js-default-hide');
      console.log('hide content')
		}
	)
}

var tabButton = document.getElementsByClassName('tab');

for (var i = 0; i < tabButton.length; i++) {
  tabButton[i].addEventListener('click', showTab);
}

window.addEventListener('load', defaultHide);