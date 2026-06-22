class Users:
    def __init__(self,name,age,city,phoneNumber):
        self.name = name
        self.age = age
        self.city = city
        self.__phoneNumber = phoneNumber

    def getPhoneNumber(self):
        return self.__phoneNumber
    
    def saveContect(self):
        name = "manoj"
        age = 23
        city = "Tiruppur"
        phoneNumber = 974332

        user = Users(name,age,city,phoneNumber)

        with open("context.txt","w") as f:
            f.write(f'{user.name} , {user.age} , {user.city} , ')

    def readContext(self):
        
        with open("context.txt","r") as f:
            print(f.read())

    def addMore(self):

        name = "manoj"
        age = 23
        city = "Tiruppur"
        phoneNumber = 974332

        user = Users(name,age,city,phoneNumber)

        with open("context.txt","a") as f:
            f.write(f' {user.name} , {user.age} , {user.city} , ')

    def delete(self):

        name = input("enter the name")
        with open("context.txt","r") as f:
            for i in f:
                if i == name:
                    del[i]
                
    
with open("context.txt","r") as f:
    f.read()





def main():

    user = Users("Manojkumar",23,"tiruppur",987665)

    print(user.name)
    print(user.age)
    print(user.city)
    number = user.getPhoneNumber()
    print(number)

    # user.addMore()

    user.delete()

if __name__ == "__main__":
    main()
