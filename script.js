
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const getListUrl = '/catalogData.json';
const getBasketUrl = '/getBasket.json';
const addBasketUrl = '/addToBasket.json';
const dellBasketUrl = '/deleteFromBasket.json';



async function makeGETRequest(url) {
    let promise = new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    });
    let result = await promise;
    return result
};



class GodsItem {
    constructor(id, title, price, quantity = 1, addBasket = true) {
        this.id = id
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.addBasket = addBasket;
    }
    render() {
        const btnName = this.addBasket ? 'Добавить' : 'Удалить';
        const btnID = this.addBasket ? "btnAdd" : "btnDell"
        return `<div class="goods-item">
        <h3>${this.title}</h3>
        <p>${this.price} ₽</p>
        <p>${this.quantity} шт.</p>
        <a href="#" id=${btnID} class="button button_text" type="button" value="${this.id}">${btnName}</a>
        </div>`;
    }
}
class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
        this.query = '';
    }
    async fetchGoods() {
        let promise = await makeGETRequest(`${API_URL}${getListUrl}`)
        this.goods = await JSON.parse(promise)
        this.render()
    }

    setGoods() {
        this.filterGoods(this.query)
    }
    filterGoods(value) {
        this.query = value;
        this.filteredGoods = this.goods.filter((product) => (new RegExp(value, 'i')).test(product.product_name));

    }
    render() {
        this.setGoods();
        let listHtml = '';
        this.filteredGoods.forEach(product => {
            const productItem = new GodsItem(product.id_product, product.product_name, product.price, product.quantity);
            listHtml += productItem.render();
        });
        const elementList = document.querySelector('.goods-list');
        elementList.innerHTML = listHtml;
        // this.basketAdd();
    }
};


class BasketList {
    constructor() {
        this.basket_list = []
        this.total = { quantity: 0, cost: 0 };
    }
    async fetchGoods() {
        let promise = await makeGETRequest(`${API_URL}${getBasketUrl}`)
        this.basket_list = await JSON.parse(promise)
        this.render();
    }

    totalCost() {
        const html = `<button class="basket" type="button">Корзина ${this.basket_list.amount} ₽, ${this.basket_list.countGoods} наименования. </button>`
        const elementList = document.querySelector('.basket_button');
        elementList.innerHTML = html;

    }
    basketWiev() {
        let basket_list = document.querySelector('.basket_list')
        let basket_button = document.querySelector('.basket')
        basket_list.style.display = 'none'
        basket_button.addEventListener('click', () => {
            if (basket_list.style.display == 'none') {
                basket_list.style.display = 'flex'
            }
            else {
                basket_list.style.display = 'none'
            }
        })
    }
    basketAdd() {
        let btnList = document.querySelectorAll('a#btnAdd')
        btnList.forEach(btn => {
            btn.addEventListener('click', () => {
                let id_product = btn.getAttribute('value')
                makeGETRequest(`${API_URL}${addBasketUrl}?id_product=${id_product}`).then((result) => {
                    console.log(result)
                })
            })
        })
    }
    basketDell() {
        let btnList = document.querySelectorAll('a#btnDell')
        btnList.forEach(btn => {
            btn.addEventListener('click', () => {
                let id_product = btn.getAttribute('value')
                makeGETRequest(`${API_URL}${dellBasketUrl}?id_product=${id_product}`).then((result) => {
                    console.log(result)
                })

            })
        })
    }


    render() {
        let listHtml = '';
        let addBasket = false
        this.basket_list.contents.forEach(product => {
            const productItem = new GodsItem(product.id, product.product_name, product.price, product.quantity, addBasket);
            listHtml += productItem.render();
        });
        const elementList = document.querySelector('.basket_style');
        elementList.innerHTML = listHtml
        this.totalCost();
        this.basketWiev();
        this.basketAdd();
        this.basketDell();
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    const list = new GoodsList();
    const basketlist = new BasketList();
    list.fetchGoods();
    basketlist.fetchGoods();

    const serachInput = document.querySelector('.goods-search');
    serachInput.addEventListener('change', (e) => {
        list.filterGoods(e.target.value)
        list.render()
    });


});


