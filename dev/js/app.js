window.onload = () => {
    // Add your code here
    let promise = new Promise((resolve) => {
        let input = 0;
        while (input < 2) {
            input = parseInt(window.prompt(`Enter an integer greater than 1`), 10);
            if (input < 2) {
                window.alert(`Integer must be greater than 1. Try again...`);
            }
            if (isNaN(input)) {
                input = 0;
                window.alert(`Invalid input. Try again...`);
            }
        }
        resolve(input);
    });
    let promiseTwo = promise.then((input) => {
        // Create tables to populate
        for (let tableNumber = 0; tableNumber < 2; tableNumber++) {
            let tbody = document.querySelectorAll(`tbody`)[tableNumber];
            for (let iteratorOne=0, content=1; iteratorOne < input; iteratorOne++) {
                let tr = document.createElement(`tr`);
                for (let iteratorTwo = 0; iteratorTwo < input; iteratorTwo++) {
                    let td = document.createElement(`td`);
                    td.innerText = `${content}`;
                    tr.appendChild(td);
                    content++;
                }
                tbody.appendChild(tr);
            }
        }
        return input;
    });
    promiseTwo.then((input) => {
        let range = input * input;
        let switchTable = document.querySelectorAll(`table`)[1];
        // For the sentinel, we get the ceiling of the range / 2 to find the middle
        let sentinel = parseInt(((range/2)+((range/2)%1)),10);
        console.log(sentinel);
        for (let iterator = 0, row = 1, col = 0; iterator < sentinel; iterator++) {
            if (!(col === (input - row))) {
                let tdOne = switchTable.querySelectorAll(`td`)[(iterator)];
                let tdTwo = switchTable.querySelectorAll(`td`)[(range-(iterator+1))];
                let temp = tdOne.innerHTML;
                tdOne.innerHTML = tdTwo.innerHTML;
                tdTwo.innerHTML = temp;
            }

            col++;
            if (col === input) {
                col = 0;
                row++;
            }
        }
    });
};
