const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')

function displayItems(){
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(item => {
    onAddItemtoDOM(item);
    checkUi();
  })
}



function onAddItemSubmit(e){
  e.preventDefault();
  const newItem = itemInput.value;
  // Validate input
  if(newItem === ''){
    alert('Add an item');
    return
  }
  // Create item DOM element
  onAddItemtoDOM(newItem);
  // Add item to local storage
  addItemtoStorage(newItem);
  checkUi();


  itemInput.value = ''
}

function onAddItemtoDOM(item){
  // Create new list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}


function createButton(classes){
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes){
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItemtoStorage(item){
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);
// Convert array to string
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage(){
  let itemsFromStorage;
  if(localStorage.getItem('items') === null){
    itemsFromStorage = [];
  }else{
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
  }

  return itemsFromStorage;
}

function removeItem(e){
  if(e.target.parentElement.classList.contains('remove-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove()

      checkUi()

    }
  }


}

function clearItems(e){
  while(itemList.firstChild){
   itemList.removeChild(itemList.firstChild)
  }

  checkUi()
}

function filterItems(e){
  const items = document.querySelectorAll('li')
  const text = e.target.value.toLowerCase();

  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase();


    if(itemName.indexOf(text) != -1){
      item.style.display = 'flex'

    }else{
      item.style.display = 'none'
    }
  })
}

function checkUi(){
 const items = document.querySelectorAll('li')
 if(items.length === 0){
  clearBtn.style.display = 'none'
  itemFilter.style.display = 'none'
 }else{
  clearBtn.style.display = 'block'
  itemFilter.style.display = 'block'
 }
}

// Initialize app

function init (){

  // Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', removeItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems())

  checkUi();
}

init();

