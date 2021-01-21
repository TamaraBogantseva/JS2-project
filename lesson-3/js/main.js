
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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

let getData = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    console.log('error');
                    reject('Error');
                } else {
                    resolve(xhr.responseText);
                }
            }
        }
    })
}

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
                      <button class="buy-btn" type="button">Купить</button>
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
    constructor() { //нужен ли нам тут вообще конструктор, если мы туда ничего не передаем? 
        this.cartProducts = []; //массив товаров которые лежат в корзине
        this.sum = 0; // sum - свойство в котором лежит общая стоимость товаров в корзине
    }

    //метод для добавления товара 
    addProduct(cartProduct) {
        //добавить проверку на наличие в корзине (если есть, то просто увеличиваем количество, если нет, то, соответственно, добавляем товар)
        let selectedProduct = new CartElement(cartProduct); //тут в cartProduct надо передать выбранный товар
        this.cartProducts.push(selectedProduct);
    }

    // метод для подсчета стоимости корзины
    countCart() {
        return this.cartProducts.reduce((accum, item) => accum += item.price, 0);
    }

    // resetCart() - метод для удаления всех товаров из корзины
    // deleteProduct() - метод для удаления товара из корзины
    // render() - метод для отображения корзины


}


class CartElement {
    constructor(cartProduct) {
        let { title, price = 0, id } = cartProduct;
        this.title = cartProduct.title;
        this.price = cartProduct.price;
        this.id = cartProduct.id;
        this.quantity = 0;
    }

    //увеличиваем количество на 1, будем вызывать при повторном добавлении и нажатии на кнопку + товара в корзине
    addQuantity() {
        this.quantity += 1;
    }

    // render() - метод для отображения товара в корзине
}