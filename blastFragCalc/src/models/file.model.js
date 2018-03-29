// Load mongoose package

//changed const to var
var mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  title: String,
  description: String,
  created_at: { type: Date, default: Date.now },
  deleted: {type: Boolean, default: false},
});

// Import all models
// this throws a module.js:557 throw err;
//require('./models/file.model.js');

const File = mongoose.model('File', FileSchema);

File.count({}, function(err, count) {
  if (err) {
    throw err;
  }

  if (count > 0) return ;

//took out './file.seed.json'
const files = require();
  File.create(files, function(err, newFiles) {
    if (err) {
      throw err;
    }
    console.log("DB seeded")
  });

});

module.exports = File;

//added
//module.exports = mongoose.model('File', FileSchema)
