require.config({
    baseUrl: '../src',
    paths: {
        jquery: 'lib/jquery-1.11.3',
        searchbox: 'searchbox/searchbox',
        u: 'lib/underscore-1.8.3'
    }
});

require(['jquery'], function($) {
	$(function () {
		// searchbox
		var searchboxDoms = $('[data-ui-type="searchbox"]');
		if (searchboxDoms.length > 0) {
			require(['searchbox'], function (searchbox) {
				(function () {
					var me = this;
					me.datasource1 = ['abc', 'def', 'asd', 'aef', 'aws'];
					me.ajaxTipData = function () {
						return $.ajax({
							url: 'mockData/getTipWords.json',
							dataType: 'json',
							method: 'get'
						});
					};
					searchboxDoms.searchbox({}, me);
				})();
				
			});
			
		}

		
		// dragsort

	});
	
});