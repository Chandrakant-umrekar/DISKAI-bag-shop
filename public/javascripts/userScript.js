document.addEventListener('DOMContentLoaded', function () {

    const incrementButtons = document.querySelectorAll(".increment");
    const decrementButtons = document.querySelectorAll(".decrement");
    // for increment
    incrementButtons.forEach((button) => {
        button.addEventListener('click', function () {
            // finding sibling p tag
            const quantityElement = this.previousElementSibling; // this = incrementButton
            let currentQuantity = parseInt(quantityElement.textContent);

            if (currentQuantity < 10) {
                currentQuantity++;
                quantityElement.textContent = currentQuantity;
            }
        });
    });
    //for decrement
    decrementButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const quantityElement = this.nextElementSibling;
            let currentQuantity = parseInt(quantityElement.textContent);

            if (currentQuantity > 1) {
                currentQuantity--;
                quantityElement.textContent = currentQuantity;
            }
        })
    })
})