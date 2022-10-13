const shoppingForm = document.querySelector(".shopping");
const list = document.querySelector(".list");
let items = [];

const sendToLocalStorage = () => {
  localStorage.setItem("items", JSON.stringify(items));
};

const getFromLocalStorage = () => {
  const localStorageItems = JSON.parse(localStorage.getItem("items"));
  if (localStorageItems.length) {
    // Spread items from local storage into state
    items.push(...localStorageItems);
    list.dispatchEvent(new CustomEvent("itemsUpdated"));
  }
};

const markAsComplete = (id) => {
  const itemRef = items.find((item) => item.id === id);
  // Toggle item.complete on click
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
};

const deleteItem = (id) => {
  items = items.filter((item) => item.id !== id);
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
};

const displayItems = () => {
  const html = items
    .map(
      (item) => `
      <li class="flex items-center mb-2">
        <input
        type="checkbox"
        ${item.complete && "checked"}
        value="${item.id}"
        class="mr-4">
        <span class="flex-1 ${item.complete && "opacity-40"}">
        ${item.itemName}
        </span>
        <button aria-label="Remove ${item.itemName}" value="${item.id}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 hover:fill-red-200">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </li>`
    )
    .join("");
  list.innerHTML = html;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const itemName = e.currentTarget.item.value;
  // Don't react to an empty submission.
  if (!itemName) return;
  const item = {
    itemName,
    // Date.now() is unique every millisecond...
    id: Date.now(),
    complete: false,
  };
  // Push items into state.
  items.push(item);
  // Clear the input field.
  e.currentTarget.reset();
  // Custom event...
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
};

shoppingForm.addEventListener("submit", handleSubmit);
list.addEventListener("itemsUpdated", displayItems);
list.addEventListener("itemsUpdated", sendToLocalStorage);
// Use event delegation to handle item deletion.
list.addEventListener("click", (e) => {
  // .closest() queries whether parent is a button, in case SVG is clicked.
  if (e.target.closest("button")) {
    deleteItem(parseInt(e.target.closest("button").value, 10));
  }
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(parseInt(e.target.value, 10));
  }
});

getFromLocalStorage();
