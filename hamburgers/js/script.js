class Hamburger {
    constructor(size, filling) {
        this.size = size;
        this.filling = filling;
        this.topping = [];
        this.order = [];
        this.addTopping();
        this.getSize();
        this.getFilling();
    }
    addTopping() {
        for (let item of toppings) {
            if (item.checked) {
                this.topping.push(item.value);
                this.order.push(menu[item.value]);
            }
        }
    }

    getSize() {
        for (let item of size) {
            if (item.checked) {
                this.size = item.value;
                this.order.push(menu[this.size]);
                break
            }
        }
    }

    getFilling() {
        for (let item of filling) {
            if (item.checked) {
                this.filling = item.value;
                this.order.push(menu[this.filling]);
                break
            }
        }
    }
    calculatePrice() {
        sum = 0;
        this.order.forEach(product => {
            sum += product.price
        });
        console.log(sum);
    }
    calculateCalories() {
        ccal = 0
        this.order.forEach(product => {
            ccal += product.calories
            return;
        });
        console.log(ccal);
    }
}

const menu = {
    big: {
        price: 100,
        calories: 40
    },
    small: {
        price: 50,
        calories: 20
    },
    cheese: {
        price: 10,
        calories: 20
    },
    salat: {
        price: 20,
        calories: 5
    },
    potato: {
        price: 20,
        calories: 5
    },
    spice: {
        price: 15,
        calories: 0
    },
    mayo: {
        price: 20,
        calories: 5
    }
};

let sum = Number;
let ccal = Number;

const size = document.forms['burger'].burgerSize;
const filling = document.forms['burger'].filling;
const toppings = document.getElementsByName('topping');


document.getElementById('btn').addEventListener('click', () => {
    let order = new Hamburger();
    order.calculatePrice();
    order.calculateCalories();
    console.log(order);
    document.getElementById('result').innerHTML = `Сумма: ${sum}, Калорийность: ${ccal}`;
});
