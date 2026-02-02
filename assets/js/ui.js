document.addEventListener("click", (e) => {

    // Toggle sidebar al hacer click en la hamburguesa
    if (e.target.closest(".menu-toggle")) {
        e.stopPropagation();
        document.body.classList.toggle("sidebar-open");
        return;
    }

    // Cerrar sidebar al hacer click fuera
    if (
        document.body.classList.contains("sidebar-open") &&
        !e.target.closest("#sidebar")
    ) {
        document.body.classList.remove("sidebar-open");
    }
});
