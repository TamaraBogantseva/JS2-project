
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getData = (url, cb) => {
    let xhr = new XMLHttpRequest();
    // window.ActiveXObject -> new ActiveXObject();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                console.log('error');
            } else {
                cb(xhr.responseText);
            }
        }
    }
};

class Product {
    constructor(product, img = 'https://placehold.it/100x100') {
        let { product_name, price = 0, id_product } = product;
        this.title = product_name;
        this.img = img;
        this.price = price;
        this.id = id_product;
        this.rendered = false
    }

    render() {
        this.rendered = true;
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
        this._fetchData()
            .then(() => this._render());
    }

    init() { }

    calcSum() {
        return this.products.reduce((accum, item) => accum += item.price, 0);
    }

    _fetchData() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = data;
                for (let dataEl of this.data) {
                    const product = new Product(dataEl);
                    this.products.push(product);
                }
            })
    }

    _render() {
        for (let product of this.products) {
            if (product.rendered) {
                continue;
            }

            this.container.insertAdjacentHTML('beforeend', product.render())
        }
    }
}

const list = new ProductsList();
console.log(list.calcSum());

class Cart {
    constructor() {
        // products = [] - массив товаров которые лежат в корзине
        // sum - свойство в котором лежит общая стоимость товаров в корзине
    }

    // countCart() - метод для подсчета стоимости корзины
    // resetCart() - метод для удаления всех товаров из корзины
    // addProduct() - метод для увеличения количества 
    // deleteProduct() - метод для удаления товара из корзины
    // render() - метод для отображения корзины

}

class CartElement {
    constructor() {
        // id - свойство в котором лежит id товаров
        // name - свойство в котором лежит наименование товара
        // price - свойство в котором лежит цена товара
        // quantity - свойство в котором лежит кол-во товаров в корзине
    }


    // render() - метод для отображения товара в корзине
}