// Api model goes here.

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BearSchema = new Schema({
    name: String,
    date: { type: Date, default: Date.now },
});

module.export = mongoose.model('Bear', BearSchema);
