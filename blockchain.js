const hash = require('crypto-js/sha256')

class Block{
    constructor(preHash,data){
        this.preHash = preHash;
        this.data = data;
        this.time = new Date();

        this.hash = this.caculateHash()
        this.mineVar = 0
    }
    caculateHash() {
        return hash(this.preHash + JSON.stringify(this.data) + this.time + this.mineVar).toString() ;
    }
    mine(mineVar,diff){
        this.mineVar = mineVar 
        this.hash = this.caculateHash()
        // console.log(this.hash)
        if (!this.hash.startsWith('0'.repeat(diff))){
            return false;
        }else{
            return true
        }
    }
}

class BlockChain{
    constructor(chain){
        // const genesisBlock = new Block('0000',{IsGeneisis : true })

        // this.chain = [genesisBlock]
        this.chain = chain
    }
    getLastBlock(){
        return this.chain[this.chain.length - 1]
    }
    addNewBlock(data,mineVar,diff){
        const lastBlock = this.getLastBlock()
        const newBlock = new Block(lastBlock.hash,data)
        
        // IsSuccess = true
        
        let IsSuccess = newBlock.mine(mineVar,diff)

        // this.chain.push(newBlock)

        if (IsSuccess){
            this.chain.push(newBlock)
            return true
        }else{
            return false
        }
    }
    IsValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i]
            const preBlock = this.chain[i-1]

            if (currentBlock.hash !== currentBlock.caculateHash()){
                return false
            }
            else if (currentBlock.preHash !== preBlock.hash){
                return false
            }
        }
        return true
    }
}

module.exports = BlockChain