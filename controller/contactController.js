const asyncHandler = require("express-async-handler")
const contact = require('../models/contactModel');

const getContact = asyncHandler( async (req,res)=>{
  const data = await contact.find({user_id: req.user.id})
  res.status(200).json({message: 'Get all contact' ,data})
})

const createContact = asyncHandler( async (req,res)=>{
  console.log('The request body '+req.body);
  const {name,email, phone} = req.body
  if( !name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    let data = await contact.create({
      name,
      email,
      phone,
      user_id:req.user.id});

  res.status(201).json(data)
})

const getOneContact = asyncHandler(  async (req,res)=>{
  const data = await contact.findById(req.params.id);
  if(!data)
    {
      res.status(400);
      throw new Error("Contact not found")
    }
  res.status(200).json(data)
})

const updateContact = asyncHandler(  async (req,res)=>{
  const data = await contact.findById(req.params.id);
  if (!data) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (data.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updatedContact = await contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(  async (req,res)=>{
  const data = await contact.findById(req.params.id);
  if (!data) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (data.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  await contact.deleteOne({ _id: req.params.id });
  res.status(200).json(data);
})

module.exports = {
  getContact,
  getOneContact,
  updateContact,
  deleteContact,
  createContact
}