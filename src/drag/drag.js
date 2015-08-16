;define(['jquery', 'underscore'], function ($, u) {
    'use strict';
    var Drag = function (element, options) {
            var param = {};
            var _init = function(){
                $(element).bind("mousedown", _mousedown);
                $(document).bind("mouseup", _mouseup);
                
                
            };
            
            var _mousedown = function(event){
                /* 获取需要拖动节点的坐标 */
                var offset = $(this).offset();
                var offset_x = offset.left;//x坐标
                var offset_y = offset.top;//y坐标
                /*var offset_x = $(this)[0].offsetLeft;//x坐标
                var offset_y = $(this)[0].offsetTop;//y坐标*/
                /* 获取当前鼠标的坐标 */
                var mouse_x = event.pageX;
                var mouse_y = event.pageY;  
                param = {
                    offset_x:offset_x,
                    offset_y:offset_y,
                    mouse_x:mouse_x,
                    mouse_y:mouse_y
                };
                $(document).bind("mousemove", param , u.throttle(_mousemove, 30)); // 函数节流
                /*$(document).bind("mousemove", param , _mousemove);*/
            };
            
            var _mousemove = function(event){
                //debugger;
                /* 计算鼠标移动了的位置 */
                var _x = event.pageX - event.data.mouse_x;
                var _y = event.pageY - event.data.mouse_y;
                console.log(_x);
                 
                /* 设置移动后的元素坐标 */
                var now_x = (event.data.offset_x + _x ) + "px";
                var now_y = (event.data.offset_y + _y ) + "px";  
                console.log(now_x);                  
                /* 改变目标元素的位置 */
                $(element).css({
                    top:now_y,
                    left:now_x
                });
            };
            
            var _mouseup = function(){
                $(this).unbind("mousemove");
            };
            
            _init.call(this);
    };



    $.fn.draggable = function (options) {
        var len = this.length;
        return this.each(function(index) {
            var instance = new Drag(this, options);

        })
    };
})
/*;define(['jquery', 'underscore'], function ($, u) {
    'use strict';
    var Drag = function (element, options) {
    	var _ = this;
    	_.$element = $(element);
    	_.init();
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
})*/