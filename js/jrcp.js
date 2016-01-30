/**
 *@des use canvas to resize and compress the image file
  * @param img: the source image object
 * @param quality: the jpg quality , between 0-1, such as 0.85, equalt 85%
 * @param maxsize: the src image's max size, it will resize if src image big than maxsize, such as 800*600
 * @returns the base64 string of the destination image, include content-type
 */
function resizeAndCompress(imageSrc, quality, maxsize) {

        var memCanvas = document.createElement("canvas");
        var canvasContent = memCanvas.getContext('2d');
        
        //slice canvas
        var sliceConvas = document.createElement("canvas");
        var sliceContext = sliceConvas.getContext("2d");
        
        //var maxsize = 800 * 600;

        var srcSize = imageSrc.src.length;
        var width = imageSrc.width;
        var height = imageSrc.height;
        
        //if the image big than the maxsize pixels, will resize it by proportion
        var ratio;
        if ((ratio = width * height / maxsize)>1) {
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        }else {
            ratio = 1;
        }

        memCanvas.width = width;
        memCanvas.height = height;

        canvasContent.fillStyle = "#fff";
        canvasContent.fillRect(0, 0, canvasContent.width, canvasContent.height);
        
        //if the image size is too big , draw it by slice and slice
        var count;
        if ((count = width * height ) > (512*512)) {
            count = ~~(Math.sqrt(count)+1); //计算要分成多少块瓦片
            
            var nw = ~~(width / count);
            var nh = ~~(height / count);
            
            sliceConvas.width = nw;
            sliceConvas.height = nh;
            
            for (var i = 0; i < count; i++) {
                for (var j = 0; j < count; j++) {
                    sliceContext.drawImage(imageSrc, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                    canvasContent.drawImage(sliceConvas, i * nw, j * nh, nw, nh);
                }
            }
        } else {
            canvasContent.drawImage(imageSrc, 0, 0, width, height);
        }
        
        //compress by jpeg format
        var imageDes = memCanvas.toDataURL('image/jpeg', quality);
        
        console.log('src size：' + srcSize);
        console.log('des size：' + imageDes.length);

        sliceConvas.width = 0;
        sliceConvas.height = 0;
        memCanvas.width = 0;
        memCanvas.height = 0;
        
        return imageDes;
    }