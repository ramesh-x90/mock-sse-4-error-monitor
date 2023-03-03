import os
import json
import numpy as np 
import time


ROWS = 50




print("########## TEST CASES GENERATION ##########")

filePath = "./tests"

metals = [ "XAU=", "XAG=", "XPT=", "XPD=" ]

def missingOneValueTestData():
    p = "/missing-value-tests"
    testFile = "/missing1"

    ms = np.random.choice(metals , ROWS , replace=True , p=[.5,.4,.1,0])

    file = open(file=f"{filePath}{p}{testFile}" , mode="wt")

    for m in ms:
        d = {
            "ric" : m,
            "price" : np.random.rand() * 1000,
            "updatedTime" : int(time.time()),
            "errorCode" : None,
            "signature" : "DEB1073E88492861F6B5B57DB6BB510E7E354B05433352C2C127356AD234E1CC"
        }
        file.write(json.dumps(d) + "\n")


    file.close()


def missingTwoValuesTestData():
    p = "/missing-value-tests"
    testFile = "/missing2"

    ms = np.random.choice(metals , ROWS , replace=True , p=[.5,.5,0,0])

    file = open(file=f"{filePath}{p}{testFile}" , mode="wt")

    for m in ms:
        d = {
            "ric" : m,
            "price" : np.random.rand() * 1000,
            "updatedTime" : int(time.time()),
            "errorCode" : None,
            "signature" : "DEB1073E88492861F6B5B57DB6BB510E7E354B05433352C2C127356AD234E1CC"
        }
        file.write(json.dumps(d) + "\n")


    file.close()



def missing3ValuesTestData():
    p = "/missing-value-tests"
    testFile = "/missing3"

    ms = np.random.choice(metals , ROWS , replace=True , p=[1,0,0,0])

    file = open(file=f"{filePath}{p}{testFile}" , mode="wt")

    for m in ms:
        d = {
            "ric" : m,
            "price" : np.random.rand() * 1000,
            "updatedTime" : int(time.time()),
            "errorCode" : None,
            "signature" : "DEB1073E88492861F6B5B57DB6BB510E7E354B05433352C2C127356AD234E1CC"
        }
        file.write(json.dumps(d) + "\n")


    file.close()












if(__name__ == "__main__"):
    missingOneValueTestData()
    missingTwoValuesTestData()
    missing3ValuesTestData()


