from week_1.day_5 import main ,mainTodo
from week_2.day_5 import mainBankfunction
from week_2.day_6 import mainRentangle

# main()
# todolist()
choose = int(input("Enter the choose "))
if choose == 1:
    mainBankfunction()
elif choose == 2:
    main()
elif choose == 3:
    mainTodo()
elif choose == 4:
    mainRentangle()
else:
    pass

