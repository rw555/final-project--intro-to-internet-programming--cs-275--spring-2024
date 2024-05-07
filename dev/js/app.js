window.onload = () => {
    // Add your code here
    let promise = new Promise((resolve) => {
        let input = 0;
        while (input < 2) {
            input = parseInt(window.prompt(`Enter an integer greater than 1`), 10);
            if (isNaN(input)) {
                input = 0;
            }
        }
        resolve(input);
    });
    let promiseTwo = promise.then((input) => {
        // Create tables to populate
        for (let tableNumber = 0; tableNumber < 2; tableNumber++) {
            let tbody = document.querySelectorAll(`tbody`)[tableNumber];
            for (let iteratorOne = 0; iteratorOne < input; iteratorOne++) {
                let tr = document.createElement(`tr`);
                for (let iteratorTwo = 0; iteratorTwo < input; iteratorTwo++) {
                    let td = document.createElement(`td`);
                    td.innerText = `${((iteratorOne+1) * (iteratorTwo+1))}`;
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
        }
        return input;
    });
    let promiseThree = promiseTwo.then((input) => {
        let range = input * input;
        let switchTable = document.querySelectorAll(`table`)[1];
        // For the sentinel, we get the ceiling of the range / 2 to find the middle
        let sentinel = parseInt(((range/2)+((range/2)%1)),10);
    });
};
