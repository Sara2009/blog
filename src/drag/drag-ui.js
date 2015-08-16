;define(['jquery', 'underscore'], function ($, u) {
    'use strict';
    var Drag = function (element, options) {
    	var _ = this;
    	_.$element = $(element);
    	_.init();
        console.log('uiuiuiuiui');
    };

    Drag.prototype.init = function () {
    	var _ = this;
    	_.$element.on('mousedown', _.mousedown.call(_));
    	$(document).on("mouseup", _.mouseup);
    };

    Drag.prototype.mousedown = function (element) {
    	var _ = this;
    	return function (e) {
    		console.log('mousedown:');
	    	e = e || window.event;
	    	// 获取需要拖动节点的坐标
	    	var offset_x = this.offsetLeft;
	    	var offset_y = this.offsetTop;
	    	// 获取当前鼠标的坐标 
	    	var mouse_x = e.pageX;
	    	var mouse_y = e.pageY;
	    	var args = {
	    		offset_x: offset_x,
	    		offset_y: offset_y,
	    		mouse_x: mouse_x,
	    		mouse_y: mouse_y
	    	};
	    	$(document).on("mouseover", args, u.throttle(_.mouseover.call(_),50));
    	}
    	

    };

    Drag.prototype.mouseover = function (element){
    	var _ = this;
    	return function (e) {
    		console.log('mouseover:');
    		e = e || window.event;
	    	var args = e.data;
	    	// 计算鼠标移动了的位置 
	    	var _x = e.pageX - args.mouse_x;
	    	var _y = e.pageY - args.mouse_y;
	    	// 设置移动后的元素坐标 
	    	var now_x = (args.offset_x + _x) + 'px';
	    	var now_y = (args.offset_y + _y) + 'px';
            console.log('_x:' + _x + ",_y:" + _y + ', now_x:' + now_x + ', now_y:' + now_y);
	    	_.$element.css({top: now_y, left: now_x});
    	}
    	

    };

    Drag.prototype.mouseup = function () {
    	console.log('mouseup:');
    	$(document).off('mouseover');
    	
    	
    }



    $.fn.draggable = function (options) {
        var len = this.length;
        return this.each(function(index) {
            var instance = new Drag(this, options);

        })
    };

    return Drag;
})