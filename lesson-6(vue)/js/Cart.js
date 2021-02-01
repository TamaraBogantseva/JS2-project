import { CartItem } from "./CartItem.js"

export const Cart = {
    components: { //сюда ребенка 
        CartItem
    },
    data() {
        return {
            cartUrl: '/getBasket.json',
            imgCart: 'https://placehold.it/75x100',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        // с помощью refs связать корзину и каталог
        addProduct(elem) {
            this.$root.getJson(`${this.$root.API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === elem.id_product);
                        if (find) {
                            find.quantity++
                        } else {
                            let prod = Object.assign({ quantity: 1 }, elem);
                            this.cartItems.push(prod);
                        }
                    }
                });
        },
        remove(product) {
            this.$root.getJson(`${this.$root.API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if (product.quantity > 1) {
                            product.quantity--
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    }
                });
        }
    },
    mounted() {
        this.$root.getJson(`${this.$root.API + this.cartUrl}`)
            .then(data => {
                for (let product of data.contents) {
                    this.cartItems.push(product);
                }
            });
    },
    template: `<button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
                <div class="cart-block" v-show="showCart">
                <div v-show="!cartItems.length">Нет данных</div>
                    <CartItem v-for="item of cartItems"
                    :key="item.id_product"
                    :img="imgCart"
                    :cartItem="item"
                    ></CartItem>
               </div>`
};