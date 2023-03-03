import os
import json
import numpy as np 

class Student:
    a:int
    b = 100

    def __init__(self) -> None:
        self.a = 10

    def a(self):
        self.b = 101




print("########## TEST CASES GENERATION ##########")

filePath = "./tests"

metals = [ "XAU=", "XAG=", "XPT=", "XPD=" ]

def fun():
    testFile = "/test-coin-updated-time"

    m = np.random.choice(metals , replace=True)

    file = open(file=f"{filePath}{testFile}" , mode="wt")

    file.write(m)




    file.close()















if(__name__ == "__main__"):
    fun()


