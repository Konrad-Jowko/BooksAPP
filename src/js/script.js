// Book rendering
class BookList {
  constructor () {
    const thisList = this;

    thisList.getElements();
    thisList.renderBooks();
  }

  renderBooks () {
    const thisList = this;
    const source = thisList.dom.bookSrc.innerHTML;
    const bookTpl = Handlebars.compile(source);

    for (let item in thisList.data) {

      const book = thisList.data[item];
      const background = thisList.setBackground(book.rating);
      const width = book.rating * 10;

      const bookInfo = {name: book.name, price: book.price, id: book.id, image: book.image, rating: book.rating,  ratingWidth: width, ratingBgc: background };

      const bookHTML = bookTpl(bookInfo);

      thisList.dom.bookList.insertAdjacentHTML('beforeend', bookHTML);

      thisList.initActions();
    }
  }

  // DOM elements

  getElements () {
    const thisList = this;

    thisList.data = dataSource.books;
    thisList.backgrounds = [
      'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)',
      'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)',
      'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)',
      'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)'
    ];
    thisList.filters = [];

    thisList.dom = {};

    thisList.dom.bookSrc = document.querySelector('#template-book');
    thisList.dom.bookList = document.querySelector('[class="books-list"]');
    thisList.dom.filters = document.querySelector('.filters form');

  }

  // Initializing actions

  initActions() {
    const thisList = this;

    thisList.dom.bookList.addEventListener('dblclick', thisList.addToFavorites);
    thisList.dom.filters.addEventListener('click', function() {
      thisList.checkForFilter();
      thisList.filterItems();
    });

  }

  // Implementing Favorites Mechanic

  addToFavorites () {
    const thisList = this;
    thisList.favorites = [];

    let target = event.target.offsetParent;
    let id = target.getAttribute('data-id');

    if (!thisList.favorites.includes(id)) {

      thisList.favorites.push(id);
      target.classList.toggle('favorite');

    } else {

      const index = thisList.favorites.indexOf(id);
      thisList.favorites.splice(index, 1);
      target.classList.toggle('favorite');
    }
  }
  checkForFilter () {
    const thisList = this;
    if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
      if (event.target.checked) {
        thisList.filters.push(event.target.value);

      } else {
        let index = thisList.filters.indexOf(event.target.value);
        thisList.filters.splice(index, 1);

      }
    }
  }
  filterItems () {
    const thisList = this;

    for (let book of thisList.data){
      let shouldBeHidden = false;

      for (let filter of thisList.filters) {

        if(book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      let id = book.id;
      let target = document.querySelector('[data-id="' + id + '"]');

      if (shouldBeHidden) {
        target.classList.add('hidden');
      } else {
        target.classList.remove('hidden');
      }
    }
  }
  setBackground (rating) {
    const thisList = this;

    if (rating < 6 ) { return (thisList.backgrounds[0]); }
    else if (rating > 6 && rating <= 9) { return (thisList.backgrounds[2]); }
    else if (rating > 8 && rating <= 9) { return (thisList.backgrounds[2]); }
    else if (rating > 9) { return (thisList.backgrounds[3]); }
  }
}
/* eslint-disable */
const app = new BookList();
/* eslint-enable */
