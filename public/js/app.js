
//Blast Seat form (pic [need devevelopment], length/width/depth)



function handleAddFileClick() {
  console.log("Baby steps...");
  setFormData({});
  toggleAddFileFormVisibility();
}

function toggleAddFileFormVisibility() {
  $('#form-container').toggleClass('hidden');
}

function submitFileForm() {
 console.log("You clicked 'submit'. Congratulations.");

 const fileData = {
   image: $('#file-image').val(),
   length: $('#file-length').val(),
   width: $('#file-width').val(),
   depth: $('#file-depth').val(),
   _id: $('#file-id').val(),
 };

 let method, url;
if (fileData._id) {
  method = 'PUT';
  url = '/api/file/' + fileData._id;
} else {
  method = 'POST';
  url = '/api/file';
}

$.ajax({
  type: method,
  url: url,
  data: JSON.stringify(fileData),
  dataType: 'json',
  contentType : 'application/json',
})
  .done(function(response) {
    console.log("We have posted the data");
    refreshFileList();
    toggleAddFileFormVisibility();
  })
  .fail(function(error) {
    console.log("Failures at posting, we are", error);
  })


 console.log("Your file data", fileData);
}

function cancelFileForm() {
  console.log("You clicked 'cancel'. Congratulations.");
  toggleAddFileFormVisibility();
}

$.ajax({
  type: "POST",
  url: '/api/file',
  data: JSON.stringify(fileData),
  dataType: 'json',
  contentType : 'application/json',
})
  .done(function(response) {
    console.log("We have posted the data");
    refreshFileList();
    toggleAddFileFormVisibility();
  })
  .fail(function(error) {
    console.log("Failures at posting, we are", error);
  });

  function handleEditFileClick() {
  console.log("I will edit for you!");
}

function refreshFileList() {
  const template = $('#list-template').html();
  const compiledTemplate = Handlebars.compile(template);

  getFiles()
    .then(files => {

      window.fileList = files;

      const data = {files: files};
      const html = compiledTemplate(data);
      $('#list-container').html(html);
    })
}

function handleEditFileClick(id) {
  const file = window.fileList.find(file => file._id === id);
  if (file) {
    $('#file-title').val(file.title);
    $('#file-description').val(file.description);
    $('#file-id').val(file._id);
    setFormData(file);
    toggleAddFileFormVisibility();
  }
}

function handleDeleteFileClick(id) {
  if (confirm("Are you sure?")) {
    deleteFile(id);
  }
}

function deleteFile(id) {
  $.ajax({
    type: 'DELETE',
    url: '/api/file/' + id,
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      console.log("File", id, "is DOOMED!!!!!!");
      refreshFileList();
    })
    .fail(function(error) {
      console.log("I'm not dead yet!", error);
    })
}

function setFormData(data) {
  data = data || {};

  const file = {
    title: data.title || '',
    description: data.description || '',
    _id: data._id || '',
  };

  $('#file-title').val(file.title);
  $('#file-description').val(file.description);
  $('#file-id').val(file._id);
}

/* explosive chart - not yet working right, so omited */

/*
function getExplosiveTable(){
  return { //values in the table are from IATG 01.80, Clause 7.2
          "almatol": {"name": "Almatol",
                      "peakPressureTNTEquiv": 0.99,
                      "impulseTNTEquiv": 0.98,
                      "gurneyEnergy": 1886,
                      "pressureRange": ""},
          "compositionb":	{"name":	"Composition B",
                      "peakPressureTNTEquiv":	1.11,
                      "impulseTNTEquiv":	0.98,
                      "gurneyEnergy":  2774,
                      "pressureRange":	"0.035 - 0.350"},
          "compositionc3": {"name":	"Composition C3",
                      "peakPressureTNTEquiv":	1.08,
                      "impulseTNTEquiv":	1.01,
                      "gurneyEnergy":   2682,
                      "pressureRange":	"0.035 - 0.350"},
          "compositionc4": {"name":	"Composition C4",
                      "peakPressureTNTEquiv":	1.37,
                      "impulseTNTEquiv":	0.19,
                      "gurneyEnergy": 2530,
                      "pressureRange":	"0.070 - 0.700"},
          "hmx": {"name": "HMX",
                      "peakPressureTNTEquiv": 1.02,
                      "impulseTNTEquiv": 1.03,
                      "gurneyEnergy":  2972,
                      "pressureRange":  ""},
          "octol": {"name":	"Octol 75/25",
                      "peakPressureTNTEquiv":	1.06,
                      "impulseTNTEquiv":	1.06,
                      "gurneyEnergy":  2896,
                      "pressureRange":	""},
          "petn": {"name":	"PETN",
                      "peakPressureTNTEquiv":	1.27,
                      "impulseTNTEquiv":	1.11,
                      "gurneyEnergy": 2926,
                      "pressureRange":	"0.035 - 0.700"},
          "rdx": {"name":	"RDX",
                      "peakPressureTNTEquiv":	1.14,
                      "impulseTNTEquiv":	1.09,
                      "gurneyEnergy": 2926,
                      "pressureRange":	""},
          "rdxtnt": {"name":	"RDX/TNT 60/40 (Cyclotol)",
                      "peakPressureTNTEquiv":	1.14,
                      "impulseTNTEquiv": 1.09,
                      "gurneyEnergy":  2402,
                      "pressureRange":	"0.035 - 0.350"},
          "tetryl": {"name":	"Tetryl",
                      "peakPressureTNTEquiv":	1.07,
                      "impulseTNTEquiv":	1.05,
                      "gurneyEnergy": 2499,
                      "pressureRange":	"0.021 - 0.140"},
          "tnt": {"name":	"TNT",
                      "peakPressureTNTEquiv":	1.0,
                      "impulseTNTEquiv":	1.0,
                      "gurneyEnergy":  2438,
                      "pressureRange": "Standard"},
          "tritonal":{"name": "Tritonal",
                      "peakPressureTNTEquiv":	1.07,
                      "impulseTNTEquiv": 0.96,
                      "gurneyEnergy": 2316,
                      "pressureRange":	"0.035 - 0.700"}
  }
}
*/







/*previous version saved to prevent perminant loss of something I may need in a few hours...*/

/*
function getFiles() {
  return $.ajax('/api/file')
    .then(res => {
      console.log("Results from getFiles()", res);
      return res;
    })
    .fail(err => {
      console.error("Error in getFiles()", err);
      throw err;
    });
}

function refreshFileList() {
  const template = $('#list-template').html();
  const compiledTemplate = Handlebars.compile(template);

  getFiles()
    .then(files => {

      window.fileList = files;

      const data = {files: files};
      const html = compiledTemplate(data);
      $('#list-container').html(html);
    })
}

function handleAddFileClick() {
  console.log("Baby steps...");
  setFormData({});
  toggleAddFileFormVisibility();
}

function toggleAddFileFormVisibility() {
  $('#form-container').toggleClass('hidden');
}

function submitFileForm() {
  console.log("You clicked 'submit'. Congratulations.");

  const fileData = {
    length: $('#file-length').val(),
    width: $('#file-width').val(),
    description: $('#file-description').val(),
    _id: $('#file-id').val(),
  };

  let method, url;
  if (fileData._id) {
    method = 'PUT';
    url = '/api/file/' + fileData._id;
  } else {
    method = 'POST';
    url = '/api/file';
  }

  $.ajax({
    type: method,
    url: url,
    data: JSON.stringify(fileData),
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      console.log("We have posted the data");
      refreshFileList();
      toggleAddFileFormVisibility();
    })
    .fail(function(error) {
      console.log("Failures at posting, we are", error);
    })

  console.log("Your file data", fileData);
}

function cancelFileForm() {
  toggleAddFileFormVisibility();
}

function handleEditFileClick(id) {
  const file = window.fileList.find(file => file._id === id);
  if (file) {
    setFormData(file);
    toggleAddFileFormVisibility();
  }
}


function setFormData(data) {
  data = data || {};

  const file = {
    length: data.length || '',
    description: data.description || '',
    _id: data._id || '',
  };

  $('#file-length').val(file.length);
  $('#file-width').val(file.width);
  $('#file-description').val(file.description);
  $('#file-id').val(file._id);
}

function handleDeleteFileClick(id) {
  if (confirm("Are you sure?")) {
    deleteFile(id);
  }
}

function deleteFile(id) {
  $.ajax({
    type: 'DELETE',
    url: '/api/file/' + id,
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      console.log("File", id, "is DOOMED!!!!!!");
      refreshFileList();
    })
    .fail(function(error) {
      console.log("I'm not dead yet!", error);
    })
}

refreshFileList();
*/
