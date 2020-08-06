const taskForm = document.querySelector('#create-task-form')
const taskDescription = document.querySelector('#new-task-description')
const ul = document.querySelector('#tasks')
const priority = document.querySelector('#priority-selector')
const dueDate = document.querySelector('#due_date')
const filter = document.querySelector('#filter')

function createLi(el) {
  let li = document.createElement('li')
  li.setAttribute('priority', priority.value)
  li.setAttribute('due_date', dueDate.value)
  task = createTask(li)
  task = createDeleteButton(li)
  el.appendChild(li)
}

function createDeleteButton(el) {
  let deleteButton = document.createElement('button')
  deleteButton.textContent = 'X'
  deleteButton.addEventListener('click', deleteTask)
  el.appendChild(deleteButton)
}

function sort() {
  if (filter.value == 'p') {
    prioritySort()
  } else if (filter.value == 'd') {
    dateSort()
  }
}

function prioritySort() {
  let unSortedList = [...ul.children]
  let sortedList = unSortedList.slice().sort((a, b) => {
    return a.attributes.priority.value - b.attributes.priority.value
  })
  sortedList.forEach(el => ul.appendChild(el))
}

function dateSort() {
  let unSortedList = [...ul.children]
  let sortedList = unSortedList.slice().sort((a, b) => {
    return Date.parse(a.attributes.due_date.value) - Date.parse(b.attributes.due_date.value)
  })
  sortedList.forEach(el => ul.appendChild(el))
}

function createTask(el) {
  let task = document.createElement('span')
  let due = document.createElement('span')
  due.classList.add('due')
  task.textContent = `${taskDescription.value}`
  due.textContent = `(Due: ${dueDate.value})`
  task.setAttribute('contenteditable', true)
  el.appendChild(task)
  el.appendChild(due)
}

function deleteTask(e) {
  e.target.parentElement.remove()
}

function formSubmit(e) {
  e.preventDefault()
  createLi(ul)
  e.target.reset()
}

document.addEventListener('DOMContentLoaded', () => {
  taskForm.addEventListener('submit', formSubmit)
})
