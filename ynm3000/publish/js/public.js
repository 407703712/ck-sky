$(function(){
	$(document).on('click','.icon-ul li',function(){
				$('.icon-ul li').removeClass('active');
				$(this).addClass('active');
	});
	function dropW(){
		var bodyW=$(".container").width();
		$(".drop-kaiguan").width(bodyW);
		$(".m-default-search-btn").click(function(event) {
			/* Act on the event */
			$(this).toggleClass('msearch-active-btn');
			$(".blue-sh").toggle();
			$(".drop-kaiguan").toggle();
		});
	}

	dropW();
	$(window).resize(function(event) {
		/* Act on the event */
		dropW();
	});	
})