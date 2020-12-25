"use strict";

const chess = {
    mainContainer: null,
    figures: [
        { name: 'p', color: 'w', pos: 'A2' },
        { name: 'p', color: 'w', pos: 'B2' },
        { name: 'p', color: 'w', pos: 'C2' },
        { name: 'p', color: 'w', pos: 'D2' },
        { name: 'p', color: 'w', pos: 'E2' },
        { name: 'p', color: 'w', pos: 'F2' },
        { name: 'p', color: 'w', pos: 'G2' },
        { name: 'p', color: 'w', pos: 'H2' },
        { name: 'R', color: 'w', pos: 'A1' },
        { name: 'N', color: 'w', pos: 'B1' },
        { name: 'B', color: 'w', pos: 'C1' },
        { name: 'Q', color: 'w', pos: 'D1' },
        { name: 'K', color: 'w', pos: 'E1' },
        { name: 'B', color: 'w', pos: 'F1' },
        { name: 'N', color: 'w', pos: 'G1' },
        { name: 'R', color: 'w', pos: 'H1' },

        { name: 'p', color: 'b', pos: 'A7' },
        { name: 'p', color: 'b', pos: 'B7' },
        { name: 'p', color: 'b', pos: 'C7' },
        { name: 'p', color: 'b', pos: 'D7' },
        { name: 'p', color: 'b', pos: 'E7' },
        { name: 'p', color: 'b', pos: 'F7' },
        { name: 'p', color: 'b', pos: 'G7' },
        { name: 'p', color: 'b', pos: 'H7' },
        { name: 'R', color: 'b', pos: 'A8' },
        { name: 'N', color: 'b', pos: 'B8' },
        { name: 'B', color: 'b', pos: 'C8' },
        { name: 'Q', color: 'b', pos: 'D8' },
        { name: 'K', color: 'b', pos: 'E8' },
        { name: 'B', color: 'b', pos: 'F8' },
        { name: 'N', color: 'b', pos: 'G8' },
        { name: 'R', color: 'b', pos: 'H8' },
    ],

    figureHtml: {
        pw: '&#9817;',
        Bw: '&#9815;',
        Nw: '&#9816;',
        Rw: '&#9814;',
        Qw: '&#9813;',
        Kw: '&#9812;',
    
        pb: '&#9823;',
        Bb: '&#9821;',
        Nb: '&#9822;',
        Rb: '&#9820;',
        Qb: '&#9819;',
        Kb: '&#9818;',
    },

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
                        colEl.dataset.col = colName[col-1].toString();
                        colEl.dataset.row = rowName[row].toString();
                    }
                }
            }
        }
    },

    renderFigures() {
        // Перебираем все фигуры, которые есть в массиве.
        for (const figure of this.figures) {
          // Получаем колонку и строку, где стоит фигура.
          const col = figure.pos.charAt(0);
          const row = figure.pos.charAt(1);
          // Находим нужную ячейку, ставим ей innerHTML взятый из объекта this.figureHtml,
          // ключ - это два символа, имя фигуры и цвет, в итоге получим символ фигуры.
          
          //Это код "  querySelector(`[data-col='${col}'][data-row='${row}']`) " я влял у Ваc,
          //но так и не разобрался почему dataset в квадратных скобках и нет между скобками запятой.

          document.querySelector(`[data-col='${col}'][data-row='${row}']`).innerHTML =
            this.figureHtml[figure.name + figure.color];
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
chess.renderFigures();