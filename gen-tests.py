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
    delay: timedelta = timedelta(seconds=10),
):
    arr = np.array(p)
    prob = arr / arr.sum()

    ms = np.random.choice(metals, ROWS, replace=True, p=prob)

    file = open(file=f"{filepath}", mode="wt")

    i = 0

    for m in ms:
        d = {
            "ric": m,
            "price": np.random.rand() * 1000,
            "updatedTime": int(time.time() * 1000 - dDelta.total_seconds() * 1000),
            "errorCode": None,
            "signature": "DEB1073E88492861F6B5B57DB6BB510E7E354B05433352C2C127356AD234E1CC",
        }
        file.write( str(int(i)) + "|" + json.dumps(d) + "\n")

        i += delay.total_seconds() * 1000

    file.close()



# metals = ["XAU=", "XAG=", "XPT=", "XPD="]

if __name__ == "__main__":
    missing_values_tests = f"{filePath}/missing-value-tests"
    updated_time_tests = f"{filePath}/updated-time-tests"

    delay = 600

    generateTest(
        f"{missing_values_tests}/missingAU",
        p=[0,1,1,1],
        delay=timedelta(milliseconds=delay),
    )

    generateTest(
        f"{missing_values_tests}/missingAG",
        p=[1,0,1,1],
        delay=timedelta(milliseconds=delay),
    )

    generateTest(
        f"{missing_values_tests}/missingPT",
        p=[1,1,0,1],
        delay=timedelta(milliseconds=delay),
    )

    generateTest(
        f"{missing_values_tests}/missingPD",
        p=[1,1,1,0],
        delay=timedelta(milliseconds=delay),
    )

    generateTest(
        f"{missing_values_tests}/allWithInTime",
        p=[4,3,2,1],
        delay=timedelta(milliseconds=delay),
    )

    generateTest(
        f"{updated_time_tests}/withIn10minAgo",
        p=[4,3,2,1],
        dDelta=timedelta(minutes=5),
        delay=timedelta(milliseconds=delay),
    )


    generateTest(
        f"{updated_time_tests}/moreThan10minAgo",
        p=[4,3,2,1],
        dDelta=timedelta(days=1),
        delay=timedelta(milliseconds=delay),
    )

