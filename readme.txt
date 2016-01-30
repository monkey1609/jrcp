this is a h5/js demo for resize and compress image to jpg.

when we select one image file in mobile, the file maybe too large 
to upload to server , so we need resize and compress it. 
this demo do it.

if has any question in use, please feedback me on github, thanks.

the method is simple:
step1:
 you need import the frcp.js, such as use:

<script src="js/jrcp.js"></script>

step2:

 you need to change the file object to the image object;

var result = this.result;
var img = new Image();
img.src = result;

step3:
  
   call the resizeAndCompress method in the jrcp.js to compress
the image.

you can find the detail in the source code. thanks!
