/**
 * Created by Зарема on 12.08.14.
 */
var tools = {
    supports_html5_storage: function(){
        try{
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch(e){
            return false;
        }
    },
    get_param: function(name, ls_prefix){
        var param = null;
        var source = null;
        var get_from_url = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]*)(\&?)", "i"));
        if(get_from_url != null && get_from_url[1] != undefined){
            param = get_from_url[1]
            source = 'url';
        } else{
            if(tools.supports_html5_storage() && localStorage[ls_prefix + '_' + name] != undefined){
                param = localStorage[ls_prefix + '_' + name];
                source = 'browser';
            }
        }
        return {value: param, source: source};
    }
}
var ecrm_url_root = '//nbforum.eventcrm.ru/', ecrm_api_url_root = ecrm_url_root + 'api/v1/'; /* ссылка на ваш кабинет в ecrm */
var event_id = 1688; /* ID вашего мероприятия в ecrm */
/*
 Get promocode
 */
var promocode = '';
var utm_source = location.search.match(new RegExp("[\?\&]utm_source=([^\&]*)(\&?)", "i"));
if(utm_source != null){
    utm_source = utm_source[1];
    promocode = 'utm_source=' + utm_source + '&utm_campaign=discount';
    if(tools.supports_html5_storage()){
        localStorage['em_promocode'] = promocode;
    }
} else{
    if(tools.supports_html5_storage()){
        if(localStorage['em_promocode'] != undefined){
            promocode = localStorage['em_promocode'];
        }
    }
}
/*
 Load data about delegations
 */
var code = tools.get_param('code', 'em');
if(code != undefined && code.value != null){
    $.get(ecrm_url_root + 'registrations/view/' + event_id + '/' + code.value + '?remote=1', function(data){
        $('.reg').html('<div class="reg-result">' + data.replace(new RegExp("<br>", 'g'), " ") + '</div>');
        $('html, body').animate({scrollTop: $('.reg').offset().top}, 300);
    });
} else{
    /*
     Load data about tickets
     */
    var select = $('.js-reg-form select[name="ticket"]');

    var setTickets = function(select, tickets){
        for(var i = 0; i < tickets.length; i++){
            $('select[name="ticket"]').append('<option id="option_' + tickets[i].id + '" value="' + tickets[i].id + '">' + tickets[i].title + ' - ' + tickets[i].price + 'руб.</option>');
        }
    };
	
    if(window['em_event_tickets'] != undefined){
        setTickets(select, window['em_event_tickets']);
    } else{
        $.get(ecrm_api_url_root + 'events/tickets/' + event_id + '?' + promocode, function(data){
            if(data.status == 'success'){
                window['em_event_tickets'] = data.tickets;
				
                setTickets(select, data.tickets);
            }
        });
    }
}

/*
 Save data from second form
 */
$(function(){
	document.getElementById("js-reg-form").reset();
	
	$('.js-reg-form').find(':submit').removeAttr('disabled');
	
	$('.js-reg-form').on('submit', function(e, onError){
		
		var params = {
			'_method': 'POST',
			data: {
				'Organization': {},
				'Member': [],
				'Account': [],
				'AccountsOrganization': []
			}
		}
		if($('#oname_turn').is(':checked')){
			params.data.Organization = {
				without: 1
			}
		} else{
			params.data.Organization = {
				title: $(this).find('input[name="oname"]').val()
			}
		}
		var tariff = $(this).find('select[name="ticket"]');
		var firstname = $(this).find('input[name="name[]"]');
		var lastname = $(this).find('input[name="surname[]"]');
		var email = $(this).find('input[name="email[]"]');
		var phone = $(this).find('input[name="phone[]"]');
		var post = $(this).find('input[name="post[]"]');
		
		var members_c = tariff.length;
		
		for(var i = 0; i < members_c; i++){
			params.data.Member[i] = {
				'ticket_id': tariff.eq(i).find('option:selected').val()
			};
			params.data.Account[i] = {
				'lastname': lastname.eq(i).val(),
				'firstname': firstname.eq(i).val(),
				'mobphone': phone.eq(i).val(),
				'email': email.eq(i).val()
			};
			
			params.data.AccountsOrganization[i] = {
				'post': post.eq(i).val()
			}
		}
		$(this).find(':submit').attr('disabled', 'disabled');
		$.post(ecrm_api_url_root + 'events/registration/' + event_id + '?' + promocode, params, function(data){
			if(data.status == 'success'){
				if(tools.supports_html5_storage()){
					localStorage['em_code'] = data.code;
				}
				$.get(ecrm_url_root + 'registrations/view/' + event_id + '/' + data.code + '?remote=1', function(data){
					$('.reg').html('<div class="reg-result">' + data.replace(new RegExp("<br>", 'g'), " ") + '</div>');
					$('html, body').animate({scrollTop: $('.reg').offset().top}, 300);
					localStorage.removeItem('em_code');
				});
			} else {
				if(onError != undefined){
					onError();
				}
				$('.js-reg-form').find(':submit').removeAttr('disabled');
			}
		}).fail(function(){
			if(onError != undefined){
				onError();
			}
			$('.js-reg-form').find(':submit').removeAttr('disabled');
		});

		return false;
	});
	
});