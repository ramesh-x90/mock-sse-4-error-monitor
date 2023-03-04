import Express, { Request, Response, Router } from "express";
import { readFile } from "fs/promises";
import { stdin } from "process";
import { PassThrough, Transform, TransformCallback } from "stream";

const data = {
  ric: "XCU",
  price: 1000,
};

const filePaths = [
  "./tests/missing-value-tests/allWithInTime",
  "./tests/missing-value-tests/missingAG",
  "./tests/missing-value-tests/missingAU",
  "./tests/missing-value-tests/missingPD",
  "./tests/missing-value-tests/missingPT",
];

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


let streamData : String[]

Promise.all(promises).then( (resutls) => {
    streamData = testData[0];
    console.log("test_data_ready")
})





function mockRoute(router: Router): Router {
  const path2Mock = async (req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/event-stream");

    streamData.forEach(
        (d , i) => {
            setTimeout(() => {
                res.write(`data:${d}\n\n`);
                if(i === streamData.length -1){
                    res.end()
                }
              }, i * 100);
        }
    )

  };

  router.use("/scrap", path2Mock);

  return router;
}


class StdInterceptor extends PassThrough{
    _write(chunk: Buffer, encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
        let input : number = parseInt(chunk.toString() ) + 0

        if( input >= 0 && input <=  testData.length - 1 ){
            streamData = testData[input]
        }else{
            console.log("invalid input")
        }

        callback()
    }
}


stdin.pipe(new StdInterceptor())


export { mockRoute as mockRoute2 };
