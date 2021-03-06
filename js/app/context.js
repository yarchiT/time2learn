/**
 * context.js
 *
 * This module is used for showing the context of the word.
 * 
 * made by Rick Nienhuis & Niels Haan
 */

define(['userData', 'effects'], function(userData, effects) {

	var canvas, ctx, contextPage;
	var isShown = false;

	var FIRST_SENTENCE_HEIGHT  = 115;
	var SECOND_SENTENCE_HEIGHT = 160;
	var THIRD_SENTENCE_HEIGHT  = 205;
	var FOURTH_SENTENCE_HEIGHT = 250;
	var FIFTH_SENTENCE_HEIGHT  = 295;
	

	var WORDSPACE_HEIGHT = 300;
	var SCREEN_WIDTH = 360;

	var TEXT_FONT = "30px Arial";
	var TEXT_COLOR = "white";

	var FADING_TIME = 5;

	function initListener() {
		document.getElementById("popupWordCanvas").addEventListener("click", function(){
			effects.fade(canvas, FADING_TIME);
		});
	}

	return {

		create: function() {
			contextPage = document.getElementById("showContextPage");
			canvas = document.getElementById("contextCanvas");
			ctx = canvas.getContext("2d");

			ctx.font = TEXT_FONT;
			ctx.fillStyle = TEXT_COLOR;
			ctx.textAlign = "center";

			initListener();
		},

		show: function() {
			var firstSentence = [], secondSentence = [], thirdSentence = [], fourthSentence = [], fifthSentence = [];
			var context = userData.getWordPair(0).context;
			var wordsInContext = context.split(" ");
			var currentSentence = 1;
			var currentWord=userData.getWord();
			
			if(context.length <= 20){
				currentSentence = 2;
				SECOND_SENTENCE_HEIGHT=180;
			}
			else if(context.length <= 50){
				currentSentence = 2;
				SECOND_SENTENCE_HEIGHT = 160;
			}else if(context.length <= 75){
				currentSentence = 2;
				SECOND_SENTENCE_HEIGHT=145;
				THIRD_SENTENCE_HEIGHT=190;
				FOURTH_SENTENCE_HEIGHT=235;
			}else {
				SECOND_SENTENCE_HEIGHT=160;
				THIRD_SENTENCE_HEIGHT=205;
				FOURTH_SENTENCE_HEIGHT=250;
			}

			for(var i=0; i<wordsInContext.length; i++) {
					
				if(currentSentence === 1 && ctx.measureText(firstSentence + " " + wordsInContext[i]).width < 330) {
					firstSentence += " " + wordsInContext[i];
					continue;
				} else if(currentSentence <= 2 && ctx.measureText(secondSentence + " " + wordsInContext[i]).width < 350) {
					currentSentence = 2;
					secondSentence += " " + wordsInContext[i];
					continue;
				} else if(currentSentence <= 3 && ctx.measureText(thirdSentence + " " + wordsInContext[i]).width < 345) {
					currentSentence = 3;
					thirdSentence += " " + wordsInContext[i];
					continue;
				} else if(currentSentence <= 4 && ctx.measureText(fourthSentence + " " + wordsInContext[i]).width < 320){
					currentSentence = 4;
					fourthSentence += " " + wordsInContext[i];
					continue;
				}else {
					currentSentence = 5;
					fifthSentence += " " + wordsInContext[i];
				}
				
			}

			contextPage.style.visibility="visible";
			canvas.style.visibility = "visible";
			canvas.style.opacity = 1.0;
			contextPage.style.opacity=0.95;
			
			ctx.clearRect(0, 0, SCREEN_WIDTH, WORDSPACE_HEIGHT);
			ctx.fillText(firstSentence, SCREEN_WIDTH/2, FIRST_SENTENCE_HEIGHT);
			ctx.fillText(secondSentence, SCREEN_WIDTH/2, SECOND_SENTENCE_HEIGHT);
			ctx.fillText(thirdSentence, SCREEN_WIDTH/2, THIRD_SENTENCE_HEIGHT);
			ctx.fillText(fourthSentence, SCREEN_WIDTH/2, FOURTH_SENTENCE_HEIGHT);
			ctx.fillText(fifthSentence, SCREEN_WIDTH/2, FIFTH_SENTENCE_HEIGHT);
			
			isShown = true;
		},

		hide: function() {
			effects.fade(canvas, FADING_TIME);
			effects.fade(contextPage, FADING_TIME);
			isShown = false;
		},

		isShown: function() {
			return isShown;
		}
	};
});