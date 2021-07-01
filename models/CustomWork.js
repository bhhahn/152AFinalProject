'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

//var userSchema = mongoose.Schema( {any:{}})

var customWorkout = Schema( {
  date: Date,
  exercise: String,
  time: Number,
  rep: Boolean,
  reps: Number,
  userId: ObjectId
} );

module.exports = mongoose.model( 'CreateYOwn', customWorkout );
