// Supporting code for shop pages

$(document).ready(main);

function main()
{
	setupProductImageSwapping();
	setupVariantCheck();
}

// For swapping out product images for the main image displayed

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

// For ensuring a variant is picked before the item is added to the cart.
// Only set the handler if there are actually variants to choose from, though.

function setupVariantCheck()
{
	if ($("form#product-form #product-variants").length > 0)
		$("button#product-addtocart").click(function() {return addCartHandler();});
}

function addCartHandler()
{
	if ($('form#product-form #product-variants input[type="radio"]:checked').length > 0)
		return true;
	else
    {
      span = $('#product-variants').append('<span class="pick-an-option">← Pick an option first</span>');
      return false;
    }
}
