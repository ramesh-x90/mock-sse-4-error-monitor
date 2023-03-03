import { Request ,  Response} from "express"



const data = {
    ric : "XCU",
    price : 1000
}

const path1Mock = async (req : Request , res : Response )  => {
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


  export { path1Mock }