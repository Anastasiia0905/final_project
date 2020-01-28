import filterFunc from './filterFunc'
import {render} from '../renderModules/render'
export const filterForVideo = (e, obj) => {
    if(e.tagName === 'SELECT'){
        filterFunc(e, obj)
            .then(selected => render(selected))
            .catch(error => console.log(error))
    } else if(e.tagName == 'INPUT'){
        let sortO = obj;
        if(e.checked){
          sortO.sort((a, b) =>{
            if (a.duration > b.duration) {
              return 1;
            }
            if (a.duration < b.duration) {
              return -1;
            }
            return 0;
          });
           render(sortO);
        } else {
          sortO.sort((a, b) =>{
            if (a.duration < b.duration) {
              return 1;
            }
            if (a.duration > b.duration) {
              return -1;
            }
            // a должно быть равным b
            return 0;
          });
           render(sortO); 
        }
       
    }
}