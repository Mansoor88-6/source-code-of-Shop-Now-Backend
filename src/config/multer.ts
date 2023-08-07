import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const fileStorage = multer.diskStorage({
    destination: (
        request: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        callback(null, './uploads/');
    },

    filename: (
        req: Request, 
        file: Express.Multer.File, 
        callback: FileNameCallback
    ): void => {
        callback(null, Date.now() + '-' + file.originalname)
    }
})


const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback,
    
    
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'||
        file.mimetype === 'image/avif'
    ) {
        callback(null, true)
    } else {
        const error = new Error("invalid file type")
        callback(error)
        
    }
}

export const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    
})


