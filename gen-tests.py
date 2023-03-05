import os
import json
import numpy as np
import time
from datetime import timedelta

ROWS = 100


print("########## TEST DATA GENERATION ##########")

filePath = "./tests"

metals = ["XAU=", "XAG=", "XPT=", "XPD="]


def generateTest(
    filepath: str,
    dDelta: timedelta = timedelta(seconds=0),
    p=[1, 1, 1, 1],
    # delay: timedelta = timedelta(seconds=10),
):
    arr = np.array(p)
    prob = arr / arr.sum()

    ms = np.random.choice(metals, ROWS, replace=True, p=prob)

    file = open(file=f"{filepath}", mode="wt")


    for m in ms:
        d = {
            "ric": m,
            "price": np.random.rand() * 1000,
            "updatedTime": int(time.time() * 1000 - dDelta.total_seconds() * 1000),
            "errorCode": None,
            "signature": "DEB1073E88492861F6B5B57DB6BB510E7E354B05433352C2C127356AD234E1CC",
        }
        file.write( json.dumps(d) + "\n")

    file.close()



# metals = ["XAU=", "XAG=", "XPT=", "XPD="]

if __name__ == "__main__":
    missing_values_tests = f"{filePath}/missing-value-tests"
    updated_time_tests = f"{filePath}/updated-time-tests"
    happy_path = f"{filePath}/happy-path"


    for i in range(1,len(metals)**2):
        print(i)
        a = list(map( int , list(bin(i).removeprefix("0b"))))
        if len(a) < len(metals):
            prefix0s = len(metals) - len(a)
            for ii in range(0,prefix0s):
                a.insert(0,0)
            
        missingMetals = []
        for (x,y) in zip(metals , a):
            if(y == 0):
                missingMetals.append(x)

        j = ","
        generateTest(
        f"{missing_values_tests}/missing_{j.join(missingMetals)}",
        p=a,
        )

    generateTest(
        f"{updated_time_tests}/withIn10minAgo",
        p=[4,3,2,1],
        dDelta=timedelta(minutes=5),
    )


    generateTest(
        f"{updated_time_tests}/moreThan10minAgo",
        p=[4,3,2,1],
        dDelta=timedelta(days=1),
    )

    generateTest(
        f"{happy_path}/happyPathTestData",
        p=[1,0,0,0],
        dDelta=timedelta(minutes=1),
    )


