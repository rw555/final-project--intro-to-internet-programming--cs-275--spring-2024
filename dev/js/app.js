window.onload = () => {
    // Add your code here
    let input = 0;
    while (input < 2) {
        input = parseInt(window.prompt(`Enter an integer greater than 1`), 10);
        if (isNaN(input)) {
            input = 0;
        }
    }
};
