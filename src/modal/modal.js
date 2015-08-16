;require(['jquery'], function ($) {
	var Modal = function (element, options) {
		var _ = this;
		_.o = options;
		_.$element = $(element);
		_.$modal = $('#' + _.o.modalId);
		_.init();
	};

	Modal.prototype.init = function () {
		var _ = this;
		_.$element.on('click', function () {
			_.render();
		});
	};


	Modal.prototype.render = function () {
		var _ = this;
		var windowWidth = $(document).width();
		var windowHeight = $(document).height();
		var modalWidth = _.$modal.width();
		var modalHeight = _.$modal.height();
		$('<div></div>').addClass('modal-backup')   
        	.width(windowWidth + document.body.scrollWidth)   
            .height(windowHeight + document.body.scrollHeight)   
            .click(function() {
            	_.hide.call(_);
            })   
            .prependTo(_.$modal)   
            .fadeIn(100); 
        _.$modal.find('.modal-dialog').css({
        	'position': 'absolute',
        	'left': windowWidth/2-modalWidth/2,
        	'top': 50,
        	'z-index': 1
        });
        _.$modal.show();
	};

	Modal.prototype.hide = function () {
		var _ = this;
		$('.modal-backup').remove();
		_.$modal.hide();
		
		
	};

	$.fn.modal = function (options) {
        var len = this.length;
        return this.each(function(index) {
            var instance = new Modal(this, options);

        })
    };

	return Modal;

});