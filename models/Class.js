const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  name: {
    type: String,
    unique: true, //bu isimden sadece bir veri istiyorsak yazacağız
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  user: {
    //kurslarla kategori bağlantılı olacağı için course.js modelinin içine Category.js modelini import etmemiz gerek
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
//bununla url kısmında beraber id yerine name gözükecek
ClassSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    // burada slug ile name'i eşitliyor
    lower: true,
    strict: true, //name'de gereksiz karakterleri siler (- :) gibi
  });
  next();
});

const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;
