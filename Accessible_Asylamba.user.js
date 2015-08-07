// ==UserScript==
// @name        Accessible Asylamba
// @namespace   asylamba
// @description Userscript dédié à rendre Asylamba accessible aux lecteurs d'écran
// @include     http://game.asylamba.com/*
// @match       http://game.asylamba.com/*
// @grant       GM_xmlhttpRequest
// @updateURL   https://github.com/Genroa/Accessible-Asylamba/raw/master/Accessible_Asylamba.user.js
// @version     1.1.4
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
	    //alert(e.keyCode+" ctrl="+e.ctrlKey+" alt="+e.altKey);
	    if(e.keyCode==77 && e.ctrlKey) //m
	    {
	    	$('.aa-game-menu:first-child').focus();
	    }
	    else if(e.keyCode==65 && e.ctrlKey && e.altKey) //CTRL+ALT+a
	    {
	    	if($('#subnav .overflow a.item').length<2)
	    	{
	    		alert("Pas de sous-catégorie, vous êtes dans la seule sous-catégorie de cette page");
	    	}
	    	$('.aa-side-menu:first-child').focus();
	    }
	    else if(e.keyCode==66&& e.altKey) //CTRL+ALT+b
	    {
	    	$('.aa-content:first-child').focus();
	    }
	});
}


function modifySideMenu()
{
	var items = $('#subnav .overflow a.item');
	if(items.length>1)
	{
		$.each(items, function(){
			$(this).addClass('aa-side-menu');
			$(this).find('.picto').remove();
			$(this).html($(this).find('span').find('span').html());
			$(this).find('span').remove();

			$(this).on("click", function(){
				$(this).find('img').click();
			})
		});

		$('.aa-side-menu:first-child').on('keydown', function(e){
			if(e.keyCode==9 && e.shiftKey)
			{
				$('.aa-side-menu:last-child').focus();
				e.preventDefault();
			}
		});
		$('.aa-side-menu:last-child').on("keydown", function(e){
			if(e.keyCode==9 && !e.shiftKey)
			{
				$('.aa-side-menu:first-child').focus();
				e.preventDefault();
			}
		});

		addCss('#subnav .item.aa-side-menu:focus{ background: yellow;}');
	}
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



	$('.aa-game-menu:first-child').on('keydown', function(e){
		if(e.keyCode==9 && e.shiftKey)
		{
			$('.aa-game-menu:last-child').focus();
			e.preventDefault();
		}
	});
	$('.aa-game-menu:last-child').on("keydown", function(e){
		if(e.keyCode==9 && !e.shiftKey)
		{
			$('.aa-game-menu:first-child').focus();
			e.preventDefault();
		}
	});

	// $('div.box:nth-child(4) > a:nth-child(1)').html("Bugtracker");
	// $('div.box:nth-child(4) > a:nth-child(2)').html("Paramètres");
	// $('div.box:nth-child(4) > a:nth-child(3)').html("Menu principal");

	//Debug display
	addCss('#nav .box a.square.aa-game-menu:focus{ background: red;}');
}



$(function(){
	modifyMenu();
	modifySideMenu();

	createShortcuts();


	var path = window.location.pathname;

	if(path.slice(1).substring(path.slice(1).indexOf('/'), path.length).indexOf("/profil") === 0)
	{
		$.each($('#content .component .head h1'), function(){
			$(this).addClass('aa-content');
		});

		$('.center-box').first().addClass('aa-content');


		$('.aa-content').keydown(function(e){
			if(e.keyCode==9)// TAB
			{
				if(e.shiftKey)//SHIFT+TAB
				{
					$('.aa-content:focus').next().focus();
					alert("Next focus");
				}
				else if(!e.ctrlKey && !e.altKey)
				{
					$('.aa-content').prev().focus();
					alert("Previous focus");
				}
			}
		});
	}
});