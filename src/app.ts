import Express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { mockRoute1 } from "./mock/path1";
import { mockRoute2 } from "./mock/path2";
import { authRoute } from "./mock/auth";



const app = Express()
const router = Express.Router()

app.use(cors())

export async function mockSseServer() {

  const port = 4000;

  const authGuard = async (req : Request , res : Response , next : NextFunction) => {
    const token = req.query.token

    if(!token || token != "12345"){
      console.log(token)
      res.setHeader("Content-Type", "text/event-stream")
      res.status(200)
      res.write(
        `data:{'massage:':'Invalid or Expired Token', code:'INVALID_TOKEN'}\n\n`
      )
      res.write(
        `data:{'massage:':'Invalid or Expired Token', code:'INVALID_TOKEN'}\n\n`
      )
      res.end()
    }else{
      console.log(token)
      next()
    }
    

    
  }

  app.use('/' , authRoute(router))

  app.use("/trades" , authGuard)

  app.use("/trades", mockRoute1(router) );

  app.use("/trades", mockRoute2(router));

  app.listen(port, () => {
    console.log(`Server is running on port: localhost:${port}`);
  });


}
