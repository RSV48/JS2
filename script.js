const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

class GodsItem {
    constructor(title, price, quantity) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }
    render() {
        return `<div class="goods-item">
        <h3>${this.title}</h3>
        <p>${this.price} ₽</p>
        <p>${this.quantity} шт.</p>
        <a href='#' class="button button_tex" type="button">Удалить</a>
        </div>`;
    }
}
class GoodsList {
    constructor() {
        this.goods = [];
        this.total = {};
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150, quantity: 2 },
            { title: 'Socks', price: 50, quantity: 4 },
            { title: 'Jacket', price: 350, quantity: 1 },
            { title: 'Shoes', price: 250, quantity: 3 },
        ];
    }
    totalCost() {
        this.total = { quantity: 0, cost: 0 };
        this.goods.forEach(product => {
            this.total.quantity += product.quantity;
            this.total.cost += product.price * product.quantity;
        })
        const html = `<button class="basket" type="button">Корзина ${this.total.cost} ₽, ${this.total.quantity} шт. </button>`
        const elementList = document.querySelector('.top_info');
        elementList.innerHTML = html;

    }
    render() {
        let listHtml = '';
        this.goods.forEach(product => {
            const productItem = new GodsItem(product.title, product.price, product.quantity);
            listHtml += productItem.render();
        });
        const elementList = document.querySelector('.goods-list');
        elementList.innerHTML = listHtml

    }
};

class addProduct {

};

class deleteProduct {

};


document.addEventListener('DOMContentLoaded', () => {
    const list = new GoodsList();
    list.fetchGoods();
    list.render();
    list.totalCost();
});


