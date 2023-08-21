import { ErrorRequestHandler } from "express";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errMiddleware: ErrorRequestHandler = (err,req,res,next) =>{
    console.log(err)
    let errorMessage = "An unknown error occunred"
    let statusCode = 500
    if(err instanceof Error){
        errorMessage = err.message
        if(errorMessage === "invalid file type") statusCode = 400
        res.status(statusCode).json({error : errorMessage})
    }
}