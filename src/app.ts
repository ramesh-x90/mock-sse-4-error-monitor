import Express, { Request, Response } from "express";
import cors from "cors";
import { mockRoute1 } from "./mock/path1";
import { mockRoute2 } from "./mock/path2";



const app = Express()
const router = Express.Router()

app.use(cors())

export async function mockSseServer() {

  const port = 4000;

  app.use("/trades", mockRoute1(router) );

  app.get("/trades", mockRoute2(router));

  app.get("/", (req : Request , res : Response ) => {
    res.json({ message : "hello"})
    res.end()
  });

  app.listen(port, () => {
    console.log(`Server is running on port: localhost:${port}`);
  });


}
