
from datetime import datetime
class ContactBook:
    def __init__(self):
        self.data = []

    def addContact(self):
        print("---------Contact add-----------")
        name = input("Enter the Name : ")
        age = int(input("Enter the Age : "))
        phoneNumber = int(input("Enter the phoneNumber : "))

        contactbook = {
            "id" : len(self.data) + 1,
            "name" : name,
            "age" : age,
            "phoneNumber" : phoneNumber,
            "time" : datetime.today()
        } 

        self.data.append(contactbook)

    def contactList(self):
        print("---------list Contact----------")
        for i in self.data:
            print(i,end = "\n")

    def findContact(self):
        
        name = input("enter the fiding contact")

        for i in self.data:
            if i["name"] in name:
                print(i)
                return
        print("No contact found")
           

def main():
    obj = ContactBook()
    while True:
        print(""" 1.add conntect \n 2.contact list \n 3.find Contact """)
        choose = int(input("Enter the Choose : "))
        if choose == 1:
            obj.addContact()
        elif choose == 2:
            obj.contactList()
        elif choose == 3:
            obj.findContact()


if __name__ == "__main__":
    main()










    