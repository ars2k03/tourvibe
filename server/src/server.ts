import express, { type Request, type Response } from "express";
const app = express();
const port = 3000

app.get('/', (req : Request, res : Response) => {
    res.json({
        success : true,
        statuse : 200,
        message : "API is running"
    })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})