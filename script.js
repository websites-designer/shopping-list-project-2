const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems(){
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach(item => addItemToDOM(item))
}


function OnAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  // Validate Input
  if (newItem === '') {
    alert('please add an item');
    return;
  }

  addItemToDOM(newItem);
  addItemToStorage(newItem);
  checkUI();
}

function addItemToDOM(item) {
  // Create list item

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);

  itemInput.value = '';
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage ;
 
}

function onClickItem(e){
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement)
    removeItemFromStorage(e.target.parentElement.parentElement)
  }
}

function removeItemFromStorage(removedItem){
  const itemsFromStorage = getItemFromStorage();
  const filteredItems = itemsFromStorage.filter(item => item !== removedItem.firstChild.textContent)
  localStorage.setItem('items' , JSON.stringify(filteredItems));
}

function removeItem(item) {
    if (confirm('Are you sure you want to delete the element ? ')) {
      item.remove();
    }
  checkUI();
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  localStorage.removeItem('items');
  checkUI();
}

function filterItems(e) {
  const items = Array.from(itemList.querySelectorAll('li'));
  const text = e.target.value.toLowerCase();
  items.forEach((ele) => {
    if (ele.firstChild.textContent.toLowerCase().includes(text)) {
      ele.style.display = 'flex';
    } else {
      ele.style.display = 'none';
    }
  });
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function checkUI() {
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearButton.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Event Listeners

itemForm.addEventListener('submit', OnAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearButton.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
displayItems();
checkUI();
