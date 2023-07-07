const transectionModel =require('../models/transectionModel')
const moment = require('moment')

const getAllTransection = async(req,res)=>{
    try{
       const {frequency,selectedDate,type} = req.body
        const transection = await transectionModel.find({
          ...(frequency !== 'custom' ? {
            date: {
                $gt: moment().subtract(Number(frequency), "d").toDate(),
              },
          }:{
            date:{
                $gt: selectedDate[0],
                $lte:selectedDate[1]
            }
          }),
           userid:req.body.userid,
           ...(type !== 'all' && {type})
        })
        res.status(200).json(transection)
    }catch(error){
        res.status(500).send(error)
    }
}
const addTransection = async(req,res)=>{
    console.log('addTransection controller2--------')
    try{
        const transection = req.body
        const newTransection = new transectionModel(transection)
        await newTransection.save();
        res.status(201).send('Transection created')

    }catch(error){
        res.status(500).send(error)
    }
}
const editTransection =async(req,res)=>{
    try{
        const transection = await transectionModel.findOneAndUpdate({_id:req.body.transectionId},req.body.payload)
        res.status(200).send('Edited Successfully----')
    }catch(error){
        res.status(500).send(error.message)
    }
}
const deleteTransection = async(req,res)=>{
    console.log('deleteTransection-----')
    try{
        await transectionModel.findOneAndDelete({_id:req.body.transectionId})
        res.status(200).send('deleted succesfully')
    }catch(error){
        res.status(500).send(error.message)
    }
}

module.exports ={getAllTransection,addTransection,editTransection,deleteTransection}