export const Search = {
    data() {
        return {
            searchLine: ''
        }
    },
    template: `<form action="#" class="search-form" @submit.prevent="">
                    <input type="text" class="search-field" v-model.lazy="searchLine">
                    <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
};