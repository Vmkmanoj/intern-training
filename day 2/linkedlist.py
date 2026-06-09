class Node:
    def __init__(self,data):
        self.data = data
        self.next = None


class linkedlist:
    def __init__(self):
        self.head = None

    def append(self,data):
        newNode = Node(data)

        if self.head is None:
            self.head = newNode
            return

        current = self.head

        while current.next:
            current = current.next

        current.next = newNode
    
    def display(self):

        current =  self.head

        while current:
            print(current.data,end="-> ")

            current = current.next

        print("None")

    def begining(self,data):

        newNode = Node(data)
        newNode.next = self.head
        self.head = newNode

    def center(self,data,index):

        newNode = Node(data)

        current = self.head

        for i in range(index):
            current = current.next


        newNode.next = current.next
        current.next = newNode
        
    
def main():
    ls = linkedlist()
    ls.append(10)
    ls.append(20)
    ls.append(30)
    ls.begining(5)
    ls.center(15,2)
    ls.display()

if __name__ == "__main__":
    main()
        

