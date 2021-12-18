const express = require('express');
const BlockChain = require('./blockchain');
const sendEmail = require('./sendEmail')
const mongoose = require('mongoose')
const database = require('./model')

const app = express();

//port 
let port = process.env.PORT || 3000

//Connect to database
mongoose.connect(process.env.DATABASE_URI,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})

// const genesisBlock = new Block('0000',{IsGenesis : true })

// console.log( genesisBlock)

// let GenesisBLock = new database({
//     preHash : '0000',
//     data : {
//         IsGenesis : true
//     },
//     hash : genesisBlock.hash,
//     mineVar : 0
// })

// GenesisBLock.save()

//Setting the view of server
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set("views", "./views");
app.set("view engine", "hbs");

//Main router
app.get('/',(req, res) => {
    // database.find({},(err,data) => {
    //     res.render('index',{data:data})
    // })
    res.render('index')
})

app.post('/',async (req, res) => {
    const data = req.body
    const query = {data : JSON.parse(data.data), mineVar: data.mineVar}
    if (query.data && query.mineVar){
        let history_data = await database.find()
        const blockchain = new BlockChain(history_data)
        
        // console.log(query)
        // console.log(blockchain.chain)

        IsSuccess = blockchain.addNewBlock(query.data,query.mineVar,query.data.value)
        // console.log(IsSuccess)
        if(IsSuccess){
            // console.log(blockchain.chain)
            let newBlock = blockchain.chain[blockchain.chain.length - 1]
            let insertNewBlock = new database({
                preHash : newBlock.preHash,
                data : {
                    email : newBlock.data.email,
                    value : newBlock.data.value
                },
                hash : newBlock.hash,
                mineVar : newBlock.mineVar
            })
            await insertNewBlock.save()
            sendEmail(query.data.email,query.data.value)
            console.log(query)
            res.redirect('/getcoin')
        }
        else{
            // res.send('Bad Request')
            res.redirect('/')
        }

    }
    
})

//Redirect to a new address for the successful miner
app.get('/getcoin',(req,res)=>{
    res.send('Congratulation')
})

app.listen(port, ()=>{
    console.log('listening on port 3000')
})