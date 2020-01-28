export default async function getData(target){
    try {
        let response = await fetch(target);
        let data = await response.json();
        return data;
    } 
    catch(e){
        console.error('error', e.message);
    } 
};