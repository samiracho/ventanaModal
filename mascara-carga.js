// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @warning_level QUIET
// @output_file_name mascara-carga.min.js
// @externs_url http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js
// ==/ClosureCompiler==

/// <reference path="../jquery-1.9.0-vsdoc.js" />

/**
 * @fileoverview Plugin para mostrar una animación de carga en la página cuando se envía un formulario.
 * @version 0.1
 * @author Sami Racho 04/02/2013
 *
 *  $.mascaraCarga(); Método para mostar la barra de carga
 *  $.mascaraCarga('ocultar'); Método para ocultar la barra de carga
 *  Si en una página en concreto queremos que la barra de carga se muestre en los autoPostBacks debemos poner la variable registrarAutoPostbacks = false, antes del script mascara-carga.js
 *  También podemos hacerlo desde el code-behind por ejemplo en el Page_Load con:
 *      
 *      HtmlGenericControl Include = new HtmlGenericControl("script");
 *      Include.Attributes.Add("type", "text/javascript");
 *      Include.InnerHtml = "registrarAutoPostbacks = false";
 *      this.Page.Header.Controls.AddAt(0,Include);
 *
 *  Nota: Los comentarios @ con formato JSDoc, se han utilizado para que ClosureCompiler pueda comprimir correctamente en modo ADVANCED
*
*/

;(function( $ ){

    var nombrePlugin   = 'mascaraCarga';
    var imagenCarga    = 'Scripts/ventanaModal/imagenes/cargando.gif';
    var $imagen        = $('<img>',{'src': imagenCarga ,'style': 'position: absolute;top: 50%;left: 50%;margin-top:-20px;margin-left:-64px'});
    var $mascara       = $('<div>',{'style' : 'position:fixed;left:0;top:0;opacity:0.5;filter:alpha(opacity=50);z-index:999999;display:none;background-color: #000;'}).append($imagen);
    var mascaraCreada  = false;

    /** @const */
    // true para que se muestre automáticamente la máscara de carga al hacer un autoPostBack
    registrarAutoPostbacks  = (typeof registrarAutoPostbacks !='undefined') ? registrarAutoPostbacks : true; 

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

    $[nombrePlugin] = function( method ) {

    /// <summary>
    /// Muestra una máscara de carga. Por defecto se mostrará automáticamente cuando se envíe información al servidor. (PostBack, submit e.t.c)
    /// </summary>
    /// <param name="method" type="string">Con el parámetro 'ocultar' ocultará la máscara. Sin parámetros la mostrará.</param>

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
    $(function() {
        
        // ocultamos la máscara si la hubiera
        methods['ocultar']();

        // registramos el evento submit del formulario
        $('form').on('submit', methods['init']);

        // Vamos a hacer un hook de la función postback original para obligarle a que muestre la barra de carga en los autoPostBacks
        if(registrarAutoPostbacks){
            if( typeof window['__doPostBack'] == 'function' ){
                var postBackOriginal = window['__doPostBack'];
                var nuevoPostBack = function (eventTarget, eventArgument) {
                    methods['init']();
                    return postBackOriginal(eventTarget, eventArgument);
                };
                window['__doPostBack'] = nuevoPostBack;
            }
        }
    });
    
})( jQuery );