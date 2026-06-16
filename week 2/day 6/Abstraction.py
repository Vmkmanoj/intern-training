from abc  import ABC , abstractmethod


class Animal(ABC):

    @abstractmethod
    def eat():
        pass

    @abstractmethod
    def speak():
        pass

    def drink():
        pass



class Cat(Animal):

    def eat(self):
        print("cat can eat")

    def speak(self):
        print("can speak")





cat = Cat()
cat.eat()
cat.speak()


