
// let getData = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> new ActiveXObject();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     }
// };

// let getData = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) {
//                     console.log('error');
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         }
//     })
// }

class Item {
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
                      <button class="buy-btn" type="button" data-id="${this.id}">Купить</button>
                  </div>
              </div>`
    }
}

class Product extends Item { }

class CartItem extends Item {
    constructor(el, img = 'https://placehold.it/50x100') {
        super(el, img);
        this.quantity = el.quantity;
    }

    changeQuantity(count) {
        this.quantity += count;
        this._updateItem();
    }

    remove() {
        document.querySelector(`.cart-item[data-id="${this.id}"]`).remove();
    }

    render() {
        this.rendered = true;
        return `<div class="cart-item" data-id="${this.id}">
        <div class="product-bio">
        <img src="${this.img}" alt="Some image">
        <div class="product-desc">
        <p class="product-title">${this.title}</p>
        <p class="product-quantity">Quantity: ${this.quantity}</p>
        <p class="product-single-price">$${this.price} each</p>
        </div>
        </div>
        <div class="right-block">
        <p class="product-price">$${this.quantity * this.price}</p>
        <button class="del-btn" data-id="${this.id}">&times;</button>
        </div>
        </div>`
    }

    _updateItem() {
        const block = document.querySelector(`.cart-item[data-id="${this.id}"]`);
        block.querySelector('.product-quantity').textContent = `Quantity: ${this.quantity}`;
        block.querySelector('.product-price').textContent = `$${this.quantity * this.price}`;
    }
}

class List {
    static API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
    static itemsMap = {
        Cart: CartItem, //передаем ссылку на конструктор элемента
        ProductsList: Product
    };
    constructor(url, container = '.products') {
        this.url = url;
        this.products = [];
        this.container = document.querySelector(container);
        this.init(); //пишем в базовом классе, чтобы не дергать каждый раз в отдельных классах
    }

    init() {
        return false;
    }

    calcSum() {
        return this.products.reduce((accum, item) => accum += item.price, 0);
    }

    getJson(url) {
        return fetch(url ? url : `${List.API + this.url}`)
            .then(result => result.json())
            .catch(error => console.log(error));
        // .then(data => {
        //     this.data = data;
        //     for (let dataEl of this.data) {
        //         const product = new Product(dataEl);
        //         this.products.push(product);
        //     }
        // })
    }

    handleData(data) {
        for (let dataEl of data) {
            const product = new List.itemsMap[this.constructor.name](dataEl);
            this.products.push(product);
        }

        this._render();
    }

    getItem(id) { //проще всего получать по id элементы, т.к. id уникален
        return this.products.find(product => product.id === id); //возвращает первый найленый элемент
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

class ProductsList extends List {
    constructor(cart, url = '/catalogData.json', container = '.products') {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then((data) => this.handleData(data));
    }
    init() {
        this.container.addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) { //тот элемент, на котором непосредственно пришелся клик
                const id = +e.target.dataset['id']; //необходимо привести строку к числу
                this.cart.addProduct(this.getItem(id));
            }
        })
    }
}

class Cart extends List {
    constructor(url = '/getBasket.json', container = '.cart-block') {
        super(url, container);
        this.getJson()
            .then((data) => this.handleData(data.contents));
    }

    init() {
        this.container.addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                const id = +e.target.dataset['id'];
                this.removeProduct(this.getItem(id));
            }
        });
        document.querySelector('.btn-cart').addEventListener('click', () => {
            this.container.classList.toggle('invisible');
        })
    }

    addProduct(cartProduct) {
        this.getJson(`${List.API}/addToBasket.json`)
            .then(data => {
                if (data.result) {
                    let find = this.products.find(el => el.id === cartProduct.id);
                    if (find) {
                        find.changeQuantity(1);
                    } else {
                        let selectedProduct = Object.assign({ quantity: 1, product_name: cartProduct.title, id_product: cartProduct.id }, cartProduct);
                        this.handleData([selectedProduct]);
                    }
                } else {
                    console.log('error');
                }
            })
    }

    removeProduct(cartProduct) {
        this.getJson(`${List.API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result) {
                    if (cartProduct.quantity > 1) {
                        cartProduct.changeQuantity(-1)
                    } else {
                        this.products.splice(this.products.indexOf(cartProduct), 1);
                        cartProduct.remove();
                    }
                } else {
                    console.log('error');
                }
            })
    }
}

const cart = new Cart();
const list = new ProductsList(cart);
