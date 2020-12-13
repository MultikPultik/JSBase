//1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

function countDivisor(num) {
    let count = 1;
    for (let i = 2; i < num; i++) {
        if ((num % i) == 0) count++;
    }
    return count;
}

let i = 0;

while (i <= 100) {
    if (i > 1) {
        if (countDivisor(i) == 1) {
            console.log(i);
        }
    }
    i++;
}