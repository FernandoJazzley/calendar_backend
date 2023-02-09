/*
    Rutas de Usuario / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarjwt } = require('../middlewares/validar-jwt');
const router = Router();

router.post(
    '/new', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ], 
    crearUsuario);

router.post(
    '/',
    [
        check('email', 'Email o passwor incorrectos, favor de verificar').isEmail(),
        check('password', 'Email o passwor incorrectos, favor de verificar').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', validarjwt, revalidarToken);

module.exports = router;