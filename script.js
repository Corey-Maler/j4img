var stylesheet = {
  'leftArrow': {
    position: 'absolute',
    right: 0,
    width: '5px',
    bottom: 0,
    top: 0,
    background: 'rgba(0, 0, 0, .3)',
    cursor: 'col-resize'
  }
}


var leftArrow = document.getElementById('left');

for (var i in stylesheet.leftArrow){
  leftArrow.style[i] = stylesheet.leftArrow[i];
}

var bottomArrow = document.getElementById('bottom');
var imgs = document.getElementById('canv');
var bod = document.getElementsByClassName('editor')[0];
var imm = document.getElementById('canv_prev');
var cont = document.getElementsByClassName('container')[0];

var bodr = document.getElementsByTagName('body')[0];

var off = function(e) {
  bod.className = "editor";
  console.log('fuck of');
  return false;
}

if (bod.data.img) {
  alert('два хуя тебе!');
}

if (bod.getAttribute('data-img') === "") {
  alert('хуй тебе');
}
console.log(imgs.src);

imgs.draggable = false;
var isDragX = false;
var isDragY = false;
var isMove = false;
var oldX = 0;
var oldY = 0;

var left = 0;
var width = 800;
var minwidth = 520;

var height = 600;
var topa = 0;
var minheight = 520;

cont.onmousedown = function(e) {
  isMove = true;
  oldX = e.clientX;
  oldY = e.clientY;
  imm.className = "prev";
  e.stopPropagation();
}

leftArrow.onmousedown = function(e) {
  isDragX = true;
  console.log(e);
  oldX = e.clientX;
  imm.className = "prev";
  e.stopPropagation();
}

bottomArrow.onmousedown = function(e) {
  isDragY = true;
  oldY = e.clientY;
  imm.className = "prev";
  e.stopPropagation();
}

bodr.onmouseup = function() {
  isDragX = false;
  isDragY = false;
  isMove = false;
  imm.className = "prev hidden";
}

bodr.onmousemove = function(e) {
  //console.log('mouse move');
  if (isDragX) {
    var dx = e.clientX - oldX;
    oldX = e.clientX;
    width = Math.max(minwidth - left, width - dx);
    //width = Math.max(width)
    imgs.style.width = width + 'px';
    imm.style.width = width + 'px';
  }

  if (isDragY) {
    var dy = e.clientY - oldY;
    oldY = e.clientY;
    height = Math.max(minheight - topa, height - dy);
    //width = Math.max(width)
    imgs.style.height = height + 'px';
    imm.style.height = height + 'px';
  }

  if (isMove) {
    var dx = e.clientX - oldX;
    oldX = e.clientX;
    var dy = e.clientY - oldY;
    oldY = e.clientY;

    //console.log(dx);
    left = Math.min(0, left + dx);
    left = Math.max(- (width - minwidth), left);

    //console.log(dy);
    topa = Math.min(0, topa + dy);
    topa = Math.max(- (height - minheight), topa);

    //console.log(topa);

    imgs.style.left = left + 'px';
    imm.style.left = 0 + left + 'px';
    imgs.style.top = topa + 'px';
    imm.style.top = 0 + topa + 'px';
  }
}

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // Render thumbnail.
        // try to insert in ours img
        imgs.src = e.target.result;
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.

  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0, f; f = files[i]; i++) {
    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                '</li>');

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
              return function(e) {
                // Render thumbnail.
                // try to insert in ours img
                imgs.src = e.target.result;
              };
            })(f);

                // Read in the image file as a data URL.
            reader.readAsDataURL(f);
  }
  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

// http://www.html5rocks.com/en/tutorials/file/dndfiles/
// тут еще спиздить загрузку файла. Но это потом.

// http://stackoverflow.com/questions/13198131/how-to-save-a-html5-canvas-as-image-on-a-server
// тут как сохранять
