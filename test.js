let str = 'Hello World'

function length(string) {
 const obj ={}
 string.split("").map(lett => {
  if(obj[lett.toLowerCase()]){
    obj[lett.toLowerCase()] += 1; 
  } else {    
    obj[lett.toLowerCase()] = 1;
  }
 })
 return obj;
}
console.log('====================================');
console.log(length(str));
console.log('====================================');

function removeEmptyKeys(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] === "object") {
        removeEmptyKeys(obj[prop]);
      } else if (
        obj[prop] === null ||
        obj[prop] === undefined ||
        obj[prop] === ""
      ) {
        delete obj[prop];
      }
    }
  }
  return obj;
}

// Example usage:
var nestedObject = {
  key1: "",
  key2: "value",
  key3: {
    key4: "nested_value",
    key5: "",
  },
};

var cleanedObject = removeEmptyKeys(nestedObject);
console.log(cleanedObject);
