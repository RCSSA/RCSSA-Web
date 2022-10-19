window.onscroll = function() {
	if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
		$('nav').addClass('navbar-shrink');
	  } else {
		$('nav').removeClass('navbar-shrink');
	  }
};
