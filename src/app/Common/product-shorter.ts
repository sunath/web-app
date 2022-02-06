import AppProduct from "./product";

export default function sorter(a:AppProduct,b:AppProduct) {
    if (a.title < b.title)
    return -1;
 if (a.title > b.title)
   return 1;
 return 0;
}