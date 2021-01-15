
class Product {
    constructor(product, img = 'https://placehold.it/100x50') {
        let { title, price = 0, id } = product;
        this.title = title;
        this.img = img;
        this.price = price;
        this.id = id;
    }

    render() {
        return `<div class="product-item">
                  <img src="${this.img}" alt="${this.title}">
                  <div class="desc">
                      <h3>${this.title}</h3>
                      <p>${this.price}</p>
                      <button class="buy-btn">Купить</button>
                  </div>
              </div>`
    }

}

class ProductsList {
    constructor(container = '.products') {
        this.data = [];
        this.products = [];
        this.container = document.querySelector(container);
        this._fetchData();
        this._render();
    }

    init() {}

    _fetchData() {
        this.data = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Keyboard', price: 200 },
            { id: 3, title: 'Mouse', price: 100 },
            { id: 4, title: 'Gamepad' },
        ];
    }

    _render() {
        for (let dataEl of this.data) {
            const product = new Product(dataEl);
            this.products.push(product);
            this.container.insertAdjacentHTML('beforeend', product.render())
        }
    }
}

const list = new ProductsList();

class Cart {
    constructor() {
        // name - свойство в котором лежит имя
    }

    // some() - метод для подсчета стоимости корзины
}


// const products = [
//     { id: 1, title: 'Notebook', price: 2000 },
//     { id: 2, title: 'Keyboard', price: 200 },
//     { id: 3, title: 'Mouse', price: 100 },
//     { id: 4, title: 'Gamepad' },
// ];
//
// const renderProduct = (product, img = 'https://placehold.it/100x50') => {
//     return `<div class="product-item">
//                  <img src="${img}" alt="${product.title}">
//                  <div class="desc">
//                      <h3>${product.title}</h3>
//                      <p>${product.price}</p>
//                      <button class="buy-btn">Купить</button>
//                  </div>
//              </div>`
// };

// const renderProduct = (product, img = 'https://placehold.it/100x50') => {
//     const { title, price = 10 } = product;
//     return `<div class="product-item">
//                  <img src="${img}" alt="${title}">
//                  <div class="desc">
//                      <h3>${title}</h3>
//                      <p>${price}</p>
//                      <button class="buy-btn">Купить</button>
//                  </div>
//              </div>`
// };

// const renderPage = productsList => {
//     // document.querySelector(`.products`).innerHTML = productsList.map(product => renderProduct(product)).join('');
//     const element = document.querySelector(`.products`);
//     let strElements = '';
//     for (let product of productsList) {
//         element.insertAdjacentHTML('beforeend', renderProduct(product));
//     }
// };
//
// renderPage(products);