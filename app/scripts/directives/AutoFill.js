app.directive('autoFill', function($timeout) {
	return {
		restrict: 'EA',
		scope: {
			autoFill: '&',
			ngModel: '=',
			timezone: '=',
			reslist: '='
		},
		compile: function(tEle, tAttrs) {
			//compile function
			var tplEl = angular.element(
				'<div class="typehead">' +
					'<input type="text" autocomplete="off" />' +
					'<ul id="autolist" ng-show="reslist">' +
						'<li ng-repeat="res in reslist"><span ng-click="setCurrentLocation(res)">{{res.formatted_address}}</span></li>' +
					'</ul>' +
				'</div>'
			);
			var input = tplEl.find('input');
			input.attr('type', tAttrs.type);
			input.attr('ng-model', tAttrs.ngModel)
			tEle.replaceWith(tplEl);

			return function(scope, ele, attrs, ctrl) {
				var minKeyCount = attrs.minKeyCount || 3, 
				timer,
      			input = ele.find('input');
				input.bind('keyup', function(e) { 
					val = ele.val();
					if(val.length == 0) {
						if(timer) $timeout.cancel(timer); 
						scope.reslist = null;
						scope.$apply();
						return;
					} else {
						if(timer) $timeout.cancel(timer); 
						timer = $timeout(function() {
							scope.autoFill()(val).then(function(data) {
								if (data && data.length > 0) { 
									scope.reslist = data; 
								}
							});
						},300);
					}
				});

			}
		}
	}
})