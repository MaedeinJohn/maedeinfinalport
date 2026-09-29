/* =========================================================
   ADVENTURE COLLECTION BOOK EFFECT
   Supports a1 through a19
   ========================================================= */

(() => {
    "use strict";

    const overlay = document.getElementById("adventureOverlay");
    const openButton = document.getElementById("openCollection");
    const closeButton = document.getElementById("closeCollection");

    const previousButton = document.getElementById("bookPrev");
    const nextButton = document.getElementById("bookNext");

    const bookPage = document.getElementById("bookPage");
    const bookImage = document.getElementById("bookImage");

    const counter = document.getElementById("adventureCounter");
    const gallery = document.getElementById("collectionGallery");

    if (!overlay || !bookImage || !gallery) {
        return;
    }

    const totalPages = 19;
    let currentPage = 1;
    let isAnimating = false;

    /*
     * Possible image filenames.
     * This supports:
     * a1_1x1.png
     * a1_1X1.png
     * a1_1x1.jpg
     * a1_1X1.jpg
     * and other common image extensions.
     */
    function getImageCandidates(pageNumber) {
        return [
            `../assets/ADVENTURE/a${pageNumber}_1x1.png`,
            `../assets/ADVENTURE/a${pageNumber}_1X1.png`,
            `../assets/ADVENTURE/a${pageNumber}_1x1.jpg`,
            `../assets/ADVENTURE/a${pageNumber}_1X1.jpg`,
            `../assets/ADVENTURE/a${pageNumber}_1x1.jpeg`,
            `../assets/ADVENTURE/a${pageNumber}_1X1.jpeg`,
            `../assets/ADVENTURE/a${pageNumber}_1x1.webp`,
            `../assets/ADVENTURE/a${pageNumber}_1X1.webp`
        ];
    }

    /*
     * Loads an image and tries the next filename
     * if the first one is not found.
     */
    function loadImage(imageElement, pageNumber) {
        const candidates = getImageCandidates(pageNumber);
        let candidateIndex = 0;

        imageElement.alt = `Adventure project image ${pageNumber}`;

        imageElement.onerror = () => {
            candidateIndex += 1;

            if (candidateIndex < candidates.length) {
                imageElement.src = candidates[candidateIndex];
            } else {
                imageElement.removeAttribute("src");
                imageElement.alt = `Adventure project image ${pageNumber} could not be loaded`;
            }
        };

        imageElement.src = candidates[candidateIndex];
    }

    /*
     * Updates active thumbnail.
     */
    function updateActiveThumbnail() {
        const thumbnails = gallery.querySelectorAll(".adventure-gallery-item");

        thumbnails.forEach((thumbnail) => {
            const pageNumber = Number(thumbnail.dataset.page);

            if (pageNumber === currentPage) {
                thumbnail.classList.add("is-active");
                thumbnail.setAttribute("aria-current", "true");
            } else {
                thumbnail.classList.remove("is-active");
                thumbnail.removeAttribute("aria-current");
            }
        });
    }

    /*
     * Updates counter and button states.
     */
    function updateControls() {
        if (counter) {
            counter.textContent = `Page ${currentPage} of ${totalPages}`;
        }

        if (previousButton) {
            previousButton.disabled = currentPage <= 1;
        }

        if (nextButton) {
            nextButton.disabled = currentPage >= totalPages;
        }

        updateActiveThumbnail();
    }

    /*
     * Changes the current page.
     */
    function showPage(pageNumber, direction = "forward", animate = true) {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }

        if (isAnimating && animate) {
            return;
        }

        currentPage = pageNumber;

        if (animate && bookPage) {
            isAnimating = true;

            bookPage.classList.remove(
                "is-turning-forward",
                "is-turning-backward"
            );

            void bookPage.offsetWidth;

            if (direction === "backward") {
                bookPage.classList.add("is-turning-backward");
            } else {
                bookPage.classList.add("is-turning-forward");
            }

            setTimeout(() => {
                isAnimating = false;
                bookPage.classList.remove(
                    "is-turning-forward",
                    "is-turning-backward"
                );
            }, 650);
        }

        loadImage(bookImage, currentPage);
        updateControls();
    }

    /*
     * Creates all 19 gallery thumbnails.
     */
    function createGallery() {
        gallery.innerHTML = "";

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
            const thumbnailButton = document.createElement("button");
            thumbnailButton.type = "button";
            thumbnailButton.className = "adventure-gallery-item";
            thumbnailButton.dataset.page = String(pageNumber);
            thumbnailButton.setAttribute(
                "aria-label",
                `Open adventure project page ${pageNumber}`
            );

            const thumbnailImage = document.createElement("img");
            thumbnailImage.loading = "lazy";
            thumbnailImage.alt = `Adventure project thumbnail ${pageNumber}`;

            const numberLabel = document.createElement("span");
            numberLabel.className = "adventure-gallery-number";
            numberLabel.textContent = String(pageNumber);

            const candidates = getImageCandidates(pageNumber);
            let candidateIndex = 0;

            thumbnailImage.onerror = () => {
                candidateIndex += 1;

                if (candidateIndex < candidates.length) {
                    thumbnailImage.src = candidates[candidateIndex];
                } else {
                    thumbnailImage.removeAttribute("src");
                    thumbnailImage.alt = `Image ${pageNumber} not found`;
                }
            };

            thumbnailImage.src = candidates[candidateIndex];

            thumbnailButton.appendChild(thumbnailImage);
            thumbnailButton.appendChild(numberLabel);
            gallery.appendChild(thumbnailButton);

            thumbnailButton.addEventListener("click", () => {
                const selectedPage = Number(thumbnailButton.dataset.page);

                if (selectedPage > currentPage) {
                    showPage(selectedPage, "forward", true);
                } else if (selectedPage < currentPage) {
                    showPage(selectedPage, "backward", true);
                } else {
                    showPage(selectedPage, "forward", false);
                }
            });
        }

        updateActiveThumbnail();
    }

    /*
     * Opens the collection.
     */
    function openCollection() {
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("collection-is-open");

        showPage(1, "forward", false);

        window.setTimeout(() => {
            if (closeButton) {
                closeButton.focus();
            }
        }, 50);
    }

    /*
     * Closes the collection.
     */
    function closeCollection() {
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("collection-is-open");

        if (openButton) {
            openButton.focus();
        }
    }

    /*
     * Button events.
     */
    if (openButton) {
        openButton.addEventListener("click", openCollection);
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeCollection);
    }

    if (previousButton) {
        previousButton.addEventListener("click", () => {
            if (currentPage > 1) {
                showPage(currentPage - 1, "backward", true);
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            if (currentPage < totalPages) {
                showPage(currentPage + 1, "forward", true);
            }
        });
    }

    /*
     * Close when clicking the dark area outside the panel.
     */
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeCollection();
        }
    });

    /*
     * Keyboard controls.
     */
    document.addEventListener("keydown", (event) => {
        const isOpen = overlay.getAttribute("aria-hidden") === "false";

        if (!isOpen) {
            return;
        }

        if (event.key === "Escape") {
            closeCollection();
        }

        if (event.key === "ArrowLeft" && currentPage > 1) {
            showPage(currentPage - 1, "backward", true);
        }

        if (event.key === "ArrowRight" && currentPage < totalPages) {
            showPage(currentPage + 1, "forward", true);
        }
    });

    /*
     * Initialize.
     */
    createGallery();
    showPage(1, "forward", false);
})();