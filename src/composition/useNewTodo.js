import * as todoStorage from '../util/todoStorage'
import { ref, watchEffect } from 'vue'


export default function(todosRef){
    const newTodoRef = ref("");
    const addNewTodo = ()=>{
        const value = newTodoRef.value && newTodoRef.value.trim();
        if(!value){
            return;
        }else{
            // console.log("newtodo:todosref.value:",todosRef.value);
            const newTodoObj = {
                id: todoStorage.generateId(),
                title: value,
                completed: false
            }
            console.log("object:", newTodoObj);
            todosRef.value.push(newTodoObj);
            newTodoRef.value = "";
        }
    }


    return {
        newTodoRef,
        addNewTodo
    }
}