export default async function likedFunc (e, obj,arr){
    console.log(e);
    if(e.checked){
        let selected = await obj.filter(item => arr.includes(item.id));
        return selected;
    } else if(!e.checked){
        return obj;
    }
}

