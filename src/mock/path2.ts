import Express, { Request, Response, Router } from "express";
import { readdirSync } from "fs";
import { readFile } from "fs/promises";
import { stdin } from "process";
import { PassThrough, Transform, TransformCallback } from "stream";

class StdInterceptor extends PassThrough {
  _write(
    chunk: Buffer,
    encoding: BufferEncoding,
    callback: (error?: Error | null | undefined) => void
  ): void {
    let input = chunk.toString();

    // test=1
    // delay=100

    let [key, value] = input.split("=");

    switch (key.trim()) {
      case "test":
        const val = parseInt(value) - 1;

        if (val >= 0 && val <= testData.length - 1) {
          streamData = testData[val];
          console.log("New Test Data has been Loaded: " + filePaths[val]);
        } else {
          console.log("invalid input");
        }
        break;

      case "delay":
        delay = parseInt(value);
        console.log(`Delay of 2 responses has been change to: ${delay}`);
        break;
      default:
        break;
    }

    callback();
  }
}

let filePaths : string[] = [];

const testCasePath1 ="./tests/missing-value-tests"
readdirSync(testCasePath1).forEach( path => {
  filePaths.push(`${testCasePath1}/${path}`)
})

const testCasePath2 ="./tests/updated-time-tests"
readdirSync(testCasePath2).forEach( path => {
  filePaths.push(`${testCasePath2}/${path}`)
})

console.log("Test data files")
filePaths.forEach((val , inx) => console.log(`${inx+1} ${val}`) )
console.log("\n\n\n")

let testData: String[][] = new Array(filePaths.length);
const promises: any[] = [];


filePaths.forEach((path, i) => {
  promises.push(
    readFile(path).then((data: Buffer) => {
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
  console.log("Test Data is Ready");
});

function mockRoute(router: Router): Router {
  const path2Mock = async (req: Request, res: Response) => {
    console.log("End point hits")
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

  router.use("/scrap", path2Mock);

  return router;
}

stdin.pipe(new StdInterceptor());

export { mockRoute as mockRoute2 };
