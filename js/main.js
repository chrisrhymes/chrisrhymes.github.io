window.onload = function() {
	var menuButton = document.getElementById("menuButton");
	var topNav = document.getElementById("topNav");

	var menuShow = false;

	if(location.hash == "#topNav") 
	{
		menuShow = true;
		menuButton.innerHTML = 'Close <i class="fa fa-times fa-lg"></i>';
		topNav.className = "top-nav top-nav-open";
	}

	menuButton.addEventListener("click", function() {
		if(menuShow) {
			menuButton.innerHTML = 'Menu <i class="fa fa-bars fa-lg"></i>';
			topNav.className = "top-nav top-nav-closed";
			menuShow = false;
		} else {
			menuButton.innerHTML = 'Close <i class="fa fa-times fa-lg"></i>';
			topNav.className = "top-nav top-nav-open";
			menuShow = true;
		}
	});

	console.log(menuShow);
}