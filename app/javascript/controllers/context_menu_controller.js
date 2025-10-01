import { Controller } from "@hotwired/stimulus"
import "@hotwired/turbo-rails"
import "controllers"

// Connects to data-controller="context-menu"
export default class extends Controller {
  static targets = ["menu"]

  connect() {
    document.addEventListener("contextmenu", (e) => this.showMenu(e))
    document.addEventListener("click", () => this.hideMenu())
  }

  showMenu(event) {
    const target = event.target.closest("li[data-item-id]")
    if (!target) return

    event.preventDefault()

    const itemId = target.dataset.itemId
    this.menuTarget.style.top = `${event.pageY}px`
    this.menuTarget.style.left = `${event.pageX}px`
    this.menuTarget.style.display = "block"
    this.menuTarget.dataset.itemId = itemId
  }

  hideMenu() {
    this.menuTarget.style.display = "none"
  }

  edit() {
    const id = this.menuTarget.dataset.itemId
    if (confirm("Are you sure?")) {
      fetch(`/items/${id}`, {
        method: "DELETE",
        headers: { "X-CSRF-Token": document.querySelector("[name='csrf-token']").content }
      }).then(() => window.location.reload())
    }
  }
}
