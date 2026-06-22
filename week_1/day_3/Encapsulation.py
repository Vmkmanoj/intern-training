from abc import ABC , abstractmethod

# encapsulation

print("-"*30, "day 3 encapsulation" , "-"*30)

class History:
    def __init__(self,name):
        self.__name = name

    def getName(self):
        return self.__name
    


history = History("hello mano")

print(history.getName())

print("-"*30, "day 3 abstraction" , "-"*30)

# abstraction

class abstract(ABC):

    @abstractmethod
    def dog(self):
        pass

class animal(abstract):

    def dog(self):
        print("hello wolrd")


obj = animal()
obj.dog()

# inhertance

print("-"*30, "day 3 inhertance" , "-"*30)


class A:
    def hello(self):
        pass

class B:
    def dog(self):
        print("brak")

class C(A,B):
    def cat(self):
        print("meow")


obj1 = C()
obj1.cat()
obj1.dog()


print("-"*30, "day 3 polymarprisam" , "-"*30)

# poly

class Animal:
    def sound(self):
        print("Some sound")


class Dog(Animal):
    def sound(self):
        super().sound()
        print("Bark")


obj2 = Dog()
obj2.sound()
    

