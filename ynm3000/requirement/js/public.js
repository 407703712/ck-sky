$(function(){
	$(document).on('click','.icon-ul li',function(){
				$('.icon-ul li').removeClass('active');
				$(this).addClass('active');
	});
	function dropW(){
		var bodyW=$(".container").width();
		$(".drop-kaiguan").width(bodyW);
		$(".second-brand").click(function(event) {
			/* Act on the event */
			event.stopPropagation();
			$(this).find('.m-default-search-btn').toggleClass('msearch-active-btn');
			$(".blue-sh").toggle();
			$(".drop-kaiguan").toggle();
		});
	}

	dropW();
	$(".drop-kaiguan").click(function(event) {
		/* Act on the event */
		event.stopPropagation();
	});
	$(window).resize(function(event) {
		/* Act on the event */
		dropW();
	});	
})