
let cardContainer = document.querySelector("#card-container");

const fetchData = async () => {
    try {
        const res = await fetch("https://dummyjson.com/products");
        // const res = await fetch("data.json");
        if (res.ok) {
            const { products } = await res.json();
            let cardsHTML = "";
            for (const {
                title,
                description,
                price,
                discountPercentage,
                images,
                category,
            } of products) {
                // Access the first image
                const shortDescription =
                    description.length > 20
                        ? description.substring(0, 20) + "..."
                        : description;
                let totalPrice = (price + discountPercentage).toFixed(2);

                cardsHTML += `<div class="col-sm-6 col-md-4 col-lg-3" data-category="${category}" id="card">
                    <div class="card" ">
                        <img src="${images}" object-fit: scale-down;' alt="${title}" class="img-fluid" />
                        <div class="card-body">
                            <h5 class="title">${title}</h5>
                            <p class="card-text">${shortDescription}</p>
                            <h6 class="">
                            <span class="text-decoration-line-through me-1">$${totalPrice}</span>
                            <span>$${price}</span>
                            </h6>
                            <a href="#" class="btn btn-primary">Visit</a>
                        </div>
                    </div>
                </div>`;
            }
            cardContainer.innerHTML = cardsHTML; // Append all at once

            // data filteration

            const filterButtons = document.querySelectorAll(".btn-group .btn");
            const productCards = document.querySelectorAll("#card");

            filterButtons.forEach((filterButton) => {
                filterButton.addEventListener("click", showProducts);
            });

            function showProducts(e) {
                const buttonCategory = e.target.dataset.category;

                productCards.forEach((productCard) => {
                    cardCategory = productCard.dataset.category;

                    if (
                        buttonCategory === cardCategory ||
                        buttonCategory === "all"
                    ) {
                        productCard.classList.add("d-block");
                        productCard.classList.remove("d-none");
                    } else {
                        productCard.classList.remove("d-block");
                        productCard.classList.add("d-none");
                    }
                });
            }

            // show filter buttons
            document.querySelector("#btn-group").classList.remove("d-none");
        } else {
            showToast("Failed to load products. Please try again later.");
        }
    } catch (error) {
        showToast(error.message);
    } finally {
        document.querySelector(".loader").classList.add("d-none");
    }
};

const showToast = (message) => {
    const toastMessage = document.getElementById("toast-message");
    const toastElement = new bootstrap.Toast(
        document.getElementById("error-toast")
    );

    toastMessage.textContent = message; // Set the toast message
    toastElement.show(); // Show the toast
};

fetchData();
