



export default function useMyHook(){


  function addNumbers(num1, num2){
    return num1 + num2;
  }

  return {
    addNumbers
  }


}