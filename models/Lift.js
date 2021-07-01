'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

//var userSchema = mongoose.Schema( {any:{}})

var weightWorkout = Schema( {
  date: Date,
  exercise: String,
  weight: Number,
  reps: Number,
  userId: ObjectId
} );

module.exports = mongoose.model( 'Weights', weightWorkout );
