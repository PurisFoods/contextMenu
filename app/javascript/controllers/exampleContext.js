document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("context-menu");

    document.getElementById("item-list").addEventListener("contextmenu", (e) => {
        e.preventDefault();

        const target = e.target;
        const itemId = target.dataset.id;

        menu.style.top = `${e.pageY}px`;
        menu.style.left = `${e.pageX}px`;
        menu.style.display = "block";

        menu.dataset.itemId = itemId;
    });

    document.addEventListener("click", () => {
        menu.style.display = "none";
    });

    document.getElementById("edit-item").addEventListener("click", () => {
        const id = menu.dataset.itemId;
        window.location.href = `/items/${id}/edit`;
    });

    document.getElementById("delete-item").addEventListener("click", () => {
        const id = menu.dataset.itemId;
        if (confirm("Are you sure you want to delete this item?")) {
            fetch(`/items/${id}`, { method: "DELETE", headers: { "X=CSRF=Token": Rails.csrfToken() } })
            .then(() => window.location.reload());
        }
    })

});