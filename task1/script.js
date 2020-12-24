"use strict";

const chess = {
    mainContainer: null,
    
    renderBoard() {
        let row = null,
            col = null;
        const   colName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
                rowName = ['1', '2', '3', '4', '5', '6', '7', '8'];

        this.init();

        for (let i = 0; i < 9; i++) {
            row = document.createElement("div");
            row.className = "row";
            this.mainContainer.appendChild(row);
            if (i == 8) {
                //последняя строка с буквенными колонками
                for (let j = 0; j < 9; j++) {
                    if (j == 0) {
                        col = document.createElement("div");
                        row.appendChild(col);
                        col.className = "col1";
                        
                    } else {
                        col = document.createElement("div");
                        row.appendChild(col);
                        col.className = "letter";
                        col.innerText = colName[j-1];
                    }
    
                }
            } else {
                for (let j = 0; j < 9; j++) {
                    if (j == 0) {
                        //нумерованные строки
                        col = document.createElement("div");
                        row.appendChild(col);
                        col.className = "col1";
                        col.innerText = `${rowName[i]}`;
                    } else {
                        col = document.createElement("div");
                        row.appendChild(col);
                        col.className = "col";
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