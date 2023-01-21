var mongoose = require('mongoose');
var Schema = mongoose.Schema;

studentSchema = new Schema( {
	username: String,
	password: String
}),
student = mongoose.model('student', studentSchema);

module.exports = student;