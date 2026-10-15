
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PORTFOLIO PARTICLE BACKGROUND
    ===================================================== */

    document.body.classList.add("portfolio-particles-bg");


    /* =====================================================
       LOAD SHARED NAVIGATION
    ===================================================== */

    const navigation = document.getElementById("navigation");

    if (navigation) {

        fetch("../components/navigation.html")

            .then(function (response) {

                if (!response.ok) {
                    throw new Error("Unable to load navigation.html");
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

                console.error("Navigation Error:", error);

                initializeTheme();
                initializeVisitorCounter();

            });

    } else {

        initializeTheme();
        initializeVisitorCounter();

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function setActiveNavigation() {

        const links = document.querySelectorAll(".side-nav a");
        const currentPage = window.location.pathname;

        links.forEach(function (link) {

            try {

                const linkPage = new URL(
                    link.href,
                    window.location.href
                ).pathname;

                link.classList.remove("active");

                if (currentPage === linkPage) {
                    link.classList.add("active");
                }

            } catch (error) {

                console.error("Navigation Link Error:", error);

            }

        });

    }


    /* =====================================================
       LIGHT MODE / DARK MODE
       SINGLE INITIALIZATION
    ===================================================== */

    function initializeTheme() {

        const themeToggle = document.getElementById("themeToggle");

        if (!themeToggle) {
            console.warn("Theme toggle button not found.");
        }

        let themeIcon = document.querySelector(".theme-icon");

        let savedTheme = "light";

        try {
            savedTheme = localStorage.getItem("theme") || "light";
        } catch (error) {
            console.warn("Theme storage is unavailable.", error);
        }

        function updateThemeIcon() {

            themeIcon = document.querySelector(".theme-icon");

            if (themeIcon) {
                themeIcon.textContent =
                    document.body.classList.contains("dark") ? "☀" : "☾";
            }

        }

        function applyTheme(theme) {

            const isDark = theme === "dark";

            document.body.classList.toggle("dark", isDark);

            /* Update the theme button and icon */

            if (themeToggle) {

                themeToggle.setAttribute(
                    "aria-label",
                    isDark ? "Switch to light mode" : "Switch to dark mode"
                );

                themeToggle.setAttribute(
                    "title",
                    isDark ? "Switch to light mode" : "Switch to dark mode"
                );

                themeToggle.setAttribute(
                    "aria-pressed",
                    String(isDark)
                );

            }

            updateThemeIcon();

            /* Save selected theme */

            try {

                localStorage.setItem(
                    "theme",
                    isDark ? "dark" : "light"
                );

            } catch (error) {

                console.warn("Unable to save theme preference.", error);

            }

        }

        /* Apply the saved theme */

        applyTheme(savedTheme === "dark" ? "dark" : "light");

        /* Register only one click handler */

        if (themeToggle && !themeToggle.dataset.themeInitialized) {

            themeToggle.dataset.themeInitialized = "true";

            themeToggle.addEventListener("click", function () {

                const isDark =
                    document.body.classList.contains("dark");

                applyTheme(isDark ? "light" : "dark");

            });

        }

    }


    /* =====================================================
       VISITOR COUNTER
    ===================================================== */

    function initializeVisitorCounter() {

        const visitorCount = document.getElementById("visitorCount");

        if (!visitorCount) {
            return;
        }

        const counterKey = "maedein_john_portfolio_visitors_2026";

        fetch(
            "https://countapi.mileshilliard.com/api/v1/hit/" +
            counterKey
        )

            .then(function (response) {

                if (!response.ok) {
                    throw new Error("Visitor counter request failed");
                }

                return response.json();

            })

            .then(function (data) {

                if (data && data.value !== undefined) {

                    visitorCount.textContent =
                        Number(data.value).toLocaleString();

                }

            })

            .catch(function (error) {

                console.error("Visitor Counter Error:", error);

                visitorCount.textContent = "0";

            });

    }


    /* =====================================================
       SAMURAI LOADING SCREEN
    ===================================================== */

    (function initializeLoadingScreen() {

        const screen = document.getElementById("loading-screen");

        if (!screen) {
            return;
        }

        const fill = screen.querySelector(".loading-progress-fill");
        const percent = document.getElementById("loading-percent");
        const status = document.getElementById("loading-status-text");
        const bar = screen.querySelector(".loading-progress");

        let progress = 0;
        let dismissed = false;

        function hideScreen() {

            if (dismissed) {
                return;
            }

            dismissed = true;

            if (fill) {
                fill.style.width = "100%";
            }

            if (percent) {
                percent.textContent = "100%";
            }

            if (bar) {
                bar.setAttribute("aria-valuenow", "100");
            }

            if (status) {
                status.textContent = "READY TO DOMINATE";
            }

            screen.classList.add("hide");

            window.setTimeout(function () {

                if (screen.parentNode) {
                    screen.style.display = "none";
                }

            }, 1000);

        }

        /* Loading progress animation */

        const progressTimer = window.setInterval(function () {

            if (dismissed) {
                window.clearInterval(progressTimer);
                return;
            }

            progress = Math.min(progress + 4, 90);

            if (fill) {
                fill.style.width = progress + "%";
            }

            if (percent) {
                percent.textContent = progress + "%";
            }

            if (bar) {
                bar.setAttribute(
                    "aria-valuenow",
                    String(progress)
                );
            }

            if (status) {

                status.textContent =
                    progress < 35
                        ? "IGNITING THE EXPERIENCE"
                        : progress < 70
                            ? "LOADING PORTFOLIO"
                            : "PREPARING YOUR EXPERIENCE";

            }

        }, 100);

        /* Hide after 2.5 seconds */

        window.setTimeout(hideScreen, 2500);

    })();

});
