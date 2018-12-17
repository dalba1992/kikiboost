(function(){

	// Init global DOM elements, functions and arrays
  	window.app 			 				= {el : {}, fn : {}};
	app.el['window']     				= $(window);
	app.el['document']   				= $(document);
	app.el['back-to-top'] 				= $('.back-to-top');
	app.el['html-body'] 				= $('html,body');
	app.el['animated']   				= $('.animated');
	app.el['loader']        			= $('#loader');
	app.el['mask']          			= $('#mask');
	app.el['header']          			= $('header');
	app.el['navbar-nav'] 				= $('.navbar-nav li.dropdown');
	app.el['match-height']				= $('.match-height');
    app.el['gallery-dropdown']          = $('.gallery-dropdown');

	$(function() {

	    // Preloader
	    // app.el['loader'].delay(700).fadeOut();
	    // app.el['mask'].delay(1200).fadeOut("slow");   

		// Resized based on screen size
		app.el['window'].resize(function() {
			// app.el['header'].unstick();
			// app.el['header'].sticky({ topSpacing: 0 });
		});	

		// fixed header
		// app.el['header'].sticky({ topSpacing: 0 });


		// match height
        app.el['window'].bind('load', function() {
            app.el['match-height'].matchHeight();
            $('.carousel').carousel('pause');
        });

        // dropdown gallery
        app.el['gallery-dropdown'].find('a').on('click', function() {
            var parent = $(this).parent();
            var siblings = parent.siblings();
            var value = $(this).html();
            var current = $('.selected-dd');
            current.html(value);
            if (!parent.hasClass('active')) {
                siblings.removeClass('active');
                // parent.addClass('active');
            }
        });

		// On hover, open drop down
	    app.el['navbar-nav'].on({
	        mouseenter: function() {
	          $(this).addClass('open');
	        }, mouseleave: function() {
	          $(this).removeClass('open');
	        }
	    });

	    // One page nav header
	    var top_offset = $('#header').height() - 1;
		$('.navbar-nav').onePageNav({
			currentClass: 'active',
			changeHash: true,
    		scrollOffset: top_offset,
			filter: ':not(.external)',
		    begin: function() {
		    	// Hide navbar collapse
		        $('.navbar-dropdown').stop().animate({ height : '0'}, 250); 
		        $('.navbar-collapse').removeClass('in');
		    }
		});
	    
		// fade in .back-to-top

		$(window).scroll(function () {
			if ($(this).scrollTop() > 500) {
				app.el['back-to-top'].fadeIn();
			} else {
				app.el['back-to-top'].fadeOut();
			}
		});

		// scroll body to 0px on click
		app.el['back-to-top'].click(function () {
			app.el['html-body'].animate({
				scrollTop: 0
			}, 5500);
			return false;
		});

		// Elements animation
		app.el['animated'].appear(function() {
			var element = $(this);
			var animation = element.data('animation');
			var animationDelay = element.data('delay');
			if(animationDelay) {
				setTimeout(function(){
					element.addClass( animation + " visible" );
					element.removeClass('hiding');
				}, animationDelay);
			} else {
				element.addClass( animation + " visible" );
				element.removeClass('hiding');
			}    			
		}, {accY: -150});

		// Vertical Center modal
		function centerModals($element) {
			var $modals;
			if ($element.length) {
				$modals = $element;
			} else {
				$modals = $('.modal:visible');
			}
			$modals.each( function(i) {
				var $clone = $(this).clone().css('display', 'block').appendTo('body');
				var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
				top = top > 0 ? top : 0;
				$clone.remove();
				$(this).find('.modal-content').css("margin-top", top);
			});
		}
		$('.modal').on('show.bs.modal', function(e) {
			centerModals($(this));
		});



        $("#contactForm").submit(function(event){
            event.preventDefault();
            submitForm();
        });

        function submitForm(){
            // Initiate Variables With Form Content
            var name = $("#fullName").val();
            var email = $("#eMail").val();
            var phone = $("#phone").val();
            var city = $("#city").val();
            var state = $("#state").val();
            var packages = $("#package").val();
            var type = $("#eventType").val();

            var data = 	"name=" + name +
						"&email=" + email +
						"&phone=" + phone +
						"&city=" + city +
						"&state=" + state +
						"&packages=" + packages +
						"&type=" + type;

            $.ajax({
                type: "POST",
                url: "send.php",
                data: data,
                success : function(text){
                    if (text == "success"){
                        formSuccess();
                    }
                }
            });
        }
        function formSuccess(){
            $( "#msgSubmit" ).removeClass( "hide" );
            setTimeout(function() {
                $( "#msgSubmit" ).addClass( "hide" );
            }, 10000);
        }


	});

})();