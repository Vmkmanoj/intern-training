prodect  = [
  {
    "id": 1,
    "name": "Wireless Noise-Canceling Headphones",
    "price": 199.99,
    "delivery_date": "2026-06-20",
    "seller_name": "AudioTech Direct"
  },
  {
    "id": 2,
    "name": "Organic Cotton T-Shirt",
    "price": 24.50,
    "delivery_date": "2026-06-18",
    "seller_name": "EcoWear Apparel"
  },
  {
    "id": 3,
    "name": "Stainless Steel Water Bottle",
    "price": 15.00,
    "delivery_date": "2026-06-19",
    "seller_name": "Hydrate Plus"
  },
  {
    "id": 4,
    "name": "Mechanical Gaming Keyboard",
    "price": 89.99,
    "delivery_date": "2026-06-22",
    "seller_name": "GamerGear Pro"
  },
  {
    "id": 5,
    "name": "Ceramic Coffee Mug",
    "price": 12.99,
    "delivery_date": "2026-06-17",
    "seller_name": "Mug Masters"
  },
  {
    "id": 6,
    "name": "Smart Fitness Watch",
    "price": 149.00,
    "delivery_date": "2026-06-21",
    "seller_name": "TechFit Gadgets"
  }
]


class Users:
    def __init__(self,name,pin):
        self.name = name
        self.pin = pin



class ShopingWebPage(Users):
    def __init__(self,name,pin):
        super().__init__(name,pin)
        self.webpageName = "python shoping mart"
        self.cart = []

    def addToCart(self):
        
        prodcutId = int(input("Enter the Id to add to cart"))

        for i in prodect:
            if i["id"] == prodcutId:
                self.cart.append(i)
                print("added successFully..!")

    
    def displayAllProdct(self):
        for i in prodect:
            print(i,"\n")

    def showcart(self):
        for i in self.cart:
            print(i)

    def payment(self):

        print(f"You have added {len(self.cart)} ")
        total = 0
        for i in self.cart:
            print(f"name of the prodcut : {i["name"]} - {i["price"]}" )
            total+=i["price"]
        print("total",total)

    


            



    


obj = ShopingWebPage("manojkumar",1234)


print("-------------HomePage-------------")
obj.displayAllProdct()

obj.addToCart()
obj.showcart()
obj.payment()

