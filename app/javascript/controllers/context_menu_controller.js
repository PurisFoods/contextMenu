import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="context-menu"
// This controller shows a context menu when a user right-clicks on an element
// with a `data-context-menu-target-param` attribute.
// The menu's links (`data-context-menu-url-template`) are updated with the item's ID.
export default class extends Controller {
  static targets = ["menu"]
  static values = {
    target: String // A selector for clickable items, e.g., "li"
  }

  connect() {
    // Hide menu when clicking elsewhere
    document.addEventListener("click", (e) => {
      if (!this.element.contains(e.target)) {
        this.hideMenu()
      }
    })
    this.element.addEventListener("contextmenu", (e) => this.showMenu(e))
  }

  disconnect() {
    // Clean up event listeners
    document.removeEventListener("click", this.hideMenu)
    this.element.removeEventListener("contextmenu", this.showMenu)
  }

  showMenu(event) {
    // Find the right-clicked item
    const targetElement = event.target.closest(this.targetValue)
    if (!targetElement || !targetElement.dataset.id) return

    event.preventDefault()
    const itemId = targetElement.dataset.id

    // Update links in the menu with the item's ID
    this.updateMenuLinks(itemId)

    // Position and show the menu
    this.menuTarget.style.top = `${event.pageY}px`
    this.menuTarget.style.left = `${event.pageX}px`
    this.menuTarget.style.display = "block"
  }

  hideMenu() {
    if (this.hasMenuTarget) {
      this.menuTarget.style.display = "none"
    }
  }

  updateMenuLinks(id) {
    this.menuTarget.querySelectorAll("[data-url-template]").forEach(link => {
      const urlTemplate = link.dataset.urlTemplate
      link.href = urlTemplate.replace("__ID__", id)
    })
  }
}
