const components = [];
const files = require.context("../../views",true,/\.js$/);

files.keys().map( item=>{  
  if(item.includes("./Index")||item.includes("./login")){
    return false;
  }
  const jsonObj = {};
  const path = `/index${item.split('.')[1]}`.toLowerCase();
  const component = files(item).default;
  jsonObj.path = path;
  jsonObj.component = component;
  components.push(jsonObj);
  return '';
})
export default components;