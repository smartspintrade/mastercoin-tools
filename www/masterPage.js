
function NavigationController($scope, $http) {
    $scope.values = {};

    var myURLParams = BTCUtils.getQueryStringArgs();
    var title = myURLParams['title'].toString();
    $scope.title = title;
    $scope.footer = "FOOTER";
    $scope.getNavData = function () {

        $scope.values = {};
        // Make the http request and process the result
        $http.get('values.json', {}).success(function (data, status, headers, config) {

            $scope.values = data;
        });
		
	console.log($scope.values);

        // Make the http request and process the result
        $http.get('revision.json', {}).success(function (data, status, headers, config) {
            $scope.revision=data;
            var line = "Last blockchain scan: "+data['last_parsed']+" using revision "+  
            data['commit_hexsha']+" ("+data['commit_time']+")."
	    $scope.footer=line;
        });
    }
}

$(document).ready(function () {
    var footerHeight = $('footer').height();
   // console.log(footerHeight);
    var headerHeight = $('header').height();
   // console.log(footerHeight);
    var windowHeight = $(window).height();
   // console.log(windowHeight);

    var maxContentHeight = windowHeight - footerHeight - headerHeight - 70;
   // console.log(maxContentHeight);

    var contentHeight = $('.no-fixed').height();
   // console.log(contentHeight);

    if (contentHeight < maxContentHeight) {
        $('.fixed').css('height', maxContentHeight);
    }
    else{
        $('.fixed').css('height', contentHeight);
    }

	// Putting footer at end of page
	$('.no-fixed').css('height', maxContentHeight);
	
     $(window).resize(function () {
		 var height = $(window).height() - footerHeight - headerHeight - 70;
		
		$('.fixed').css('height', height);
			
		if(height > $('.inner').height){
			
				$('.no-fixed').css('height', height);
			}
     });
	 
});
