// набор данных
const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];



const renderGoodsItem = (title, price) => {
    return `<div class="goods-item">
            <h3>${title}</h3>
            <p>${price}</p>
            <a href='#' class="button button_tex" type="button">Добавить</a>
            </div>`;
};

const renderGoodsList = (element, list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price)).join('');
    element.innerHTML = goodsList;
}

document.addEventListener('DOMContentLoaded', () => {
    const elementList = document.querySelector('.goods-list');
    renderGoodsList(elementList, goods);
});


