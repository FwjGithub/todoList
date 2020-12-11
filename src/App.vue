<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keydown.enter="addNewTodo"
        />
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox"  v-model="completedAllTodos" />
        <label for="toggle-all" v-show="todosRef.length != 0" >Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            v-for="todo in filterTodosRef"
            :key="todo.id"
            :class="{
              completed: todo.completed,
              editing: editingTodo === todo
            }"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editing(todo)">{{todo.title}}</label>
              <button class="destroy" @click="deleteTodo(todo.id)"></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="todo.title"
              @blur="todo.title == ''? deleteTodo(todo.id):editTodoTitle(todo)"
              @keydown.enter="todo.title == ''? deleteTodo(todo.id):editTodoTitle(todo)"
              @keydown.esc="cancelEditTodo(todo)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer"  v-show="todosRef.length != 0"  >
        <span class="todo-count">
          <strong>{{ activeTodosLen }}</strong>
          <span>item{{ activeTodosLen > 1 ? "s":""}} left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{selected: nowHashRef === 'all'}">All</a>
          </li>
          <li>
            <a href="#/active" :class="{selected: nowHashRef === 'active'}">Active</a>
          </li>
          <li>
            <a href="#/completed" :class="{selected: nowHashRef === 'completed'}">Completed</a>
          </li>
        </ul>
        <button
          class="clear-completed"
          @click="deleteCompletedTodos"
          v-show="completedTodosLen"
        >Clear completed</button>
      </footer>
    </section>
  </div>
</template>
<script>
import usetodoList from "./composition/usetodoList";
import useNewTodo from "./composition/useNewTodo";
import useCompleted from "./composition/useCompleted";
import useDelete from "./composition/useDelete";
import useEditTodo from "./composition/useEditTodo";

export default {
  setup() {
    const { todosRef } = usetodoList();
    return {
      todosRef,
      ...useNewTodo(todosRef),
      ...useCompleted(todosRef),
      ...useDelete(todosRef),
      ...useEditTodo(todosRef)
    };
  }
};
</script>
