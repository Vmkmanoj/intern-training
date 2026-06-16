class Animal:
    def __init__(self,name,age):
        self.name = name
        self.age = age

    city = "tirpuut"



class Cat(Animal):
    def __init__(self, name, age):
        super().__init__(name, age)

    def speak(self):
        print(f"{self.name} it age is {self.age} , it say meow")


class Dog(Animal):
    def __init__(self, name, age):
        super().__init__(name, age)
        

    def speak(self):
        print(f"{self.name} it age is {self.age} , it say Bow bow {self.city}")

dog = Dog("chetty" ,8)
dog.speak()

cat = Cat("tokyo",5)
dog.speak()

# s = [Cat("tokyo",5) , Dog("chetty" ,8)]

# for i in s:
#     print(i.speak())




