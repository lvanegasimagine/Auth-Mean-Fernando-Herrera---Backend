const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next)=>{
    const errors = validationResult(req);

    const {name, email, password } = req.body;
    console.log(name, email, password);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
};


module.exports = {
    validarCampos
}