class Bank:
    def __init__(self,name,amount):
        self.name = name
        self.amount = amount

    def withdraw(self,amount):

        if self.amount < amount:
            return {"insufficient balance"}

        self.amount -= amount
        return {f"Your Current Balance is {self.amount}"}
    
    def deposit(self,amount):

        if amount <= 0:
            return {"enter the Currect Amount"}
        
        self.amount+= amount
        return {f"Your Current Balance is {self.amount}"}
    
    def balance(self):
        return {f"Your Current Balance is {self.amount}"}

bank = Bank("Manojkumar",1000)
while True:
    print("""1.Balance \n 2.Deposit \n 3.withdraw""")
    choose = int(input("Enter the choose"))
    if choose == 1:
        print(bank.balance())
    elif choose == 2:
        amount = int(input("Enter the Amount :"))
        print(bank.deposit(amount))
    elif choose == 3:
        amount = int(input("Enter the Amount"))
        print(bank.withdraw(amount))
    else:
        break

