(function($){

	$.fn.popUp = function(options){
	
		var obj, 
			bg, 
			cont, 
			container, 
			close_button,
			options = $.extend({
				time: 700,
				width: "",
				height: "",
				closeClass: "pop_close",
				closeText: ""
		}, options);

		var make = function(){
			obj = $(this);
			$(obj).hide();
			
			bg = document.createElement("div");
			$(bg).hide().addClass("popup_bg");
			
			cont = document.createElement("div");
			$(cont).hide().addClass("popup");
			
			container = document.createElement("div");
			$(container).addClass("popup_window");
			
			if(options.width != ""){
				$(container).width(options.width);
			}
			
			if(options.height != ""){
				$(container).height(options.height);
			}
			
			close_button = document.createElement("div");
			
			if(options.closeClass != ""){
				$(close_button).addClass(options.closeClass);
			} else {
				$(close_button).addClass("close_button");
			}
			
			
			$(close_button).html('<img src="svg/close.svg">');
			
			
			$(close_button).click(function(){
				close();
			});
			
			$(container).prepend(close_button);
			$(container).append(obj);
			
			$(cont).append(container);
			
			$(obj).show();
			
			
			$(document.body).prepend(bg).prepend(cont);
			
			open();
		};

		
		var close = function(){
			$(bg).fadeTo(options.time, 0, function(){
				$(this).hide();
			});
			
			$(cont).removeClass("shown").fadeTo(options.time,0, function(){
				$(this).hide();
			});
		}
		
		var open = function(){
		
			$(bg).fadeTo(options.time, 0.6, function(){});
			$(cont).css("top", $(window).scrollTop());
			$(cont).fadeTo(options.time, 1, function(){}).addClass("shown");
		}
		
		var scroll = function(){
			$(cont).css("top", $(window).scrollTop());
		};
		
		return $(this).each(make);
	}

})(jQuery);
