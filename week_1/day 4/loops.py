a = int(input("Enter the table : "))

b = int(input("Enter the range : "))

for i in range(1,b+1):
    print(i  ,"X" , a , "=" , i*a)

# ========================================

c = int(input("Enter the sum number "))

ans = 0

for i in range(1,c+1):
    ans +=i

print(ans)

# =========================================

d = int(input("Enter fizzbuzz : "))


if d%3 == 0 and d%5 == 0:
    print("FizzBuzz")
elif d%3 == 0:
    print("Fizz")
elif d%5 == 0:
    print("Buzz")
else:
    print("it's self")

# =========================================


target = 20

while True:
    values = int(input("Enter the valuess : "))
    if target == values:
        print("Matched")
        break
    elif target > values:
        print("higer")
    else:
        print("lower")