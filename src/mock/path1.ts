import Express, { Request, Response, Router } from "express";
import { readFile } from "fs/promises";

const filePaths = ["./tests/happy-path/happyPathTestData"];
let testData: String[][] = new Array(filePaths.length);
const promises: any[] = [];



filePaths.forEach((s, i) => {
  promises.push(
    readFile(s).then((data: Buffer) => {
      const arr = data
        .toString()
        .split("\n")
        .filter((s) => s.length != 0);
        testData[i] = new Array(arr.length);
        testData[i] = arr;
    })
  );
});

let streamData: String[];
let delay = 100;

Promise.all(promises).then((resutls) => {
    streamData = testData[0];
  });

function mockRoute(router: Router): Router {
  const path2Mock = async (req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/event-stream");

    streamData.forEach((d, i) => {
        setTimeout(() => {
          res.write(`data:${d}\n\n`);
          if (i === streamData.length - 1) {
            res.end();
          }
        }, i * delay);
      });
    };
  

  router.use("/coins", path2Mock);

  return router;
}

export { mockRoute as mockRoute1 };
