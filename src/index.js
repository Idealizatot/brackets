module.exports = function check(str, bracketsConfig) {
  const bracketsTypes = bracketsConfig.reduce((bracketsTypes, bracketsArray) => {
    bracketsTypes[bracketsArray[0]] = {close : bracketsArray[1]};
    if (bracketsArray[0] === bracketsArray[1]) {
      bracketsTypes[bracketsArray[0]].double = true;
    }
    
    return bracketsTypes;
  }, []);

  let bracketsStack = [];
  let flag = true;
  str.split('').forEach(element => {
    if(element in bracketsTypes && !bracketsTypes[element].double) {
      bracketsStack.push(element)
    } else if (
        bracketsTypes[element]
        && bracketsTypes[element].double
        && bracketsStack.length 
        && bracketsStack[bracketsStack.length - 1] === element) 
      {
      bracketsStack.pop()
    } else if (bracketsTypes[element] && bracketsTypes[element].double ) {
      bracketsStack.push(element)
    } else {
      let lastElement = bracketsStack.pop()
      if (!bracketsTypes[lastElement] || bracketsTypes[lastElement].close !== element) {
        if (bracketsTypes[lastElement] && bracketsTypes[lastElement].double) {
          bracketsStack.push(element)
        } else {
          flag = false
        }
      }
    }
  });

  if (bracketsStack.length) {
    flag = false
  }

  return flag
}