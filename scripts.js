function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
		
$(document).ready(function() {
	
	$('.intro span').typed({
        strings: ['Donald Trump and Republicans are plotting to take away our health coverage, hike our costs, and put us at the mercy of private health insurance corporations.'],
        typeSpeed: 0,
        onStringTyped: function() {
	        setTimeout(function() {
		        $('.subhead .typed-cursor').hide();
		        question_typing();
		    }, 1000);
        },
        contentType: 'text'
    });
    
    var question_typing = function() {
	    $('.question span').typed({
	        strings: ['What do you want to tell them?'],
	        typeSpeed: 0,
	        onStringTyped: function() {
		        setTimeout(function() {
			        $('.question .typed-cursor').hide();
			        hero_typing();
			    }, 1000);
			    
			    
	        },
	        contentType: 'text'
	    });
	}
	
	var hero_typing = function() {
	    $('.hero_content span.hero_typing').typed({
	        strings: ['Don\'t take away health care from '],
	        typeSpeed: 50,
	        onStringTyped: function() {
		        $('.hero_content .typed-cursor').hide();
		        hero_typing_deletes();  
	        },
	        contentType: 'text'
	    });
	}
	
	var hero_typing_deletes = function() {
	    $('.hero_content span.hero_typing_deletes').typed({
	        strings: ['my mother.','my father.','my son.','me.',''],
	        typeSpeed: 50,
	        backSpeed: 50,
	        callback: function() {
		        $('.hero_content .typed-cursor').hide();
		        $('.hero_typing_deletes').append('<input class="hero_input hidden" type="text" placeholder="type your own" />');
		        $('.hero_input').fadeIn('slow').focus();
	        },
	        contentType: 'text'
	    });
	}
	
	//hero_typing();
	
	$('body').on('keyup', '.hero_input', debounce(function() {
		$('.social_buttons').fadeIn('slow');

		var facebook_string = ''
		+ 'https://www.facebook.com/dialog/feed?app_id=238823876266270&display=popup&caption=%20&link=http%3A%2F%2Fdonttakemyhealthcare.com&redirect_uri=https%3A%2F%2Factionnetwork.org&name=Donald+Trump+and+Republicans:+Don\'t+take+health+care+away+from+' 
		+ encodeURIComponent($('.hero_input').val()) 
		+ '&description=Donald+Trump+and+Republicans+are+plotting+to+take+away+our+health+coverage,+hike+our+costs,+and+put+us+at+the+mercy+of+private+health+insurance+corporations.+What+do+you+want+to+tell+them%3F+%23handsoffhealthcare&picture=http://donttakemyhealthcare.com/img/handsoff.png';
		
		var twitter_string = ''
		+ 'https://twitter.com/intent/tweet?text=Donald+Trump+and+Republicans:+Don\'t+take+health+care+away+from+'
		+ encodeURIComponent($('.hero_input').val())
		+ '+http%3A%2F%2Fdonttakemyhealthcare.com+%23handsoffhealthcare';
		
		$('.facebook').attr('href', facebook_string);
		
		$('.twitter').attr('href', twitter_string);
		
		setTimeout(function() {
			$('.more_div').fadeIn('slow');
		}, 5000);
	}, 500));
});