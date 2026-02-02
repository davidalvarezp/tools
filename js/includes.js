function loadPartial(id, file) {
    fetch(file)
        .then(res => res.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
        })
        .catch(err => console.error(`Error loading ${file}`, err));
}

loadPartial("header", "/local-first-tools/partials/header.html");
loadPartial("sidebar", "/local-first-tools/partials/sidebar.html");
