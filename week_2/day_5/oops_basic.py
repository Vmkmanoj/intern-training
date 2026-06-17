class Student:
    def __init__(self,name,age):
        self.name = name 
        self.age = age

    def action(self):
        print(f"{self.name} are studying 10th class he's age is {self.age}")

std = Student("manojkumar",12)
std.action()


