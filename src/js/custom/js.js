scrolling = false;

$(function(){
	$(".topmenu .topmenu_a a, #book_button").click(function(){
		
		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top + "px"
		}, 1000	, function(){
			scrolling = false;
		});
		return false;

	});
	
	$(window).scroll(function(){
		if(!scrolling){
			var of = $("#about").offset();
			var wh = $(window).scrollTop() + $(window).height()*0.3;
			
			if(wh < of.top){
				$(".topmenu .topmenu_a").removeClass("active");
			} else {
				$(".in_menu_block").each(function(k,e){
					
					of = $(e).offset();
					
					wh = $(window).scrollTop() + $(window).height()*0.75;
					
					if(wh >= of.top){
						$(".topmenu .topmenu_a").removeClass("active");
						$("#" + $(this).attr("id") + "_link").addClass("active");
					}
				});
			}
		}
		
		//parallax
		
		sct = $(window).scrollTop();
		oft = $("#blackpic_pic").offset().top;
		
		pos = 50 + (1 - (oft/sct))*30;
		$("#blackpic_pic").css("background-position", "50% " + pos + "%");
	});
	
	$(window).scroll();
});


function openSpeaker(elem){
	
	$($(elem).attr("href") + "_block").popUp();
	
}

function openRegister(elem, value){
	
	if(value != ""){
		opt = document.getElementById("option_" + value);
		opt.selected = true;
	}
	
	$($(elem).attr("href") + "_block").popUp();
	
}