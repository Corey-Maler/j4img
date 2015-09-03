(function() {
var createElement = function(p, className) {
  var node = document.createElement(p);
  node.className = "j4img_"+className;
  return node;
}

var welcomeHTML = "Drag and drop your image here<br /><small>or just click here</small>";

window.j4img = function(img_dom) {
  console.group('j4img init');
  console.log('img_dom', img_dom);

  var Parent = img_dom.parentNode;
  Parent.removeChild(img_dom);

  var Editor = createElement('div', 'editor');
  //Editor.appendChild(img_dom);
  // TODO: inheret from image params

  /// if not img.data-src

  var Dropzone = createElement('div', 'dropzone');
  var DropzoneLabel = createElement('p', 'dropzone__p');
  DropzoneLabel.innerHTML = welcomeHTML;
  Dropzone.appendChild(DropzoneLabel);
  if (1 || false) {
    Editor.appendChild(Dropzone);
  }

  var EditButton = createElement('b', 'edit_button');
  EditButton.innerHTML = "Edit";
  Editor.appendChild(EditButton);

  var Big = createElement('div', 'big');
  var PrevContainer = createElement('div', 'prev__container');
  var ImgPrev = createElement('img', 'prev hidden')
  ImgPrev.draggable = false;
  ImgPrev.src = 'img.png';
  PrevContainer.appendChild(ImgPrev);
  Big.appendChild(PrevContainer);
  this.ImgPrev = ImgPrev;

  var Container = createElement('div', 'container');
  var Img = img_dom;
  Img.draggable = false;
  Container.appendChild(Img)
  this.Img = Img;

  var LeftDrag = createElement('div', 'left');
  var BottomDrag = createElement('div', 'bottom');
  Container.appendChild(LeftDrag);
  Container.appendChild(BottomDrag);
  Big.appendChild(Container);

  Big.appendChild(createElement('div', 'bla'));

  var ApplyButton = createElement('b', 'apply_button');
  ApplyButton.innerHTML = 'Save';

  Big.appendChild(ApplyButton);

  var FileUploader = createElement('input', 'file_upload');
  FileUploader.setAttribute('type', 'file');

  Editor.appendChild(FileUploader);
  Editor.appendChild(Big);
  Parent.appendChild(Editor);

  console.groupEnd();

  console.group('j4img vars');
  var editMode = false;
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
  console.groupEnd();

  console.group('j4img logic');
  // select file
  Dropzone.onclick = function() { FileUploader.click(); };



  FileUploader.addEventListener('change', handleFileSelect, false);

  EditButton.onclick = on;
  ApplyButton.onclick = off;

  LeftDrag.onmousedown = function(e) {
    isDragX = true;
    console.log(e);
    oldX = e.clientX;
    ImgPrev.className = "j4img_prev";
    e.stopPropagation();
  }

  BottomDrag.onmousedown = function(e) {
    isDragY = true;
    oldY = e.clientY;
    ImgPrev.className = "j4img_prev";
    e.stopPropagation();
  }

  Container.onmousedown = function(e) {
    if (editMode) {
      isMove = true;
      oldX = e.clientX;
      oldY = e.clientY;
      ImgPrev.className = "j4img_prev";
      e.stopPropagation();
    }
  }

  var bodr = document.getElementsByTagName('body')[0];
  bodr.onmousemove = function(e) {
    //console.log('mouse move');
    if (isDragX) {
      var dx = e.clientX - oldX;
      oldX = e.clientX;
      width = Math.max(minwidth - left, width - dx);
      //width = Math.max(width)
      Img.style.width = width + 'px';
      ImgPrev.style.width = width + 'px';
    }

    if (isDragY) {
      var dy = e.clientY - oldY;
      oldY = e.clientY;
      height = Math.max(minheight - topa, height - dy);
      //width = Math.max(width)
      Img.style.height = height + 'px';
      ImgPrev.style.height = height + 'px';
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

      Img.style.left = left + 'px';
      ImgPrev.style.left = left + 'px';
      Img.style.top = topa + 'px';
      ImgPrev.style.top = topa + 'px';
    }
  }

  bodr.onmouseup = function() {
    isDragX = false;
    isDragY = false;
    isMove = false;
    ImgPrev.className = "j4img_prev hidden";
  }


  function handleFileSelects(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      /*
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
      */
      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
            Img.src = e.target.result;
            ImgPrev.src = e.target.result;
            hideDropzone();
          };
        })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  function handleDragOver(evt) {
    DropzoneLabel.innerHTML = "Drop file";
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  function handleDragLeave(evt) {
    DropzoneLabel.innerHTML = "Drop file here<br /><small>Or just click</small>";
  }

  Dropzone.addEventListener('dragover', handleDragOver, false);
  Dropzone.addEventListener('drop', handleFileSelects, false);
  Dropzone.addEventListener('dragleave', handleDragLeave, false);


  console.groupEnd();

  // defenitions
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
          Img.src = e.target.result;
          ImgPrev.src = e.target.result;
          hideDropzone();
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  function hideDropzone() {
    Dropzone.style.opacity = 0;
    setTimeout(function() {
      Dropzone.style.display = 'none';
    }, 500);
  }

  function on() {
    editMode = true;
    Editor.className = 'j4img_editor on';
    LeftDrag.style.display = 'block';
    BottomDrag.style.display = 'block';
  }

  function off() {
    editMode = false;
    Editor.className = 'j4img_editor';
    LeftDrag.style.display = 'none';
    BottomDrag.style.display = 'none';
  }
}

})();
// http://www.html5rocks.com/en/tutorials/file/dndfiles/
// тут еще спиздить загрузку файла. Но это потом.

// http://stackoverflow.com/questions/13198131/how-to-save-a-html5-canvas-as-image-on-a-server
// тут как сохранять
