// Supporting code for shop pages
$(document).ready(main);

// The image element (from the list of thumbnails) currently being shown as the
// main image
var current_image;

function main()
{
	current_image = $("#images-list img:first");
	setupProductImageSwapping();
	setupProductImageZoom();
	setupVariantCheck();
}

// For swapping out product images for the main image displayed
function setupProductImageSwapping()
{
	$("#images-list a").click(function() { return swapImage(this);});
	$("#images-list a").each(function(i, el) {preload(el);});
}

// For showing a zoomed version of the product images when the main image is
// clicked
function setupProductImageZoom()
{
	$("a#product-image").click(zoomProductImages);
}

// Display the full list of images at large size one below the other
function zoomProductImages()
{
	// We already have CSS defined for the zoomed case, so all that's
	// needed is adding the class to the element.
	$("#product-images > div").addClass("zoomed");
	// Scroll to the current image.
	$('.zoomed').scrollTop(current_image.offset().top);
	// Un-zoom when any of the image links is clicked on.
	$(".zoomed a").click(zoomedImageLinkClick);
}

// Un-zoom the list of images
function zoomedImageLinkClick()
{
	// Resetting the scroll is required for this to work when re-entering
	// zoom, but I don't see why.
	$(".zoomed").scrollTop(0);
	$(".zoomed").removeClass("zoomed");
	$(".zoomed a").off("click", zoomedImageClick);
}

function swapImage(el)
{
	var src = $(el).attr("href");
	current_image = $(el).children("img");
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

// For ensuring a variant is picked before the item is added to the cart.
// Only set the handler if there are actually variants to choose from, though.

function setupVariantCheck()
{
	if ($("form #product-variants").length > 0)
		$("button#product-addtocart").click(function() {return addCartHandler();});
}

function addCartHandler()
{
	if ($('form #product-variants input[type="radio"]:checked').length > 0)
		return true;
	else
    {
      span = $('#product-variants').append('<span class="pick-an-option">← Pick an option first</span>');
      return false;
    }
}
