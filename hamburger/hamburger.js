

class HamburgerMenu {
    constructor(name, title, price, calory) {
        this.name = name;
        this.title = title;
        this.price = price;
        this.calory = calory;
    }
    renderSize() {
        if (this.name == 'size') {
            if (this.title == 'Большой') {
                return `<p><input class="hamburger" type="radio" name=${this.name} value=${this.price},${this.calory} checked>${this.title} : ${this.price}₽ : ${this.calory} калорий </p>`;
            }
            return `<p><input class="hamburger" type="radio" name=${this.name} value=${this.price},${this.calory}> ${this.title} : ${this.price}₽ : ${this.calory} калорий </p>`;
        }
        else {
            return `<p><input class="hamburger" type="checkbox" name=${this.name} value=${this.price},${this.calory}> ${this.title} : ${this.price}₽ : ${this.calory} калорий </p>`;
        }


    }
}

class GoodsList {
    constructor() {
        this.size = [
            { name: 'size', title: "Большой", price: 100, calory: 40 },
            { name: 'size', title: "Маленький", price: 50, calory: 20 },
        ];
        this.stuffing = [
            { name: 'stuff1', title: "с сыром", price: 10, calory: 20 },
            { name: 'stuff2', title: "с салатом", price: 20, calory: 5 },
            { name: 'stuff3', title: "с картовелем", price: 15, calory: 10 },
            { name: 'stuff4', title: "с приправой", price: 15, calory: 0 },
            { name: 'stuff5', title: "с майонезом", price: 20, calory: 5 },
        ]
    }

    totalCost() {
        this.total = { cost: 0, calory: 0 };
        const elem = document.querySelectorAll('.hamburger')

        elem.forEach(input => {
            if (input.checked) {
                let arr = input.value.split(',')
                this.total.cost += Number(arr[0])
                this.total.calory += Number(arr[1])
            }
        })
        const html = `<p class="basket" >Цена гамбургера ${this.total.cost} ₽, (${this.total.calory} кал.) </p>`
        const elementList = document.querySelector('.top_info');
        elementList.innerHTML = html;
        console.log(this.total)
    }
    render(arr, element) {
        let listHtml = '';
        arr.forEach(product => {
            const productItem = new HamburgerMenu(product.name, product.title, product.price, product.calory);
            listHtml += productItem.renderSize();
        });
        // listHtml += '</form>'
        element.innerHTML = listHtml

    }
};

document.addEventListener('DOMContentLoaded', () => {
    const list = new GoodsList();
    const elementSize = document.querySelector('.size');
    const elementStuff = document.querySelector('.stuff')
    list.render(list.size, elementSize);
    list.render(list.stuffing, elementStuff);
    list.totalCost()
    document.body.addEventListener("click", function () {
        list.totalCost()
    })
    // document.querySelectorAll('.hamburger').addEventListener("click", list.totalCost());
});