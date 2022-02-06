
interface ViewProductResponse{
  isCalled:boolean,
  productName?:string
}

const Split_BY = "view"

export default function FindProductCategory(inputs:string[],searchBy:string[]):ViewProductResponse{
  const viewers = inputs.filter(input => input.toLowerCase().includes(Split_BY)).map(e => e.replace(Split_BY,'').trimLeft())

  if (!viewers) return {isCalled:false}

  for(const name of searchBy){
    for(const requester of viewers){
      if(name.toLowerCase().includes(requester.toLowerCase())){
        return {isCalled:true,productName:name}
      }
    }
  }

  return {isCalled:true}
}
