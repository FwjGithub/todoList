import * as todoStorage from '../util/todoStorage'
import { ref, watchEffect, computed, onMounted, onUnmounted } from 'vue'
const filterTypes = ["all", "active", "completed"]
export default function useCompleted(todosRef){
    

    onMounted( ()=>{
        window.addEventListener("hashchange", onHashChange)

    });
    onUnmounted(()=>{
        window.removeEventListener("hashchange", onHashChange)
    });
    const nowHashRef = ref("all");
    const onHashChange = () =>{
        let hash = location.hash.replace(/#\/?/g,"");
        if(!filterTypes.includes(hash)){
            hash = "all";//如果锚点不包含在all和active或者completed之间就默认为all
            location.hash = "";
        }
        nowHashRef.value = hash;
    };
    //计算苏醒filterTodosRef跟随nowHashRef.value的变化而变化
    const filterTodosRef = computed( () => {
        return todosRef.value.filter(todo => {
            if(nowHashRef.value === "all"){
                return 1;
            }else if(nowHashRef.value === "active"){
                return todo.completed === false;
            }else if(nowHashRef.value === "completed"){
                return todo.completed === true;
            }
        });
    });
    

    const activeTodosLen = computed(()=>{
        return todosRef.value.filter(todo => {
            return todo.completed === false;
        }).length;
    })

    const completedTodosLen = computed(()=>{
        return todosRef.value.filter(todo =>{
            return todo.completed === true;
        }).length;
    })

    const completedAllTodos = computed({
        get(){
            return todosRef.value.filter(todo =>{
                return todo.completed === true;
            }).length === todosRef.value.length;
        },
        set(checked){
            todosRef.value.forEach(todo => {
                todo.completed = checked;
            });
        }
    })

    return {
        nowHashRef,
        filterTodosRef,
        activeTodosLen,
        completedTodosLen,
        completedAllTodos
    }
}