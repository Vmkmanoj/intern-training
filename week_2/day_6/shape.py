import math

class Shape:
    def __init__(self, name):
        self.name = name

    def area(self):
        pass


class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__("Rectangle")
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def __str__(self):
        return f"{self.name}(width={self.width}, height={self.height})"
    
    def __len__(self):
        return  len(str(self.area))
    


class Circle(Shape):
    def __init__(self, radius):
        super().__init__("Circle")
        self.radius = radius

    def area(self):
        return math.pi * self.radius * self.radius
    

def mainRentangle():
    rectangle1 = Rectangle(10, 5)
    rectangle2 = Rectangle(10, 5)
    circle = Circle(7)

    print(len(rectangle1))

    print("Shapes:")
    print(rectangle1)
    print(f"Rectangle Area: {rectangle1.area()}")

    print(f"Circle Area: {circle.area():.3f}")


    print(f"{math.pi:.2f}")