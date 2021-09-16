const getBookSectionRow = document.querySelector(".book-section-row")
const shoppingCart = document.querySelector("#cart")

window.onload = () => {
    loadBooks()
};

let books = []

let shoppingCartList = []

let filteredBooks = []

function loadBooks() {
    fetch("https://striveschool-api.herokuapp.com/books")
    .then (response => response.json())
    .then ( (_books) => {                                         // targeting each book that comes from the API with _books
        books = _books;                                          // assigning them to the global variable above let books = []
        displayBooks();                                          // then calling displayBooks funtion to show it in the DOM
    })
    .catch((err) => console.error(err.message));
}

function displayBooks(_books = books) {
    getBookSectionRow.innerHTML = "";

    _books.forEach((book) => {
        getBookSectionRow.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card">
            <img src="${book.img}" class="img-fluid card-img-top" alt="${
        book.title
      }">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">${book.category}</p>
              <button class="btn btn-primary" onclick="addToCart('${String(
                book.asin
              )}', this)">$${book.price}</button>
              <button class="btn btn-warning" onclick="this.closest('.col-12').remove()">
                Skip me
              </button>
            </div>
          </div>
        </div>
      `;
    });
}

function addToCart(asin, element) {   // assigning the asin as the value for addToCart
    console.log(asin)
     const book = books.find( (book) => book.asin == asin)   // finding only the asin that matches the one passed
     shoppingCartList.push(book) // pushing the book to shoppingCartList
     refreshShoppingCartList()

     console.log(shoppingCartList);

     element.closest(".card").classList.add("selected-btn");
}

function refreshShoppingCartList() {
    shoppingCartList.innerHTML = "";

    shoppingCartList.forEach(book => {
        shoppingCart.innerHTML += `
        <div class="shopping-item">
                <div>
                 ${book.title}
                </div>
                <div>
                 ${book.price}
                </div>
                <button class="btn btn-danger" onclick="deleteItem('${String(
                    book.asin
                  )}')">Delete </button>
        </div>
        `;
    });
}

function search(query) {
    if (query.length < 3) {    // at query length 3 (when 3 digits entered) 
      filteredBooks = books;   // use filteredBooks below to conver to lower case
      displayBooks();          // display books
      return;
    }

    filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );

    console.log(filteredBooks);
    displayBooks(filteredBooks);
  }

  function deleteItem(asin) {
    const index = shoppingCartList.findIndex((book) => book.asin === asin);

    if (index !== -1) {
      shoppingCartList.splice(index, 1);
    }

    refreshShoppingCartList();
  }