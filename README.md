# Mock SSE Server application to test SSE API monitor 
---
Install dependencies

```shell
npm install
```
---
Start development server
```shell
npm run dev
```
---
### Test data


1. /tests/missing-value-tests/missing_
2. /tests/missing-value-tests/missing_XAG=
3. /tests/missing-value-tests/missing_XAG=,XPD=
4. /tests/missing-value-tests/missing_XAG=,XPT=
5. /tests/missing-value-tests/missing_XAG=,XPT=,XPD=
6. /tests/missing-value-tests/missing_XAU=
7. /tests/missing-value-tests/missing_XAU=,XAG=
8. /tests/missing-value-tests/missing_XAU=,XAG=,XPD=
9. /tests/missing-value-tests/missing_XAU=,XAG=,XPT=
10. /tests/missing-value-tests/missing_XAU=,XPD=
11. /tests/missing-value-tests/missing_XAU=,XPT=
12. /tests/missing-value-tests/missing_XAU=,XPT=,XPD=
13. /tests/missing-value-tests/missing_XPD=
14. /tests/missing-value-tests/missing_XPT=
15. /tests/missing-value-tests/missing_XPT=,XPD=
16. /tests/updated-time-tests/moreThan10minAgo
17. /tests/updated-time-tests/withIn10minAgo

---
To change test data set use this command in console

```shell
test=<number>
Ex: test=1
```

---
To change delay between messages in stream use this command in console

```shell
delay=<number>
Ex: delay=1000
```

---
To generate test data

```shell
python ./gen-tests.py
```