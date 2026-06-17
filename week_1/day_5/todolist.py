class todolist:
    def __init__(self):
        self.todo = []

    def addtask(self,data):
        self.todo.append(data)

    def poptask(self):
        self.todo.pop()

    def showtask(self):
        for i in self.todo:
            print(i,end = " ")

    def revers(self):
        self.todo.reverse()

    def remove(self,data):

        self.todo.remove(data)


def mainTodo():
    obj = todolist()
    obj.addtask(10)
    obj.addtask(20)
    obj.addtask(10)
    obj.addtask(20)
    obj.addtask(10)
    obj.addtask(20)
    obj.addtask(10)
    obj.addtask(20)
    obj.addtask(40)
    obj.poptask()
    obj.revers()
    obj.remove(10)
    obj.showtask()

if __name__ == "__main__":
    mainTodo()


