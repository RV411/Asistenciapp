const {Place}=require('../models/place.js');
const express=require('express');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken')
const router=express.Router();


router.get(`/`, async (req, res) =>{
    const placeList = await Place.find();

    if(!placeList) {
        res.status(500).json({success: false})
    } 
    res.send(placeList);
})

router.get('/:id', async(req,res)=>{
    const place = await Place.findById(req.params.id);

    if(!place) {
        res.status(500).json({message: 'The place was not found.'})
    } 
    res.status(200).send(place);
})

router.post('/register', async (req,res)=>{
    let place = new Place({
        nameChurch: req.body.nameChurch,
        street: req.body.street,
        apartment: req.body.apartment,
        cp: req.body.zip,
        city: req.body.city,
        dateAttendance: req.body.dateAttendance,
        numPersons: req.body.numPersons,
    })
    place = await place.save();

    if(!place)
    return res.status(400).send('The place cannot be created!')

    res.send(place);
})

router.put('/:id',async (req, res)=> {
    const place = await Place.findByIdAndUpdate(
        req.params.id,
        {
            nameChurch: req.body.nameChurch,
            street: req.body.street,
            apartment: req.body.apartment,
            cp: req.body.zip,
            city: req.body.city,
            dateAttendance: req.body.dateAttendance,
            numPersons: req.body.numPersons,
        },
        { new: true}
    )

    if(!place)
    return res.status(400).send('The place cannot be updated!')

    res.send(place);
})


router.delete('/:id', (req,res)=>{
    Place.findByIdAndRemove(req.params.id).then(place=>{
        if(place){
            return res.status(200).json({success:true,message:'The place was deleted'});
        }else{
            return res.status(404).json({success:false,message:'The place cannot be deleted'});
        }
    }).catch(err=>{
        return res.status(400).json({success:false,error:err})
    })
})

module.exports=router;