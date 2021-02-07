import {Products} from './Products.js';
import {Cart} from "./Cart.js";
import {Search} from "./Search.js";
import {Error} from "./Error.js";

export const Shop = {
    components: {
        Products,
        Cart,
        Search,
        Error
    },
    data() {
        return {
            API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
        }
    },
    provide() {
       return {
           API: this.API,
           getJson: this.getJson,
           postJson: this.postJson,
           putJson: this.putJson,
           deleteJson: this.deleteJson
       }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
        deleteJson(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
    }
};