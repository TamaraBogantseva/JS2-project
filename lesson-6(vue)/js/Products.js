import { Product } from "./Product.js";

export const Products = {
    components: {
        Product
    },
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
    methods: {
        add(product) {
            this.$root.$refs.cart.addProduct(product);
        }
    },
    computed: {
        filtered() {
            return this.products.filter(item => new RegExp(this.$root.$refs.search.searchLine, 'i').test(item.product_name));
        }
    },
    mounted() {
        this.$root.getJson(`${this.$root.API + this.catalogUrl}`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            });
        this.$root.getJson(`getProducts.json`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            });
    },
    template: `<div class="products">
                <div v-show="!filtered.length">Нет данных</div>
                    <Product
                    v-for="el of filtered" 
                    :key="el.id_product" 
                    :img="imgCatalog"
                    :product="el"
                    @add="add"
                    ></Product>
                </div>`
};