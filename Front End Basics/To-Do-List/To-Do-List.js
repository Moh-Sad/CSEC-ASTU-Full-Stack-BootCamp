function addTask() {
    var task = document.querySelector('#note-input').value;
    var ul = document.querySelector('#task-list');
    var li = document.createElement('li');
    li.innerHTML = task;
    ul.appendChild(li);
}
document.querySelector('#add-button').onclick = function() {
    this.querySelector('.container').
}