const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');
const items = [];

const sendToLocalStorage = () => {
  localStorage.setItem('items', JSON.stringify(items));
};

const getFromLocalStorage = () => {
  const localStorageItems = JSON.parse(localStorage.getItem('items'));
  if (localStorageItems.length) {
    // Spread items from local storage into state
    items.push(...localStorageItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
};

const displayItems = () => {
  const html = items
    .map(
      (item) => `
      <li class="flex items-center mb-2">
        <input type="checkbox" class="mr-4">
        <span class="flex-1">${item.itemName}</span>
        <button aria-label="Remove ${item.itemName}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </li>`
    )
    .join('');
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
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
};

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', sendToLocalStorage);

getFromLocalStorage();
