const LOCAL_TODOS = "todosList";

/**
 * fetch返回一个localstorage数组
 */
export function fetch(){
    const result =  localStorage.getItem(LOCAL_TODOS);
    if(result){
        return JSON.parse(result);
    }
    return [];
}

/**
 * save就是把todos数组保存到localstorage的todosList里面
 * @param {*} todos
 */
export function save(todos){
    localStorage.setItem(LOCAL_TODOS, JSON.stringify(todos));
}

/**
 * 得到一个唯一的id
 */
export function generateId(){
    return Date.now() + Math.random().toString(16).slice(2,5);
}