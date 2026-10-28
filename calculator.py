a = float(input("Enter first number: "))
b = float(input("Enter second number: "))
op = input("Choose an operation (+,-,*,/): ")
if op == "+":
    print("Addition: ",a+b)
elif op=="-":
    print("Subtraction: ",a-b)
elif op=="*":
    print("Multiplication: ",a*b)
elif op=="/":
    if b==0:
        print("Cannot divide by zero")
    else:
        print("Division: ",a/b)
else:
    print("Invalid operator")