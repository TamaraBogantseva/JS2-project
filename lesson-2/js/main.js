
class Product {
    constructor(product, img = 'https://placehold.it/100x100') {
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
        this.calculateSum();
    }

    calculateSum() {
        let sum = 0;
        this.products.forEach(product => {
            sum += product.price
        });
        console.log(sum);
    }

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
        // products = [] - массив товаров которые лежат в корзине
        // sum - свойство в котором лежит общая стоимость товаров в корзине
    }

    // countCart() - метод для подсчета стоимости корзины
    // resetCart() - метод для удаления всех товаров из корзины
    // render() - метод для отображения корзины

}

class CartElement {
    constructor() {
        // id - свойство в котором лежит id товаров
        // name - свойство в котором лежит наименование товара
        // price - свойство в котором лежит цена товара
        // quantity - свойство в котором лежит кол-во товаров в корзине
    }

    // addMore() - метод для увеличения количества 
    // deleteProduct() - метод для удаления товара из корзины
    // render() - метод для отображения товара в корзине
}



