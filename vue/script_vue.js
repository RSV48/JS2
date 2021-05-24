const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const getListUrl = '/catalogData.json';
const getBasketUrl = '/getBasket.json';
const addBasketUrl = '/addToBasket.json';
const dellBasketUrl = '/deleteFromBasket.json';

function makeGETRequest(url, cb) {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            cb(xhr.responseText);
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
};

document.addEventListener('DOMContentLoaded', () => {

    const app = new Vue({
        el: '#app',
        data: {
            goods: [],
            filteredGoods: [],
            searchLine: '',
            isVisibleCart: 'none'
        },
        methods: {
            setGoods() {
                this.filterGoods()
            },
            filterGoods() {
                this.filteredGoods = this.goods.filter((product) => (new RegExp(this.searchLine, 'i')).test(product.product_name));
            },
            basketWiev() {
                let basket_list = document.querySelector('.basket_list')

                if (this.isVisibleCart == 'none') {
                    this.isVisibleCart = 'flex'
                }
                else {
                    this.isVisibleCart = 'none'
                }
                basket_list.style.display = this.isVisibleCart
            }

        },
        mounted() {
            makeGETRequest(`${API_URL}${getListUrl}`, (goods) => {
                this.goods = JSON.parse(goods);
                this.setGoods()
            })
        }
    });

});
