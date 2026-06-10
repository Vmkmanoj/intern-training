from abc import ABC , abstractmethod

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


