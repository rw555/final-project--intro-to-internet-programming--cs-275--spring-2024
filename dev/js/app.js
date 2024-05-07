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
    promise
        .then((input) => {
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

            let range = input * input;
        });
};
