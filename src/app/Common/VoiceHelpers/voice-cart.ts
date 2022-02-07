import AppProduct from "../product";
import {ShoppingCartService} from "../../shopping-cart.service";

// const STARTS_WITH = "new"

interface CartProduct{
  isCalled:boolean,
  product?:AppProduct,

}

export default function cartAddDecoder(startsWith:string,input:string[], products:AppProduct[]):CartProduct{
  const filtered_products = input.map(e => e.toLowerCase()).filter(e => e.includes(startsWith)).map(e => e.replace(startsWith,''))

  if (!filtered_products) return {isCalled:false}
  console.log("inputs",input)
  console.log("filtered",filtered_products)
  for(const productName of filtered_products){
    for(const realProduct of products){
      console.log(realProduct.title.toLowerCase(),productName.toLowerCase(),realProduct.title.toLowerCase().trim() === productName.toLowerCase().trim())
        if(realProduct.title.toLowerCase().trim().includes(productName.trim())){
          return {isCalled:true,product:realProduct}
        }
    }
  }
  return {isCalled:true}
}
