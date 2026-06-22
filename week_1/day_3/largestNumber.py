    
print("-"*30, "day 3 higher number" , "-"*30)

def higher():
    a = int(input("Enter the number A : "))
    b = int(input("Enter the number B : "))
    c = int(input("Enter the number C : "))

    if a>=b and a >= c:
        print(f'{a} highet numner')
    elif b >= a and b >= c:
        print(f'{b}highest Number')
    else:
        print(f'{c} is highest number') 


higher()
    