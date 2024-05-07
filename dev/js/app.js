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
            let range = input * input;
        });
};
