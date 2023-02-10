const { response } = require('express');
const Evento = require('../models/Evento')


const getEventos = async ( req, res = response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');

    res.json({
        ok: true,
        eventos
    });
}

const crearEvento = async ( req, res = response) =>{

    const evento = new Evento( req.body );

    try{

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })

    }catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admimistrador'
        });

    }
}

const actualizarEvento = async ( req, res = response) =>{

    const eventoId = req.params.id;
    const uid = req.uid;

    try{
        const evento = await Evento.findById( eventoId );
        
        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if ( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        res.json({
            ok: true,
            evento: eventoActualizado
        })
        
    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const eliminarEvento = async ( req, res = response) =>{

    const eventoId = req.params.id;
    const uid = req.uid

    try{
        const evento = await Evento.findById( eventoId );

        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'evento no existe por ese id'
            })
        }

        if ( evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar ete evento'
            })
        }

        await Evento.findByIdAndDelete(eventoId );
        
        req.json({ok: true})

    }catch(error){
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}