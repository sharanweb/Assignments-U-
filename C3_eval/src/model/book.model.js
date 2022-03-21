const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        likes:{type:Number, required: true, default:"0"},
        coverImage:{type:String, required: true},
        content:{type:String, required: true},
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required: true
        },
        publication_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"publication",
            required: true

        },
        comment_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"publication",
            required: true

        }
    },
    {
        versionKey: false,
        timestamps:true
    }
);

const Book = mongoose.model("book",bookSchema);

module.exports = Book;