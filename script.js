const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  // Validate Input
  if (newItem.trim() === '') {
    alert('Please add an item');
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

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure you want delete the item ? ')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
}

function clearAll(e) {
  if (confirm('Are you sure you want to delete everything ?')) {
    while (itemList.firstChild) {
      itemList.firstChild.remove();
    }
    checkUI();
  }
}

function checkUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Event Listener
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAll);

checkUI();

// function filter() {
//   const items = itemList.querySelectorAll('li');
//   items.forEach((e) => {
//     if (itemFilter.value.toLowerCase() !== e.textContent.substring(0,itemFilter.value.length).toLowerCase()){
//       e.style.display = 'none'
//     }else{
//       e.style.display = 'flex'
//     }
//   });
// }



function filter(){
  const items = itemList.querySelectorAll('li');
  items.forEach(e => !e.textContent.toLowerCase().startsWith(itemFilter.value.toLowerCase()) ? e.style.display = 'none' : e.style.display = 'flex')

}

// comment you can also use the indexOf() method to do the filter 

itemFilter.addEventListener('input', filter);
