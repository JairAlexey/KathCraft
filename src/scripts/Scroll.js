document.addEventListener("astro:page-load", () => {
    const hash = window.location.hash;
    if (hash) {
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }
});