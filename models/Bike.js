'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

//var userSchema = mongoose.Schema( {any:{}})

var bikeWorkout = Schema( {
  date: Date,
  distance: Number,
  startedAt: Number,
  completedAt: Number,
  userId: ObjectId
} );

module.exports = mongoose.model( 'Biking', bikeWorkout );
