class Bank:
    def __init__(self, name, pin, balance):
        self.name = name
        self.pin = pin
        self.balance_amount = balance
        self.minimum = 1000

    def withdraw(self, amount):
        try:
            if amount > self.balance_amount:
                print("Insufficient Balance")
            elif self.balance_amount - amount < self.minimum:
                print(f"You must maintain a minimum balance of {self.minimum}")
            else:
                self.balance_amount -= amount
                print("Withdraw Successful")
                print(f"Current Balance: {self.balance_amount}")
        except TypeError:
            raise("Enter the valid number")
        finally:
            pass
    def deposit(self, amount):
        self.balance_amount += amount
        print("Deposit Successful")
        print(f"Current Balance: {self.balance_amount}")

    def balance(self):
        print(f"Current Balance: {self.balance_amount}")

def mainBankfunction():

    print("-"*30,"Week 2 day 5","-"*30)

    bank = Bank("Manoj", 1234, 1000)

    print("Welcome to ATM")

    pin = int(input("Enter PIN: "))

    if pin == bank.pin:
        contine = True
        while contine:
            print("""
            1. Withdraw
            2. Deposit
            3. Balance
            4. Exit
            """)

            choice = int(input("Enter Choice: "))

            if choice == 1:
                amount = int(input("Enter Amount: "))
                bank.withdraw(amount)
                cho = input("want to contine yes/no : ")
                if cho == "yes":
                    contine = True
                elif cho == "no":
                    contine = False


            elif choice == 2:
                amount = int(input("Enter Amount: "))
                bank.deposit(amount)
                cho = input("want to contine yes/no : ")
                if cho == "yes":
                    contine = True
                elif cho == "no":
                    contine = False
                

            elif choice == 3:
                bank.balance()

            elif choice == 4:
                print("Thank You")
                break

            else:
                print("Invalid Choice")

    else:
        print("Invalid PIN")