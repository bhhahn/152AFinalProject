'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

//var userSchema = mongoose.Schema( {any:{}})

var runWorkout = Schema( {
  date: Date,
  distance: Number,
  time: Number,
  rep: Boolean,
  reps: Number,
  userId: ObjectId
} );

module.exports = mongoose.model( 'Running', runWorkout );
