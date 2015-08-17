require.config({
    baseUrl: '../src',
    paths: {
        jquery: 'lib/jquery-1.11.3',
        underscore: 'lib/underscore-1.8.3',
        searchbox: 'searchbox/searchbox',
        facebox: 'facebox/facebox'
    }
});

require(['jquery'], function($, u, sb) {
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

		
		// facebox
		var faceboxDoms = $('[data-ui-type="facebox"]');
		if (faceboxDoms.length > 0) {
			require(['facebox'], function (modal) {
				(function () {
					faceboxDoms.facebox();
				})();
			});
		}

	});
	
});