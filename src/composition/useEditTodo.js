import * as todoStorage from '../util/todoStorage'
import { ref, watchEffect, computed } from 'vue'
// import {deleteTodo} from './useDelete'
export default function(todosRef){
    // let editingTodo = ref({});
    // const editing = (todo)=>{
    //     editingTodo.value = todo;
    // }
    // const editingTextRef = ref("");
    // const changeTodo = ()=>{
    //     editingTodo.title = editingTextRef.value;
    // }
    // return {
    //     editingTodo,
    //     editing,
    //     changeTodo,
    //     editingTextRef
    // }
    const editingTodo = ref({});
    const originTitle = ref("");//取消编辑就提前记录原来title

    const editing = (todo)=>{
        editingTodo.value = todo;
        originTitle.value = todo.title;
    }
    const editTodoTitle = (todo)=>{
        if(todo.title == ""){
            deleteTodo(todo.id)
        }
        editingTodo.value = '';//编辑完就不聚焦输入框
    }
    const cancelEditTodo = (todo)=>{
        editingTodo.value.title = originTitle.value;
        editingTodo.value = '';//编辑完就不聚焦输入框
    }
    return {
        editingTodo,
        editing,
        editTodoTitle,
        cancelEditTodo
    }
}