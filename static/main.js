function addItem(e){
  if (e.which == 13 || e.keyCode == 13){
    let item = document.querySelector('.new-todo');
    fetch('/add-todo', {
      method: 'post',
      body: JSON.stringify({
        id: `item-${Date.now()}`,
        value: item.value,
        completed: 0
      })
    })
    .then(resp => {
      item.value = ''
    });
  }
}

function removeItem(id){
  fetch(`/remove-todo/${id}`);
}

function toggleComplete(elem){
  let id = elem.dataset.id,
      completed = (elem.dataset.completed == "1" ? "0" : "1");
  fetch(`/update-todo/${id}`, {
    method: 'post',
    body: JSON.stringify({ completed })
  });
}

function appendToList(data){
  let html = `
    <li id="${data.id}">
      <div class="view">
        <input class="toggle" type="checkbox" onclick="toggleComplete(this)"
          data-completed="${data.completed}" data-id="${data.id}">
        <label>${data.value}</label>
        <button class="destroy" onclick="removeItem('${data.id}')"></button>
      </div>
    </li>
  `
  let list = document.querySelector('.todo-list')
  list.innerHTML += html
}