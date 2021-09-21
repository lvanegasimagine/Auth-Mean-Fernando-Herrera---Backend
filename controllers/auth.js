const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const generarJWT = require('../helpers/jwt');

const crearUsuario = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        // Verificar el email
        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        // Crear usuario con el modelo
        const dbUser = new Usuario(req.body);

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt);

        // Generar el JWT
        const token = await generarJWT(dbUser.id, name);
        // Crear usuario de DB
        await dbUser.save();

        // Generar repuesta exitosa
        return res.status(200).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }


    
}

const loginUsuario = async (req, res) => {

    const {email, password} = req.body;
    
    try {
        const dbUser = await Usuario.findOne({ email });
        
        if(!dbUser){
            return res.status(400).json({
                ok: false,
                msg: 'Correo no valido'
            });
        }

        //Confirmar si el password hace match
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password no es valido'
            });
        }

        // Generar el token
        const token = await generarJWT(dbUser.id, dbUser.name);

        // Repuesta exitosa

        return res.status(200).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador' + error
        });
    }

}

const revalidarToken = async (req, res) => {

    const {uid, name} = req;

    const token = await generarJWT(uid, name);

    return res.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};