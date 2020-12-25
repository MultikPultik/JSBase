"use strict";

const productDesc = {
    render(product) {
        return `<div class="productWrap">
            <img src="${product.productImg}" alt="picture">
            <div><b>Наименование</b>: ${product.productName}</div>
            <div><b>Цена</b>: ${product.productPrice}</div>
        </div>`;
    }
}

let catalog = {
    catalogDiv: null,
    productDesc,

    products: [
        {
            productName: 'Телевизор LG',
            productPrice: 25000,
            productImg: 'https://picsum.photos/id/237/300',
        },
        {
            productName: 'Держатель для телевизора',
            productPrice: 1000,
            productImg: 'https://picsum.photos/id/238/300',
        },
        {
            productName: 'Батарейки для пульта',
            productImg: 'https://picsum.photos/id/239/300',
            productPrice: 60,
        },
        {
            productName: 'Подписка "Русское кино"',
            productPrice: 680,
            productImg: 'https://picsum.photos/id/240/300',
        },
    ],

    init() {
        this.catalogDiv = document.getElementById("catalog");
        this.render();
    },

    render() {
        if (this.products.length) {
            this.products.forEach(product => {
                this.catalogDiv.insertAdjacentHTML('beforeend', this.productDesc.render(product));
            });
        }
    }
}

catalog.init();



