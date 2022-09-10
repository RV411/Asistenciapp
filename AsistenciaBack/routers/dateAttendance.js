const {DateAttendance}=require('../models/dateAttendance.js');
const express=require('express');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken')
const router=express.Router();


router.get(`/`, async (req, res) =>{
    const dateAttendanceList = await DateAttendance.find();

    if(!dateAttendanceList) {
        res.status(500).json({success: false})
    } 
    res.send(dateAttendanceList);
})

router.get('/:id', async(req,res)=>{
    const dateAttendance = await DateAttendance.findById(req.params.id);
    if(!dateAttendance) {
        res.status(500).json({message: 'The dateAttendance was not found.'})
    } 
    res.status(200).send(dateAttendance);
})

router.post('/register', async (req,res)=>{
    let dateAttendance = new DateAttendance({
        dateAttendance: req.body.dateAttendance,
        nameChurch: req.body.nameChurch        
    })
    dateAttendance = await dateAttendance.save();

    if(!dateAttendance)
    return res.status(400).send('The dateAttendance cannot be created!')

    res.send(dateAttendance);
})

router.put('/:id',async (req, res)=> {
    const dateAttendance = await DateAttendance.findByIdAndUpdate(
        req.params.id,
        {
            dateAttendance: req.body.dateAttendance,
            nameChurch: req.body.nameChurch,            
        },
        { new: true}
    )

    if(!dateAttendance)
    return res.status(400).send('The dateAttendance cannot be updated!')

    res.send(dateAttendance);
})


router.delete('/:id', (req,res)=>{
    DateAttendance.findByIdAndRemove(req.params.id).then(dateAttendance=>{
        if(dateAttendance){
            return res.status(200).json({success:true,message:'The dateAttendance was deleted'});
        }else{
            return res.status(404).json({success:false,message:'The dateAttendance cannot be deleted'});
        }
    }).catch(err=>{
        return res.status(400).json({success:false,error:err})
    })
})

module.exports=router;