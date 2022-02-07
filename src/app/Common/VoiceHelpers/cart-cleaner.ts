export default function cartCleaner(startsWith:string,inputs:string[]):boolean{
  const validInputs = inputs.
  map(i => i.trim().toLowerCase()).
  filter(x => x.includes(startsWith.toLowerCase()))
    .map(e => e.replace(startsWith.toLowerCase(),''))
console.log(validInputs)
  for(const input of validInputs){
    if(input.toLowerCase().trim() === "card" || input.toLowerCase() === "cart" ){
      return true;
    }

  }
  return false;
}
