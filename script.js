$(function() {
    
    // ===============================================
    // LÓGICA PARA EL BOTÓN LÍQUIDO (SIN CAMBIOS)
    // ===============================================
	var pointsA = [],
		pointsB = [],
		$canvas = null,
		canvas = null,
		context = null,
		points = 8,
		viscosity = 20,
		mouseDist = 70,
		damping = 0.05,
		mouseX = 0,
		mouseY = 0,
		relMouseX = 0,
		relMouseY = 0,
		mouseLastX = 0,
		mouseLastY = 0,
		mouseDirectionX = 0,
		mouseDirectionY = 0,
		mouseSpeedX = 0,
		mouseSpeedY = 0;

	function mouseDirection(e) {
		if (mouseX < e.pageX) mouseDirectionX = 1;
		else if (mouseX > e.pageX) mouseDirectionX = -1;
		else mouseDirectionX = 0;
		if (mouseY < e.pageY) mouseDirectionY = 1;
		else if (mouseY > e.pageY) mouseDirectionY = -1;
		else mouseDirectionY = 0;
		mouseX = e.pageX;
		mouseY = e.pageY;
        if ($canvas) {
		    relMouseX = (mouseX - $canvas.offset().left);
		    relMouseY = (mouseY - $canvas.offset().top);
        }
	}
	$(document).on('mousemove', mouseDirection);

	function mouseSpeed() {
		mouseSpeedX = mouseX - mouseLastX;
		mouseSpeedY = mouseY - mouseLastY;
		mouseLastX = mouseX;
		mouseLastY = mouseY;
		setTimeout(mouseSpeed, 50);
	}
	mouseSpeed();

	function initButton() {
		var button = $('.btn-liquid');
        if (button.length === 0) return;
		var buttonWidth = button.width();
		var buttonHeight = button.height();
		$canvas = $('<canvas></canvas>');
		button.append($canvas);
		canvas = $canvas.get(0);
		canvas.width = buttonWidth + 400;
		canvas.height = buttonHeight + 400;
		context = canvas.getContext('2d');
        $canvas.css({
            position: 'absolute',
            top: '-200px',
            left: '-200px'
        });
		var x = buttonHeight/2;
		for(var j = 1; j < points; j++) {
			addPoints((x+((buttonWidth-buttonHeight)/points)*j), 0);
		}
		addPoints(buttonWidth-buttonHeight/5, 0);
		addPoints(buttonWidth+buttonHeight/10, buttonHeight/2);
		addPoints(buttonWidth-buttonHeight/5, buttonHeight);
		for(var j = points-1; j > 0; j--) {
			addPoints((x+((buttonWidth-buttonHeight)/points)*j), buttonHeight);
		}
		addPoints(buttonHeight/5, buttonHeight);
		addPoints(-buttonHeight/10, buttonHeight/2);
		addPoints(buttonHeight/5, 0);
		renderCanvas();
	}

	function addPoints(x, y) {
		pointsA.push(new Point(x, y, 1));
		pointsB.push(new Point(x, y, 2));
	}

	function Point(x, y, level) {
	  this.x = this.ix = 200 + x;
	  this.y = this.iy = 200 + y;
	  this.vx = 0;
	  this.vy = 0;
	  this.level = level;
	}

	Point.prototype.move = function() {
		this.vx += (this.ix - this.x) / (viscosity*this.level);
		this.vy += (this.iy - this.y) / (viscosity*this.level);
		var dx = this.ix - relMouseX, dy = this.iy - relMouseY;
		var relDist = (1-Math.sqrt((dx * dx) + (dy * dy))/mouseDist);
		if ((mouseDirectionX > 0 && relMouseX > this.x) || (mouseDirectionX < 0 && relMouseX < this.x)) {
			if (relDist > 0 && relDist < 1) this.vx = (mouseSpeedX / 4) * relDist;
		}
		this.vx *= (1 - damping); this.x += this.vx;
		if ((mouseDirectionY > 0 && relMouseY > this.y) || (mouseDirectionY < 0 && relMouseY < this.y)) {
			if (relDist > 0 && relDist < 1) this.vy = (mouseSpeedY / 4) * relDist;
		}
		this.vy *= (1 - damping); this.y += this.vy;
	};

	function renderCanvas() {
        if (!context) return;
		requestAnimationFrame(renderCanvas);
		context.clearRect(0, 0, $canvas.width(), $canvas.height());
		for (var i = 0; i <= pointsA.length - 1; i++) {
			pointsA[i].move();
			pointsB[i].move();
		}
		var gradientX = mouseX - $canvas.offset().left;
		var gradientY = mouseY - $canvas.offset().top;
		var distance = Math.sqrt(Math.pow(gradientX - $canvas.width()/2, 2) + Math.pow(gradientY - $canvas.height()/2, 2)) / Math.sqrt(Math.pow($canvas.width()/2, 2) + Math.pow($canvas.height()/2, 2));
		var gradient = context.createRadialGradient(gradientX, gradientY, 300+(300*distance), gradientX, gradientY, 0);
		gradient.addColorStop(0, '#A4A7D4');
		gradient.addColorStop(1, '#82C9C1');
		var groups = [pointsA, pointsB]
		for (var j = 0; j <= 1; j++) {
			var points = groups[j];
			if (j == 0) context.fillStyle = '#1D1D1B';
			else context.fillStyle = gradient;
			context.beginPath();
			context.moveTo(points[0].x, points[0].y);
			for (var i = 0; i < points.length; i++) {
				var p = points[i];
				var nextP = points[i + 1];
                if (nextP != undefined) {
                    p.cx1 = (p.x+nextP.x)/2;
                    p.cy1 = (p.y+nextP.y)/2;
                    context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
                } else {
                    nextP = points[0];
                    p.cx1 = (p.x+nextP.x)/2;
                    p.cy1 = (p.y+nextP.y)/2;
                    context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
                }
			}
			context.fill();
		}
	}
	initButton();
    

    // ===============================================
    // LÓGICA DE NAVEGACIÓN Y ANIMACIONES
    // ===============================================

    // --- Animación de scroll suave ---
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = this.hash;
        if (document.querySelector(target)) {
            $('html, body').stop().animate({
                'scrollTop': $(target).offset().top
            }, 500, 'swing');
        }
    });

    // --- Animación de entrada para tarjetas de servicios ---
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s forwards ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }`;
    document.head.appendChild(style);


    // ===============================================
    // LÓGICA DIFERENCIADA PARA DESKTOP Y MÓVIL
    // ===============================================
    
    function setupDesktopNav() {
        $(window).on('scroll.desktop', function() {
            var headerBottom = $('header').offset().top + $('header').outerHeight();
            var scrollTop = $(window).scrollTop();
            var $logoImg = $('nav .logo img');
            var $nav = $('nav');
            // Lógica de cambio de logo
            if (scrollTop >= headerBottom) {
                if ($logoImg.attr('src') !== 'branding/LOGOS/Logos-10.png') {
                    $logoImg.attr('src', 'branding/LOGOS/Logos-10.png');
                }
                $nav.addClass('scrolled');
            } else {
                if ($logoImg.attr('src') !== 'branding/LOGOS/Logos-07.png') {
                    $logoImg.attr('src', 'branding/LOGOS/Logos-07.png');
                }
                $nav.removeClass('scrolled');
            }
        });
    }

    function setupMobileNav() {
        const $menuFab = $('#menuFab');
        const $menuList = $('.menu-fab-list');

        // Abrir/Cerrar menú con clic en el FAB
        $menuFab.on('click', function(e) {
            e.stopPropagation(); // Evitar que el clic se propague al documento
            $menuFab.toggleClass('is-open');
        });

        // Cerrar menú al hacer clic en un enlace
        $menuList.find('a').on('click', function() {
            $menuFab.removeClass('is-open');
        });

        // Cerrar menú al hacer clic fuera de él
        $(document).on('click', function(e) {
            if ($menuFab.hasClass('is-open') && !$menuFab.is(e.target) && $menuFab.has(e.target).length === 0) {
                $menuFab.removeClass('is-open');
            }
        });
    }

    function checkScreenSize() {
        // Desactivar cualquier listener previo para evitar duplicados
        $(window).off('scroll.desktop'); 
        $('#menuFab').off('click');
        $(document).off('click');
        $('.menu-fab-list a').off('click');

        if ($(window).width() > 900) {
            // Es escritorio
            $('.menu-fab').removeClass('is-open').hide();
            $('.main-nav').show();
            setupDesktopNav();
        } else {
            // Es móvil
            $('.main-nav').hide();
            $('.menu-fab').show();
            setupMobileNav();
        }
    }

    // Ejecutar al cargar y al cambiar tamaño de la ventana
    checkScreenSize();
    $(window).on('resize', checkScreenSize);

    // ===============================================
    // LÓGICA PARA ABRIR CALENDLY DESDE SUPER-BUTTON
    // ===============================================
$(document).on('click', '.super-button', function(e) {
    e.preventDefault();
    if (window.Calendly) {
        Calendly.initPopupWidget({
            url: 'https://calendly.com/hola-schema/30min?text_color=000000&primary_color=5d4e8c'
        });
    } else {
        window.open('https://calendly.com/hola-schema/30min?text_color=000000&primary_color=5d4e8c', '_blank');
    }
});
});