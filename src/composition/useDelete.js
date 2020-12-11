export default function(todosRef){
    
    const deleteTodo = (todoId)=>{
        todosRef.value = todosRef.value.filter(todo => {
            return todo.id !== todoId;
        });
    }
    const deleteCompletedTodos = ()=>{
        todosRef.value = todosRef.value.filter(todo => !todo.completed);
        location.hash = "#/all";
    }
    return {
        deleteTodo,
        deleteCompletedTodos
    }
}