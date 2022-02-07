import RouterDetail from "./router-details"




const NavigateStartsWith = "to"


const MyRoutes:RouterDetail[] = [

      // My Orders
        {
          name:"my orders",
          url:"/my/orders"
        },
        {
          name:"my order",
          url:"/my/orders"
        },



  //Manage Orders
  {
    name:"manage orders",
    url:"/admin/orders"
  },

  {name:"manage order",
  url:"/admin/orders"
  },

    //Manage Products

    {
        name:"manage products",
        url:"/admin/products"
    },
    {
        name:"manage product",
        url:"/admin/products"
    },
    {
        name:"product",
        url:"/products"
    },

        //Shopping Cart
    {
        name:"shopping cart",
        url:"/shopping-cart"
    },
  {name:"shopping card",url:"/shopping-cart"}
]

export default function FindPath(array:string[]):RouterDetail |  undefined{
    let suits:string[]  = []

    for(const item of array){
        if(item.toLocaleLowerCase().includes(NavigateStartsWith.toLocaleLowerCase())){
           const newItem = item.replace(NavigateStartsWith,'')
           console.log(newItem)
            suits.push(newItem)
        }
    }

    console.log(suits)

    for(const item of suits){
        const routes:RouterDetail[] = MyRoutes.filter(e => item.toLocaleLowerCase().includes(e.name.toLocaleLowerCase()))
        console.log(routes)
        if(!routes){
            return;
        }

        return routes[0]
    }

    return undefined;

}
