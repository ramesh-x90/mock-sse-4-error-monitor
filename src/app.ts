import Express, { Request, Response } from "express";
import cors from "cors";
import { path1Mock } from "./mock/path1";
import { path2Mock } from "./mock/path2";



let app = Express()

app.use(cors())

export async function mockSseServer() {

  const port = 4000;

  app.use("/trades/coins", path1Mock);

  app.get("/trades/scrap", path2Mock);

  app.listen(port, () => {
    console.log(`Server is running on port: localhost:${port}`);
  });


}
