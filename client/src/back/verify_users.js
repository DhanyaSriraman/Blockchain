var mongoose = require('mongoose');
var Schema = mongoose.Schema;

verifierSchema = new Schema( {
	username: String,
	password: String
}),
verifier = mongoose.model('verifier', verifierSchema);

module.exports = verifier;