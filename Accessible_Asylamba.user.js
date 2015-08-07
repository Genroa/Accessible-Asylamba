// ==UserScript==
// @name        Accessible Asylamba
// @namespace   asylamba
// @description Userscript dédié à rendre Asylamba accessible aux lecteurs d'écran
// @include     http://game.asylamba.com/*
// @match       http://game.asylamba.com/*
// @grant       GM_xmlhttpRequest
// @updateURL   https://github.com/Genroa/Accessible-Asylamba/raw/master/Accessible_Asylamba.user.js
// @version     1.1
// @grant       Genroa
// @author      Genroa
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==


function modifyMenu()
{
	$.each($('.left-2 > a'), function(){
		$(this).html($(this).attr("title"));
	});
}



$(function(){
	modifyMenu();
});