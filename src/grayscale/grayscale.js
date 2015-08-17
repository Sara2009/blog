;define(['jquery'], function ($) {

	var GrayScale = function (element, options) {
		var _ = this;
		options = options || {};
		_.o = $.extend($.extend({}, options), GrayScale.DEFAULT);
		_.$element = $(element);
		_.init();
	}

	GrayScale.prototype.init = function () {
		var _ = this;
		var o = _.o;
		o.original = o.original || 'show';
		if (o.original === 'show') {
			_.$element.wrap('<div class="grayscale-wrapper"></div>');
			var img = $('<img width="' +  _.$element.width() + '" height="' + _.$element.height() + '" class="' + _.$element.attr('class') + '"/>');
			img.attr('src', grayscale(_.$element.attr('src')));
			_.$element.parent().append(img);
		}
		
		
	}

	GrayScale.DEFAULT = {
		original: 'show',
	}

	// Grayscale w canvas method
    function grayscale(src){
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var imgObj = new Image();
        imgObj.src = src;
        canvas.width = imgObj.width;
        canvas.height = imgObj.height;
        ctx.drawImage(imgObj, 0, 0);
        var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for(var y = 0; y < imgPixels.height; y++){
            for(var x = 0; x < imgPixels.width; x++){
                var i = (y * 4) * imgPixels.width + x * 4;
                var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                imgPixels.data[i] = avg;
                imgPixels.data[i + 1] = avg;
                imgPixels.data[i + 2] = avg;

                // add black border    
	            if(x < 8 || y < 8 || x > (imgPixels.width - 8) || y > (imgPixels.height - 8)) {    
	                imgPixels.data[i + 0] = 0;    
	                imgPixels.data[i + 1] = 0;    
	                imgPixels.data[i + 2] = 0;    
	            } 
            }
        }
        ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
        return canvas.toDataURL();
    }


	$.fn.grayscale = function (options) {
        var len = this.length;
        return this.each(function(index) {
            var instance = new GrayScale(this, options);

        })
    };

})