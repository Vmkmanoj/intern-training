class Bank:
    def __init__(self,name,amount):
        self.name = name
        self.amount = amount

    def withdraw(self,amount):
        self.amount -= amount
        return {f"Your Current Balance is {self.amount}"}
    
    def deposit(self,amount):
        self.deposi+= amount
        return {f"Your Current Balance is {self.amount}"}
    
    def balance(self):
        return {f"Your Current Balance is {self.amount}"}
    
while True:
    bank = Bank("Manojkumar",1000)
    print("""1.Balance \n 2.Deposit \n 3.withdraw""")
    choose = int(input("Enter the choose"))
    if choose == 1:
        print(bank.balance())
    elif choose == 2:
        balance = int(input("Enter the Amount :"))
        print(bank.deposit())
    elif choose == 3:
        balance = int(input("Enter the Amount"))
        print(bank.withdraw())

