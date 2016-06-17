$(function(){
	var scrolling = false;

	// Показ всех спикеров
	$("#all-speakers").on('click', function (e) {
		e.preventDefault();
		var hiddenSpeakers = $('.speakers--hidden'),
			showSpeakers = $(this);
		hiddenSpeakers.slideToggle(400, function(){
			if ($(this).is(':hidden')) {
				showSpeakers.html('Все спикеры');
			}
			else {
				showSpeakers.html('Скрыть');
			}
		});
	});

	//Плавный скролл

	$(".main-nav__link, .buy-ticket, #book_button").click(function(e){
		e.preventDefault();
		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top + "px"
		}, 1000	, function(){
			scrolling = false;
		});
		return false;
	});

	//Активный класс у ссылок

	$(window).scroll(function(){
			$(".in_menu_block").each(function () {
				var scrollTop = $(window).scrollTop(),
					currentTop = $(this).offset().top,
					thisId = $(this).attr('id'),
					menuItem = $('.main-nav__item'),
					thisHeight = $(this).outerHeight(),
					currentBottom = currentTop + thisHeight,
					thisLink = $("#" + thisId + "__link");

				if (scrollTop >= currentTop - 50 && scrollTop < currentBottom){
					console.log('adding active class');
					menuItem.removeClass('main-nav__item--active');
					thisLink.addClass("main-nav__item--active");
				} else if (scrollTop < currentTop || scrollTop > currentBottom) {
					console.log('removing active class');
					thisLink.removeClass("main-nav__item--active");
				}
			});

		//parallax
		sct = $(window).scrollTop();
		oft = $("#parallax_pic").offset().top;

		pos = 50 + (1 - (oft/sct))*30;
		$("#parallax_pic").css("background-position", "50% " + pos + "%");

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