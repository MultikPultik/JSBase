"use strict";

const chess = {
    mainContainer: null,

    renderBoard() {
        let     rowEl = null,
                colEl = null;
        const   colName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
                rowName = ['1', '2', '3', '4', '5', '6', '7', '8'];

        this.init();

        for (let row = 0; row < 9; row++) {
            //контейнер для строки
            rowEl = document.createElement("div");
            rowEl.className = "row";
            this.mainContainer.appendChild(rowEl);
            if (row == 8) {
                //последняя строка с буквенными колонками
                for (let col = 0; col < 9; col++) {
                    if (col == 0) {
                        colEl = document.createElement("div");
                        rowEl.appendChild(colEl);
                        colEl.className = "col1";

                    } else {
                        colEl = document.createElement("div");
                        rowEl.appendChild(colEl);
                        colEl.className = "letter";
                        colEl.innerText = colName[col - 1];
                        
                    }
                }
            } else {
                for (let col = 0; col < 9; col++) {
                    if (col == 0) {
                        //нумерованные колонки
                        colEl = document.createElement("div");
                        rowEl.appendChild(colEl);
                        colEl.className = "col1";
                        colEl.innerText = `${rowName[row]}`;
                    } else {
                        colEl = document.createElement("div");
                        rowEl.appendChild(colEl);
                        colEl.className = "col";
                    }
                }
            }
        }
    },

    //Создаем контейнер для шахматной доски//
    init() {
        let body = null;
        body = document.querySelector("body");
        this.mainContainer = document.createElement("div");
        this.mainContainer.className = "container";
        body.appendChild(this.mainContainer);
    }
}

chess.renderBoard();