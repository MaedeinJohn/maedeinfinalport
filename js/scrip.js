document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       LOAD SHARED NAVIGATION
    ===================================================== */

    const navigation =
        document.getElementById("navigation");


    if (!navigation) {

        console.log(
            "Navigation container not found."
        );

        return;

    }


    fetch("../components/navigation.html")

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Unable to load navigation.html"
                );

            }

            return response.text();

        })


        .then(function (data) {

            /*
             * Insert navigation into the page
             */

            navigation.innerHTML = data;


            /*
             * Set active navigation
             */

            setActiveNavigation();


            /*
             * Initialize dark mode
             */

            initializeTheme();

        })


        .catch(function (error) {

            console.error(
                "Navigation Error:",
                error
            );

        });



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function setActiveNavigation() {


        const links =
            document.querySelectorAll(
                ".side-nav a"
            );


        const currentPage =
            window.location.pathname;


        links.forEach(function (link) {


            const linkPage =
                new URL(
                    link.href,
                    window.location.href
                ).pathname;


            /*
             * Remove active first
             */

            link.classList.remove(
                "active"
            );


            /*
             * Add active to current page
             */

            if (
                currentPage === linkPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }



    /* =====================================================
       DARK MODE
    ===================================================== */

    function initializeTheme() {


        const themeToggle =
            document.getElementById(
                "themeToggle"
            );


        const themeIcon =
            document.querySelector(
                ".theme-icon"
            );


        /*
         * Get saved theme
         */

        const savedTheme =
            localStorage.getItem(
                "theme"
            );


        /*
         * Load dark mode
         */

        if (
            savedTheme === "dark"
        ) {

            document.body.classList.add(
                "dark"
            );


            if (themeIcon) {

                themeIcon.textContent =
                    "☀";

            }

        }



        /* =================================================
           TOGGLE DARK MODE
        ================================================= */

        if (themeToggle) {


            themeToggle.addEventListener(
                "click",
                function () {


                    document.body.classList.toggle(
                        "dark"
                    );


                    const isDark =
                        document.body.classList.contains(
                            "dark"
                        );


                    if (isDark) {


                        if (themeIcon) {

                            themeIcon.textContent =
                                "☀";

                        }


                        localStorage.setItem(
                            "theme",
                            "dark"
                        );


                    } else {


                        if (themeIcon) {

                            themeIcon.textContent =
                                "☾";

                        }


                        localStorage.setItem(
                            "theme",
                            "light"
                        );

                    }

                }
            );

        }

    }

});