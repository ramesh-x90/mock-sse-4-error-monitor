import {Router , Request ,Response } from "express"


function mockRoute(router: Router): Router {
    const path2Mock = async (req: Request, res: Response) => {

        const authData = {
            status: "SUCCESS",
            message: null,
            data: {
                accessToken: "12345"
            }
        }

      res.setHeader("Content-Type", "application/json");
      res.json(authData)


      };
    
  
    router.use("/authenticate", path2Mock);
  
    return router;
  }
  
  export { mockRoute as authRoute };