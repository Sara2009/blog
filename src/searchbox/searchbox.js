define(['jquery'], function ($) {
    'use strict';
    var SearchBox = function (element, options, model) {
        var _ = this;
        _.$element = $(element);
        var dataname = _.$element.data('datasource');
        options = options || {};
        $.extend(options, _.$element.data());
        _.options = $.extend($.extend({}, SearchBox.DEFAULT), options);
        
        if (dataname) {
            dataname = dataname.slice(1);
            _.options.datasource = model[dataname];
        }
       
        _.init();
    }

    SearchBox.DEFAULT = {
        dataType: 'local', // 两种值 local和ajax
        datasource: [],
        total: 0,
        cur: -1,
        isFloat: false // 两种值 true和false
    };


    SearchBox.prototype.init = function () {
        var _ = this;
        var o = _.options;
        _.$inputbox = $('<input type="text" class="searchbox"/>')
        o.isFloat ? _.$element.css({'position': 'relative'}) : '';
        _.$tipbox = $('<ul></ul>');
        _.$element.append(_.$inputbox);
        _.$element.append(_.$tipbox);
        o.uiId && _.$element.attr('id', o.uiId) ;
        o.isFloat ? _.$tipbox.css({'position': 'absolute'}) : '';
        _.$inputbox.on('keyup', function (e) {
            _.searchTip(e);
        });
       
        _.$tipbox.on('click', 'li', function (e) {
            _.liClickHandle(e);
        });
    };

    SearchBox.prototype.searchTip = function (e) {
        var _ = this;
        var o = _.options;
        e = e || window.event;
        var code = e.keyCode;
        var value = $.trim(_.$inputbox.val());
        var index;
        if ( o.total !== 0 && (code === 38 || code === 40)) {
            if (code === 38) {
                index = (o.cur + o.total - 1) % o.total;
            } else if (code === 40) {
                index = (o.cur + 1) % o.total;
            }
            _.$tipbox.children().eq(o.cur).removeClass('active');
            o.cur = index;
            _.$tipbox.children().eq(index).addClass('active');
        } else if (code === 13) {
            _.search();
        } else {
            if (value !== '') {
                _.formatTip(value);
            } else {
                o.total = 0;
                o.cur = -1;
                _.removeTip();
            }
            
        }
    };

    SearchBox.prototype.formatTip = function (value) {
        var _ = this;
        var o = _.options;
        if (o.dataType === 'local') {
            var data = _.filter(value);
            _.render(data);
        } else if (o.dataType === 'ajax') {
            if (typeof o.datasource === 'function') {
                o.datasource().done(function(data) {
                    if (data.status === 0) {
                        _.render(data.data);
                    }
                }).fail(function(){
                    alert('ajax getTipWords error')
                });
            }
        }
    };

    SearchBox.prototype.search = function () {
        // ajax
        alert('ajax search');
    };

    SearchBox.prototype.liClickHandle = function (e) {
        var _ = this;
        var o = _.options;
        var li = e.target;
        var $li = $(li);
        var value = li.innerText;
        _.$inputbox.val(value);
        _.$tipbox.children().removeClass('active');
        $li.addClass('active');
        o.cur = $li.prevAll().length;

       _.formatTip(value);

       // ajax
       _.search();

        
    };

    SearchBox.prototype.filter = function (value) {
        var _ = this;
        var o = _.options;
        var data = o.datasource || [];
        if (data instanceof Array && data.length > 0) {
            if (typeof data.filter === 'function') {
                return data.filter(function (item) {
                    return item.indexOf(value) > -1;
                });
            } else {
                var result = [];
                for (var i=0; i < data.length; i++) {
                    data[i].indexOf(value) > -1 ? result.push(data[i]) : '';
                }
                return result;
            }
            
        }
        return [];
    };

    SearchBox.prototype.removeTip = function () {
        var _ = this;
        var o = _.options;
        o.total = 0;
        o.cur = -1;
        _.$tipbox.removeClass('searchtip');
        _.$tipbox.html('');
    };

    SearchBox.prototype.render = function (data) {
        var _ = this;
        var i = 0;
        var tpl = [];
        var o = _.options;
        data = data || [];
        if (data instanceof Array && data.length > 0) {
            o.total = data.length;
            _.$tipbox.addClass('searchtip');
            for (; i<data.length; i++) {
                tpl.push('<li>' + data[i] + '</li>');
            } 
            _.$tipbox.html(tpl.join(''));
        } else {
            _.removeTip();
        }
    };

    SearchBox.prototype.depose = function () {
        var _ = this;
        _.$inputbox.off('keyup');
        _.$inputbox.remove();
        _.$tipbox.off('click');
        _.removeTip();
        _.$element.remove();
    };

   $.fn.searchbox = function (options, model) {
        var len = this.length;
        return this.each(function(index) {
            var instance = new SearchBox(this, options, model);

        })
    };
    return SearchBox;
});
