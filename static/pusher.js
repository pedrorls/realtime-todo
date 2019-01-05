Pusher.logToConsole = true;

const pusher = new Pusher('3f2308bde13a8c0c6b08', {
  cluster: 'us2',
  encrypted: true
});

const channel = pusher.subscribe('todo');

channel.bind('item-added', data => {
  appendToList(data);
});

channel.bind('item-removed', data => {
  let item = document.querySelector(`#${data.id}`);
  item.parentNode.removeChild(item);
});

channel.bind('item-update', data => {
  let elem = document.querySelector(`#${data.id} .toggle`);
  let item = document.querySelector(`#${data.id}`);
  item.classList.toggle('completed');
  elem.dataset.completed = data.completed;
  elem.checked = data.completed == 1;
});