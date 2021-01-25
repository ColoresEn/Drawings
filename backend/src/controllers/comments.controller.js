const commentsCtrl = {};
const mongoose = require('mongoose');
const  Comment = require('../models/Comment.js');

commentsCtrl.getComments = async  (req, res) => {
  const comments = await Comment.find();  
  res.json(comments);
}
commentsCtrl.createComment =async  (req, res) => {
         const {postername, message, date, email , topic } =  req.body;
         const newComment =new Comment({ 
             postername,
             message, 
             date,
             email,
             topic
         });
         await newComment.save();
         res.json({message: 'Commento guardada'});

}
commentsCtrl.getComment = async (req, res) =>{
  const comment = await Comment.findById(req.params.id);
  res.json(comment);

} 
commentsCtrl.updateComment = async (req, res) =>{
    const {postername, message,  date, email , topic } = req.body;       
  await Comment.findByIdAndUpdate(req.params.id, {postername, message, date, email , topic} );

  res.json({ message: 'Comment updated' })

} 
commentsCtrl.deleteComment = async (req, res) =>{
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Comment deleted' })

} 

module.exports = commentsCtrl;