const express = require("express");
const pool = require("./db");
const { join } = require("node:path");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error");
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { task_name } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todos (task_name) VALUES ($1) RETURNING *",
      [task_name],
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Có lỗi xảy ra khi nhận thêm dữ liệu");
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTodo = await pool.query("DELETE FROM todos WHERE id = $1", [
      id,
    ]);
    res.json("Công việc đã được xoá thành công");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Có lỗi xảy ra khi xóa");
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { is_completed } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todos SET is_completed = ($1) WHERE id = ($2)",
      [is_completed, id],
    );
    res.json("Công việc đã được cập nhập");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Có lỗi xảy ra khi cập nhật");
  }
});

app.listen(3000, () => {
  console.log("Sever đang chạy tại port: http://localhost:3000/todos");
});
