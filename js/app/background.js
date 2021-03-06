/**
 * background.js
 *
 * This module has all the functions for designing and updating the background behind the time. 
 * The background consists of a rotating image with the sun and the moon and a 
 * landscape on top of the rotating image, which can be changed by tapping on the time.
 * 
 * made by Rick Nienhuis & Niels Haan
 */

define(['userData', 'weather', 'time'], function(userData, weather, time) {

	var canvas;
	var degrees;
	var minutes;
	var sunset, sunrise;

//	TODO: This should be named landscapeSource. 
//	Background is the entire module.
	var landscapeSource = ["url('assets/simple_background.png')", 
	                        "url('assets/city_background.png')", 
	                        "url('assets/countryside_background.png')"];

	//definitions
	var MINUTES_IN_ONE_DAY = 1440;
	var LANDSCAPE_SIZE = "360px 180px";

	return {

		create: function() {
			canvas = document.getElementById("landscapeCanvas");
			if (localStorage.getItem("landscapeNumber") === null) {
				userData.setLandscapeNumber(0);
			} 
			canvas.style.background = landscapeSource[userData.getLandscapeNumber()];
			canvas.style.backgroundSize = LANDSCAPE_SIZE;
		},

		change: function() {
			userData.increaseLandscapeNumber();
			if (userData.getLandscapeNumber() === landscapeSource.length){
				userData.setLandscapeNumber(0);
			} 
			canvas.style.background = landscapeSource[userData.getLandscapeNumber()];
			canvas.style.backgroundSize = LANDSCAPE_SIZE;
		},

		rotate: function() {
			sunrise = weather.getSunrise();
			sunset = weather.getSunset();
			minutes = time.getHours()*60 + time.getMinutes()*1;
			if(minutes >= sunrise && minutes <= sunset) {
				// day
				degrees = (180 / (sunset - sunrise)).toFixed(2);
				degrees = 90 + (minutes - sunrise) * degrees;
				document.getElementById("rotationCanvas").style.transform = "rotate(" + degrees + "deg)";
			} else {
				// night
				degrees = (180 / (sunrise + (MINUTES_IN_ONE_DAY - sunset))).toFixed(2);
				if(minutes > sunset) {
					degrees = 270 + (minutes - sunset) * degrees;
				} else {
					degrees = 270 + (minutes + (MINUTES_IN_ONE_DAY - sunset)) * degrees;
				}
				document.getElementById("rotationCanvas").style.transform = "rotate(" + degrees + "deg)";
			}

		}
	};
});