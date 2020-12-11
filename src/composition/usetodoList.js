import * as todoStorage from '../util/todoStorage'
import { ref, watchEffect } from 'vue'


export default function(to){
    const todosRef = ref(todoStorage.fetch());
    //如果todosref的值有改变就保存到storage中
    watchEffect(()=>{
        // console.log("watcheffect检测到todosRef改变", todosRef.value);
        todoStorage.save(todosRef.value);
        // console.log("todosRef改变后的localStorage：",todoStorage.fetch());
    })
    return {
        todosRef
    }
}