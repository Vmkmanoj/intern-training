
from datetime import datetime
class ContectBook:
    def __init__(self):
        self.data = []

    def addContect(self):
        print("---------Contect add-----------")
        name = input("Enter the Name : ")
        age = int(input("Enter the Age : "))
        phoneNumber = int(input("Enter the phoneNumber : "))

        contectbook = {
            "id" : len(self.data) + 1,
            "name" : name,
            "age" : age,
            "phoneNumber" : phoneNumber,
            "time" : datetime.today()
        } 

        self.data.append(contectbook)

    def contectList(self):
        print("---------list Contect----------")
        for i in self.data:
            print(i,end = "\n")

    def findContect(self):
        
        name = input("enter the fiding contect")

        for i in self.data:
            if i["name"] in name:
                print(i)
                return
        print("No contect found")
           

def main():
    obj = ContectBook()
    while True:
        print(""" 1.add conntect \n 2.contact list \n 3.findContect """)
        choose = int(input("Enter the Choose : "))
        if choose == 1:
            obj.addContect()
        elif choose == 2:
            obj.contectList()
        elif choose == 3:
            obj.findContect()


if __name__ == "__main__":
    main()










    