const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');
const items = [];

const displayItems = () => {
  const html = items
    .map((item) => `<li>${item.itemName}</li>`)
    .join('');
  list.innerHTML = html;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const itemName = e.currentTarget.item.value;
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
  displayItems();
  console.log(`You have ${items.length} items in your basket.`);
};

shoppingForm.addEventListener('submit', handleSubmit);
