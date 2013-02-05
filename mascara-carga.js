// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @warning_level QUIET
// @output_file_name mascara-carga.min.js
// @externs_url http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js
// ==/ClosureCompiler==

/**
 * @fileoverview Plugin para mostrar una animación de carga en la página.
 * @version 0.1
 * @author Sami Racho 04/02/2013
 *
 *  $.mascaraCarga(); Método para mostar la barra de carga
 *  $.mascaraCarga('ocultar'); Método para ocultar la barra de carga
 *  si la variable automatico == true, la barra de carga se mostrará automáticamente cuando se envíe un formulario (postback, submit e.t.c) y se ocultará cuando una página esté cargada completamente.
*
*/
;(function( $ ){

	var nombrePlugin   = 'mascaraCarga';
	var imagenCarga    = 'imagenes/cargando.gif';
	var automatico     = true; // true para que se muestre automáticamente la máscara de carga al hacer un postback
	var $imagen        = $('<img>',{'src': imagenCarga ,'style': 'position: absolute;top: 50%;left: 50%;margin-top:-20px;margin-left:-64px'});
	var $mascara       = $('<div>',{'style' : 'position:fixed;left:0;top:0;opacity:0.5;filter:alpha(opacity=50);z-index:999999;display:none;background-color: #000;'}).append($imagen);
	var mascaraCreada  = false;

	var methods = {
		'init' : function( options ) {
			if(!mascaraCreada){
				$('body').append($mascara);
				$(window).on('resize', redimensionar);
				mascaraCreada = true;
			}
			$mascara.show();
			redimensionar();
			setTimeout(function(){$imagen.attr("src", imagenCarga);},10); /* Hay que engañar a internet explorer para que no congele la animación de la barra de carga*/
			return this;
		},
		'ocultar' : function( ) {
			$mascara.hide();
			return this;
		}
	};

	/**
	* ventanaModal - Plugin jQuery para construir ventanas emergentes. 
	*
	* @class myAwesomePlugin
	* @memberOf jQuery
	*/
	$[nombrePlugin] = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
				return methods['init'].apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on ' +  nombrePlugin );
		}
	};

	/**
	 * Ajusta la máscara al tamaño de la ventana.
	 * @private
	 */	
	function redimensionar() {
		var $myWindow = $(window);
		$mascara.css({'width'  : $myWindow.width(),'height' : $myWindow.height()});
	};
	
	/**
	 * Registra los eventos onload y onsbumit para mostrar y ocultar automáticamente la máscara.
	 * @private
	 */	
	function registrarEventos(){ 
		$('body').on('load', methods['ocultar']);
		$(document).on('submit', 'form', methods['init']);
	}
	if(automatico)registrarEventos();
	
})( jQuery );