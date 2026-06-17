from week_1.day_5 import main


try:
    main()
except ValueError:
    print("please check you code")
except TypeError:
    print("type error")
except IndexError:
    print("check your index")

except ModuleNotFoundError:
    print("module is not found plz check it")

finally:
    print("it run")


