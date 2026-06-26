class A:
    def __init__(self,name):
        self.name = name
        self._age = 10

    def getName(self):
        return self.name

    def __add__(self,othere):
        return self._age  + othere._age , self.name
    

class B(A):
    def __init__(self,name):
        super().__init__(name)

    def showName(self):
        print(self.name , self._age)
        return self.name
    

obj = B("manojkumar")
print(obj.showName())
obj = A(1)
obj_2 = A(2)
print(obj + obj_2)
