
export default async function filterFunc (e, obj, objFromLocal){
    const filterParam = e.value;
    let selected = await obj.filter(item => item.genre == filterParam);
    if(selected == ''){return objFromLocal}
    else {
        return selected;
    }   
    
}