$(document).ready(main);

function main()
{
	setupSplashFade("#splash"); // Fade away splash image and fade in content
	setupToggleMenus(); // Slide sub-menus in and out when clicked
	setupSaleBanner(); // Slide the banner on the sale page into view after page load
}

// Hide everything except for the full-window splash image.  When clicked, fade
// away (and remove) the splash image, and fade in the content.
function setupSplashFade(sel)
{
	if ($(sel).length)
	{
		var delay = 1000; // fade in/out duration in ms
		$("body > *").hide();
		$(sel).show();
		$(sel).click(function() {
			$(this).fadeOut(delay, function() {
				$(this).remove();
				$("body > *").fadeIn(delay);
			});
			return false;
		});
	}
}

function setupTransitionsFor(el, delay)
{
	$(el).click(function(event){
		event.preventDefault();
		loc = this.href;
		moveYoshie(delay);
		setTimeout(function() {window.location = loc;}, delay);
	});
}

// http://snook.ca/archives/javascript/jquery-bg-image-animations/
function moveYoshie(delay)
{
	var width = 2000; // background image width
	$("body").animate(
		{backgroundPosition: "(-"+width+"px 100px)"}, 
		{duration: delay},
		{easing: 'swing'}
		);
}

// This will make sub-menus slide up/down.
function setupToggleMenus()
{
	var a = $("nav ul ul").prev();
	a.click(function(){
			$(this).next().slideToggle();
			return(false);
			});
	//a = $("footer > ul > li > ul").prev();
	//a.click(function(){
	//		$(this).next().slideToggle();
	//		return(false);
	//		});
}

function setupSaleBanner()
{
	if ($("#sale-banner").length > 0)
		setTimeout( function() {$("#sale-banner").slideDown(); }, 500);
}
