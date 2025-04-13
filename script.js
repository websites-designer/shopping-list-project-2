const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');



function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  // Validate Input
  if (newItem === '') {
    alert('please add an item');
    return;
  }

  // Create list item

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);

  itemInput.value = '';
  checkUI();
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if(confirm('Are you sure you want to delete the element ? ')){
    e.target.parentElement.parentElement.remove();
    }
}
  checkUI();
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  checkUI()
}

function filterItems(e){
    const items = Array.from(itemList.querySelectorAll('li'));
    const text = e.target.value.toLowerCase() ;
    items 
  .forEach(ele => {
    if(ele.firstChild.textContent.toLowerCase().includes(text)){
        ele.style.display = 'flex'
    }else{
        ele.style.display = 'none'
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
}else{
    clearButton.style.display = 'block';
    itemFilter.style.display = 'block';
}
}

// Event Listeners

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems)
checkUI();