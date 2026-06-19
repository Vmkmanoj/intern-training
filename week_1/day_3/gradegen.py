

print("-"*30,"Score","-"*30)
def score():

    grade = int(input("Enter the score :"))

    if grade >= 90:
        print("A")
    elif grade >= 80 and grade <= 90:
        print("B")
    elif grade >= 70 and grade <= 80:
        print("C")
    elif grade >= 60 and grade <= 70:
        print("D")
    elif grade >= 50 and grade <= 60:
        print("E")
    elif grade <= 39:
        print("F")

score()