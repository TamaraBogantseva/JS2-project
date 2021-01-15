const products = [
    { id: 1, title: 'Notebook', price: 2000, image: '../img/placeholder.png' },
    { id: 2, title: 'Keyboard', price: 200, image: '../img/placeholder.png' },
    { id: 3, title: 'Mouse', price: 100, image: '../img/placeholder.png' },
    { id: 4, title: 'Gamepad', price: 87, image: '../img/placeholder.png' },
];


const renderProduct = (item) =>
    `<div class="product-item">
        <img src="${item.image}" alt="placeholder" class="product-image">
        <h3>${item.title}</h3>
        <p>${item.price}</p>
        <button class="btn-buy">Add</button>
    </div>`;


const render = (productsList = products) =>
    document.querySelector('.products').insertAdjacentHTML('afterbegin', productsList.map(item => renderProduct(item)).join('')); //преобразовываем массив в строку с указанием как элементы должны разделяться

render();