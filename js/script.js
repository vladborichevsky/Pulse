$(document).ready(function(){
		$('.carousel__inner').slick({
				infinite: true,
				speed: 1000,
				adaptiveHeight: true,
				fade: true,
				prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_left.png"></button>',
				nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_right.png"></button>',
				responsive: [
						{
							breakpoint: 800,
							settings: {
								dots: true,
								arrows: false,
							}
						}
					]
		});

		$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
			$(this)
				.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
				.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
		});

		$('.catalog-item__link').each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__more').eq(i).toggleClass('catalog-item__more_active');
			})
		})
	});

		$('.catalog-item__back').each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__more').eq(i).toggleClass('catalog-item__more_active');
			})

			// modal

			$('[data-modal=consultation]').on('click', function() {
				$('.overlay, #consultation').fadeIn('slow');
			});

			$('.modal__close').on('click', function() {
				$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
			})

			$('.button_mini').on('click', function() {
				$('.overlay, #order').fadeIn('slow');
			})

			$('.button_mini').each(function(i) {
				$(this).on('click', function() {
					$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
				})
			})

		// Validation form

		function validateForms(form){
			$(form).validate({
				rules: {
					name: {
						required: true,
						minlength: 2
					  },
					phone: "required",
					email: {
						required: true,
						email: true
						}
					},
				messages: {
					name: {
						required: "Пожалуйста, введите ваше имя",
						minlength: jQuery.validator.format("Минимум {0} символа!")
					  },
					phone: "Пожалуйста, введите ваш номер телефона",
					email: {
						required: "Пожалуйста, введите вашу электронную почту",
						email: "Неправильно введён адрес почты"
						}
					}
			});
		};

		validateForms('#consultation-form')
		validateForms('#consultation form')
		validateForms('#order form')

		// phone masked input

		$('input[name=phone]').mask("+375(99) 999-99-99");

		// sent email


		$('form').submit(function(e) {
			e.preventDefault();					// сбрасываем стандартные настройки браузера, обновление после отправки данных
			if (!$(this).valid()) {				// в случае, если форма не пройдёт валидацию, дальше код не пойдёт
				return;
			}					
			$.ajax({							// подклюачем ajax, чтобы страница не обновлялась после отправки данных
				type: "POST",
				url: "mailer/smart.php",
				data: $(this).serialize()			// отправка данных
			}).done(function() {					// когда отправка выполнится, то запускается функция..
				$(this).find("input").val("");		// очищаем все инпуты
				$('#consultation, #order').fadeOut();
				$('.overlay, #thanks').fadeIn('slow');
	
				$('form').trigger('reset');			// чтобы все формы очистились
			});
			return false;							// в случае ошибки вернуть ошибку
		});

		// Scroll and pageup

		$(window).scroll(function() {
			if ($(this).scrollTop() > 500) {
				$('.pageup').fadeIn();
			} else {
				$('.pageup').fadeOut();
			}
		});

		// плавный скролл

		$("a[href=#up]").click(function(){
			const _href = $(this).attr("href");
			$("html, body").animate({scrollTop: $(_href).offset().top+"px"}
			,
			{
				duration: 50,   // по умолчанию «400» 
				easing: "linear" // по умолчанию «swing» 
			});
			return false;
		});

		// wow.js

		new WOW().init();


	});