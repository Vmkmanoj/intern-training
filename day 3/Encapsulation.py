from abc import ABC , abstractmethod

# encapsulation

class History:
    def __init__(self,name):
        self.__name = name

    def getName(self):
        return self.__name
    


history = History("hello mano")

print(history.getName())

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
    

