async function addTodo() {
  const input = document.getElementById("taskInput");
  const task_name = input.value;

  if (!task_name) return;

  const response = await fetch("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task_name }),
  });

  if (response.ok) {
    input.value = "";
    alert("Thêm thành công");
    location.reload();
  }
}

async function loadTodos() {
  const res = await fetch("/todos");
  const todos = await res.json();

  const list = document.getElementById("todoList");
  list.innerHTML = todos
    .map(
      (todo) => `
    <li>
      <input type="checkbox" ${todo.is_completed ? "checked" : ""} 
             onchange="updateTodo(${todo.id}, this.checked)">
             
      <span class="task-text" style="${todo.is_completed ? "text-decoration: line-through; color: #a0a0a0;" : ""}">
        ${todo.task_name}
      </span>

      <button class="delete-btn" onclick="deleteTodo(${todo.id})">Xóa</button>
    </li>
  `,
    )
    .join("");
}

async function deleteTodo(id) {
  await fetch(`/todos/${id}`, { method: "DELETE" });
  location.reload();
}

async function updateTodo(id, is_completed) {
  await fetch(`/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_completed }), // Gửi trạng thái mới lên server
  });
  // Không cần reload cũng được, nhưng reload cho chắc chắn dữ liệu đồng bộ
  location.reload();
}

loadTodos();
