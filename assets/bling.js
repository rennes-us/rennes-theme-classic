$(document).ready(main);

function main()
{
	setupSplashFade("#splash"); // Fade away splash image and fade in content
	//setupTransitions(); // Slide away background when following links
	setupToggleMenus(); // Slide sub-menus in and out when clicked
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

// This will have the background image for the page slide to the left before
// loading the target of the link.  It gets added to all the links in the
// categories list.
// http://www.onextrapixel.com/2010/02/23/how-to-use-jquery-to-make-slick-page-transitions/
function setupTransitions()
{
	var delay = 500;
	setupTransitionsFor("#categories a", delay);
	setupTransitionsFor(".hideyoshie", delay);
	// Remove this effect from the sub-menu links, since they should just
	// show/hide those instead.
	// This could probably be done in one step above using jQuery's
	// filter() method, but whatever.
	a = $("#categories ul").prev();
	a.unbind();
	a = $("footer > ul > li > ul").prev();
	a.unbind();
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
	var a = $("#categories ul").prev();
	a.click(function(){
			$(this).next().slideToggle();
			return(false);
			});
	a = $("footer > ul > li > ul").prev();
	a.click(function(){
			$(this).next().slideToggle();
			return(false);
			});
}
