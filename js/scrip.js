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
  
/* =====================================================
   FIXED SAMURAI LOADING SCREEN
===================================================== */

(function () {
    function initializeLoadingScreen() {
        const screen = document.getElementById("loading-screen");

        if (!screen) return;

        const fill = screen.querySelector(".loading-progress-fill");
        const percent = document.getElementById("loading-percent");
        const status = document.getElementById("loading-status-text");
        const bar = screen.querySelector(".loading-progress");

        let progress = 0;
        let dismissed = false;

        function hideScreen() {
            if (dismissed) return;
            dismissed = true;

            if (fill) fill.style.width = "100%";
            if (percent) percent.textContent = "100%";
            if (bar) bar.setAttribute("aria-valuenow", "100");
            if (status) status.textContent = "READY TO DOMINATE";

            screen.classList.add("hide");

            // Remove overlay from interaction after fade-out.
            window.setTimeout(function () {
                if (screen.parentNode) {
                    screen.style.display = "none";
                }
            }, 1000);
        }

        // Progress animation independent of window.load.
        const progressTimer = window.setInterval(function () {
            if (dismissed) {
                window.clearInterval(progressTimer);
                return;
            }

            progress = Math.min(progress + 4, 90);

            if (fill) fill.style.width = progress + "%";
            if (percent) percent.textContent = progress + "%";
            if (bar) bar.setAttribute("aria-valuenow", String(progress));

            if (status) {
                status.textContent =
                    progress < 35 ? "IGNITING THE EXPERIENCE" :
                    progress < 70 ? "LOADING PORTFOLIO" :
                    "PREPARING YOUR EXPERIENCE";
            }
        }, 100);

        // Do not wait indefinitely for every resource to finish.
        window.setTimeout(hideScreen, 2500);
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeLoadingScreen,
            { once: true }
        );
    } else {
        initializeLoadingScreen();
    }
})();

});