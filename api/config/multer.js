const multer = require("multer");
const crypto = require("crypto");
const {extname, resolve } = require("path");

module.exports = { 

  storage: multer.diskStorage({
    destination:resolve(__dirname, '..', '..', 'uploads', 'avatar'),
    filename: (req, file, cb) =>{
      if (extname(file.originalname) != '.jpg' && extname(file.originalname) != '.png'){
        console.log(extname(file.originalname))
        return cb('Imagem deve ser .jpg ou .png')
      }else{
      crypto.randomBytes(16,(err,res) => {
        
        if(err) return cb(err);
        return cb(null, res.toString('hex') + extname(file.originalname)); 
      });
    }
  }
  })
}