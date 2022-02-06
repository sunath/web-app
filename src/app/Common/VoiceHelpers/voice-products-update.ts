import RouterDetail from "../router-details";
import AppProduct from "../product";
import VoiceProductResponse from "./voice-product-response";


const SearchStartBy = "update product"


export default  function FindUpdatableProduct(array:string[],productsList:AppProduct[]) : VoiceProductResponse{
    console.log(productsList)
  let suits:string[] = array.filter(name => name.toLocaleLowerCase().includes(SearchStartBy)).map(e => e.replace(SearchStartBy,'').trimStart())

  let finalOutput:AppProduct;

  console.log("Suits "+suits)


  for(const name of suits){
      for(const product of productsList){
        if(product.title.toLocaleLowerCase().includes(name.toLocaleLowerCase())){
          finalOutput = product;

          console.log(finalOutput)
          return {isCalledUpdate:true,product:product};
        }
      }
  }

  return {isCalledUpdate:false};





}
