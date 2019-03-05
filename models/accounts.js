let mongoose = require('mongoose');
let validator = require('validator');
const bcrypt = require('bcrypt');

let accountSchema = new mongoose.Schema({
	username:{
				type:String,
				required:true,
				unique:true

			},

	email: {
				type:String,
				required:true,
				unique:true

			},
	password:{

				type:String,
				required:true
			}
});