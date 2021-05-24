export const Product = {
    props: ['img', 'product'],
    emits: ['add'],
    template: `<div class="product-item">
                <img :src="img" :alt="product.product_name">
                <div class="desc">
                    <h3>{{ product.product_name }}</h3>
                    <p>{{ product.price }}</p>
                    <button class="buy-btn" @click="$emit('add', product)">Купить</button>
                </div>
            </div>`
};