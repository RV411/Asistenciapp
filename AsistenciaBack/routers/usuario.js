const {Usuario}=require('../models/usuario.js');
const express=require('express');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken')
const router=express.Router();


router.get(`/`, async (req, res) =>{
    const usuarioList = await Usuario.find();

    if(!usuarioList) {
        res.status(500).json({success: false})
    } 
    res.send(usuarioList);
})

router.get('/:id', async(req,res)=>{
    const usuario = await Usuario.findById(req.params.id);

    if(!usuario) {
        res.status(500).json({message: 'The usuario was not found.'})
    } 
    res.status(200).send(usuario);
})

router.post('/register', async (req,res)=>{
    let usuario = new Usuario({
        name: req.body.name,
        nameChurch: req.body.nameChurch,
        attendance: req.body.attendance,
        status: req.body.status,
        email: req.body.email,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
        dateCreated: req.body.dateCreated,
        fingerPrint: req.body.fingerPrint,
        passwordHash: req.body.passwordHash,
        isAdmin: req.body.isAdmin,
    })
    usuario = await usuario.save();

    if(!usuario)
    return res.status(400).send('The usuario cannot be created!')

    res.send(usuario);
})

router.put('/:id',async (req, res)=> {
    const usuario = await Usuario.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            nameChurch: req.body.nameChurch,
            attendance: req.body.attendance,
            status: req.body.status,
            email: req.body.email,
            phone1: req.body.phone1,
            phone2: req.body.phone2,
            dateCreated: req.body.dateCreated,
            fingerPrint: req.body.fingerPrint,
            passwordHash: req.body.passwordHash,
            isAdmin: req.body.isAdmin,
        },
        { new: true}
    )

    if(!usuario)
    return res.status(400).send('The usuario cannot be updated!')

    res.send(usuario);
})


router.delete('/:id', (req,res)=>{
    Usuario.findByIdAndRemove(req.params.id).then(usuario=>{
        if(usuario){
            return res.status(200).json({success:true,message:'The usuario was deleted'});
        }else{
            return res.status(404).json({success:false,message:'The usuario cannot be deleted'});
        }
    }).catch(err=>{
        return res.status(400).json({success:false,error:err})
    })
})

module.exports=router;