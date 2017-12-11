$(window).ready(function() {

	anime.timeline({loop: false})
	.add({
		targets: '.accueil .letter',
		translateY: [1000,0],
		translateZ: 0,
		opacity: [0,1],
		easing: "easeOutElastic",
		duration: 1400,
		/*delay: function(el, i) {
			return 300 + 30 * i;
		}*/
	}).add({
		targets: '.accueil .letterd',
		translateY: [-30,0],
		easing: "easeOutExpo",
		duration: 200,
		
	}).add({
		targets: '.accueil .letterr',
		translateY: [-30,0],
		easing: "easeOutExpo",
		duration: 200,
		
	}).add({
		targets: '.accueil .lettera',
		translateY: [-30,0],
		easing: "easeOutExpo",
		duration: 200,
		
	}).add({
		targets: '.accueil .letterw',
		translateY: [-30,0],
		easing: "easeOutExpo",
		duration: 200,
		
	}).add({
		targets: '.pen',
		rotate: 540,
		easing: "easeOutElastic",
		duration: 400,
	}).add({
		targets: '.pen',
		rotate: 0,
		easing: "easeOutElastic",
		duration: 200,
		complete: hoverLetters
	});




	function hoverLetters() {

		
		
		$('.letterd').on( "mouseover", function() {

			var skizz = anime({
				targets: '.accueil .letterd',
				translateY: [-10,10],
				easing: "easeOutElastic",
				duration: 400,
				delay: function(el, i) {
					return 50 + 30 * i;
				}
			});
			
		});
		$('.letterr').on( "mouseover", function() {

			var skizz = anime({
				targets: '.accueil .letterr',
				translateY: [-10,10],
				easing: "easeOutElastic",
				duration: 400,
				delay: function(el, i) {
					return 50 + 30 * i;
				}
			});
			
		});
		$('.lettera').on( "mouseover", function() {

			var skizz = anime({
				targets: '.accueil .lettera',
				translateY: [-10,10],
				easing: "easeOutElastic",
				duration: 400,
				delay: function(el, i) {
					return 50 + 30 * i;
				}
			});
			
		});
		$('.letterw').on( "mouseover", function() {

			var skizz = anime({
				targets: '.accueil .letterw',
				translateY: [-10,10],
				easing: "easeOutElastic",
				duration: 400,
				delay: function(el, i) {
					return 50 + 30 * i;
				}
			});
			
		});

		$('.pen').on( "mouseover", function() {

			anime.timeline({loop: false}).add({
				targets: '.pen',
				rotate: 540,
				easing: "easeOutElastic",
				duration: 600,
				
			}).add({
				targets: '.pen',
				rotate: 0,
				easing: "easeOutElastic",
				duration: 600,
				
			});
			
		});
		
	}
});


