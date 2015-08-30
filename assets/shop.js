// Supporting code for shop pages

$(document).ready(main);

function main()
{
	setupProductImageSwapping();
}

function setupProductImageSwapping()
{
	$("#images-list a").click(function() { return swapImage(this);});
	$("#images-list a").each(function(i, el) {preload(el);});
}

function swapImage(el)
{
	var src = $(el).attr("href");
	$("#product-image > img").attr("src", src);
	return false;
}

function preload(el)
{
	var src = $(el).attr("href");
	var img = $("<img style='display: none;' src='" + src + "'>");
	$("body").append(img);
	img.remove();
}
