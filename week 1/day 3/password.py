class Infomation:
    def __init__(self,userName,passWord):
        self.userName = userName
        self.passWord = passWord



class Auth:
    
    def __init__(self):
        self.contains = []

    def login(self):
        user = input("enter the name")
        password = input("enter the password")

        for i in self.contains:
           if i["name"] == user and i["password"] == password:
               print("User login successfully")
               break
            
        print("login failed...")

    def register(self):
        user = input("Enter the Name : ")
        password = input("Enter the password : ")


        for i in self.contains:
           if i["name"] == user:
               print("User alteady exits..!")

        self.contains.append({
            "name" : user,
            "password" : password
        })

     

        print("Register Successfully....!")

    def showUsers(self):
        for i in self.contains:
            print(i["name"])

def main():
    auth = Auth()

    while True:
        print("""1.login\n2.Register\n3.show Users""")
        choose = int(input())
        if choose == 1 :
            auth.login()
        elif choose == 2:
            auth.register()

        elif choose == 3:
            auth.showUsers()
        else: 
            break

if __name__ == "__main__":
    main()




        
