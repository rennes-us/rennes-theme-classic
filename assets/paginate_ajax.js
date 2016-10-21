// Implement pagination via ajax, with optional automatic loading of more pages
// (not currently used).
// 
// 1.  Load a pageful of items.
// 2.  Set a handler on the "next page" link to load next page via ajax:
//     a.  Remove the old "next page" link
//     b.  Insert the extra items in the current page.
//     c.  Also insert the new "next page" link, if present.
// 3.  Set the same handler on each new "next page" link.
// 4.  Call the handler automatically up to a given number of pages.
//------------------------------------------------------------------------------

$(document).ready(paginate_ajax);

var pagination = {};
pagination.autoload = 0; // number of times to autoload more items (none right now)
pagination.loaded   = 0; // number of *extra* pages loaded so far
pagination.anchor   = "#pagination > a"; // selector for the "next page" link
pagination.products = "article#products"; // selector for product elements

// Set up onClick handler to load next page of items via ajax instead of with a
// full page load.  Autoload items up to the number of pages given by
// pagination.autoload.
function paginate_ajax()
{
  
  	$(pagination.anchor).click(function(){
   		load_next(this);
      	return false; // do we still need this these days?
	});
    if (pagination.loaded < pagination.autoload)
      $(pagination.anchor).click();
}

// Given an anchor element, take the a.hrelf URL, parse that page's products
// elements, and append them to this page's products.  The existing anchor is
// removed.  If a new anchor comes with the new products, ajax loading is set up
// for that anchor as well.
function load_next(a)
{
  // Handles the result of a successful AJAX load
  function success(data)
  {	
    // remove the old "next page" link
    $(a).parent().remove();
    // extract the data for the additional items, and append it to the current
    // page.
    dom = $(data);
    entries = dom.find(pagination.products).children();
    $(pagination.products).append(entries);
    // Record the succesful load, and enable ajax loading on a new "next page"
    // link, if present.
    pagination.loaded += 1;
    paginate_ajax();
  }
  
  // Make the GET request for the new page
  $.ajax({
    url: a.href,
    success: success,
    dataType: 'html'
  });
}
