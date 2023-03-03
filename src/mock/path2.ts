import Express , { Request ,  Response , Router} from "express"



const data = {
    ric : "XCU",
    price : 1000
}



function mockRoute(router : Router) : Router{
    const path2Mock = async (req : Request , res : Response )  => {
        res.setHeader("Content-Type" , "text/event-stream")
    
        const timer = setInterval(() => {
            res.write(`data:${JSON.stringify(data)}\n\n`)
        } , 1000)
    
        setTimeout( () => {
            if(timer != null){
                clearInterval(timer)
            }
            res.end()
    
        } , 10000)
    
      }
    
      router.use("/scrap" , path2Mock)

      return router
}



  export { mockRoute as mockRoute2 }