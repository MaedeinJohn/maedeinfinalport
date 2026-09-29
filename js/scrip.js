document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LOAD SHARED NAVIGATION
    ===================================================== */

    const navigation =
        document.getElementById("navigation");

    if (navigation) {

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

                navigation.innerHTML = data;

                setActiveNavigation();

                initializeTheme();

                initializeVisitorCounter();

            })

            .catch(function (error) {

                console.error(
                    "Navigation Error:",
                    error
                );

            });

    } else {

        console.log(
            "Navigation container not found."
        );

    }


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

            link.classList.remove(
                "active"
            );

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

        const savedTheme =
            localStorage.getItem(
                "theme"
            );


        /* =================================================
           LOAD SAVED THEME
        ================================================= */

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

        } else {

            document.body.classList.remove(
                "dark"
            );

            if (themeIcon) {

                themeIcon.textContent =
                    "☾";

            }

        }


        /* =================================================
           THEME TOGGLE
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


    /* =====================================================
       VISITOR COUNTER
    ===================================================== */

    function initializeVisitorCounter() {

        const visitorCount =
            document.getElementById(
                "visitorCount"
            );


        if (!visitorCount) {

            return;

        }


        const counterKey =
            "maedein_john_portfolio_visitors_2026";


        fetch(
            "https://countapi.mileshilliard.com/api/v1/hit/" +
            counterKey
        )

            .then(function (response) {

                if (!response.ok) {

                    throw new Error(
                        "Visitor counter request failed"
                    );

                }

                return response.json();

            })

            .then(function (data) {

                if (
                    data &&
                    data.value !== undefined
                ) {

                    visitorCount.textContent =
                        Number(
                            data.value
                        ).toLocaleString();

                }

            })

            .catch(function (error) {

                console.error(
                    "Visitor Counter Error:",
                    error
                );

                visitorCount.textContent =
                    "0";

            });

    }


    /* =====================================================
       PORTFOLIO LOADING SCREEN
    ===================================================== */

    const loadingScreen =
        document.getElementById(
            "loading-screen"
        );


    if (loadingScreen) {

        window.addEventListener(
            "load",
            function () {

                setTimeout(
                    function () {

                        loadingScreen.classList.add(
                            "hide"
                        );

                    },
                    2200
                );

            }
        );

    }

});