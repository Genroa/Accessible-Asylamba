// ==UserScript==
// @name        Accessible Asylamba
// @namespace   asylamba
// @description Userscript dédié à rendre Asylamba accessible aux lecteurs d'écran
// @include     http://game.asylamba.com/*
// @match       http://game.asylamba.com/*
// @grant       GM_xmlhttpRequest
// @updateURL   https://github.com/Genroa/Accessible-Asylamba/raw/master/Accessible_Asylamba.user.js
// @version     1.1.1
// @grant       Genroa
// @author      Genroa
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

function addCss(newCss)
{
	if(!$('#custom-css').length)
	{
		$("head").append('<style id="custom-css" type="text/css"></style>');
	}
	$('#custom-css').append(newCss);
}

function createShortcuts()
{
	$(document).keyup(function(e) {
	    if(e.keyCode==77 && e.ctrlKey) //m
	    {
	    	$('.aa-game-menu:first-child').focus();
	    }
	});
}

function modifyMenu()
{
	var b3Content = $('.left-3').html();
	$('.left-2').html($('.left-2').html()+b3Content);
	$('.left-3').first().remove();

	$.each($('.left-2 > a'), function(){
		$(this).addClass('aa-game-menu');
		$(this).html($(this).attr("title") + $(this).html());
		$(this).find('img').hide();
		$(this).on("click", function(){
			$(this).find('img').click();
		})
	});
	
	var notif = "0";
	if($('#general-notif-container > .number').length)
		notif = $('#general-notif-container > .number').html();

	$('#general-notif-container').html(notif+" notifications");



	$('.aa-game-menu:last-child').on("focusout", function(){
		$('.aa-game-menu').first().focus();
	});

	


	// $('div.box:nth-child(4) > a:nth-child(1)').html("Bugtracker");
	// $('div.box:nth-child(4) > a:nth-child(2)').html("Paramètres");
	// $('div.box:nth-child(4) > a:nth-child(3)').html("Menu principal");

	//Debug display
	//addCss('#nav .box a.square:focus{ background: red;}');
}



$(function(){
	modifyMenu();

	createShortcuts();
});