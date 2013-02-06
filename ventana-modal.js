// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @warning_level QUIET
// @output_file_name ventana-modal.min.js
// @externs_url http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js
// ==/ClosureCompiler==

/**
 * @fileoverview Plugin jQuery patrón singleton que permite crear Ventanas e iframes.
 * @version 0.1
 * @author Sami Racho 01/02/2013
 *  
 *
 *
 *  Se respeta el encadenamiento de selectores de jQuery, por lo que se pueden hacer llamadas del tipo
 *  $('#myButton').ventanaModal('alerta').css('color', 'red'); "(Esto hará que al hacer click sobre el botón se abra una ventana de alerta y cambiará el color de las letras del botón a rojo)"
 *  También se puede llamar directamente al plugin mediante $.ventanaModal()
 *  En el caso de mostrar un iframe, pondrá una imagen de carga hasta que se haya cargado completamente.
 *
 *  --------------------------------------------------------------------------------------------------------------------------------------------
 *  Cuadros de diálogo preconfigurados:
 *  --------------------------------------------------------------------------------------------------------------------------------------------
 *
 *  Función:       $.ventanaModal(tipo, mensaje, titulo, boton1, boton2)
 *  Descripción:   Muestra una ventana modal.
 *  Devuelve:      Nada   
 *  Parámetros:    
 *               tipo        - Tipo de ventana. Puede ser: iframe, info, alerta, error, ok, siNo. info, alerta, error y ok muestran solo un botón "Aceptar". iframe no muestra botones por defecto.
 *               mensaje     - Mensaje que mostrará la ventana.
 *               titulo      - Título de la ventana.
 *               boton1      - Función que se ejecutará cuando se haga click sobre el botón 1. 
 *                            Puede tomar cuatro valores:
 *                              Si se indica la cadena vacía '' o 'cerrar' cerrará la ventana y no hará nada más.
 *                              Si se indica una función javascript p.ej function(){alert('hola')}, ejecutará esa función.
 *                              Si se indica la id única de un webform, ejecutará su postback. p.ej '<%=button1.UniqueID%>'
 *                               Si se indica un objeto o un array de objetos de tipo botón, se crearán esos botones. 
 *                                  P.ej: Si queremos crear un botón que llame a un postback de un webform de un iframe, haremos {'funcion':'<%=miBoton.UniqueID%>', 'texto:''Postback Iframe', con'texto:' window}
 *                                  P.ej: Si queremos crear un botón que llame a un postback de un webform de la página principal, haremos {'funcion':'<%=miBoton2.UniqueID%>', 'texto:''Postback Pag Principal'}
 *                                  P.ej: También podemos indicar una lista de botones [{'funcion':'cerrar', 'texto:''Salir'},{'funcion':'cerrar', 'texto:''Salir'}]
 *              boton2 - Igual que boton1
 *                              
 *
 *  --------------------------------------------------------------------------------------------------------------------------------------------
 *  Cuadros de diálogo personalizados:
 *  --------------------------------------------------------------------------------------------------------------------------------------------
 * 
 *  Para crear cuadros de diálogo personalizados deberemos especificar una configuración con las propiedades que queramos. P.ej
 *
 *                  $.ventanaModal({
 *                      tipo: '',
 *                      titulo: 'Título personalizado',           // Título de la ventana
 *                      mensaje:'Mensaje Personalizado',          // Mensaje de la ventana
 *                      ancho: 300,                               // Ancho en píxeles de la ventana
 *                      alto: 250,                                // Alto en píxeles de la ventana
 *                      icono: $.ventanaModal.imagen('info'),     // clase css con el icono que queremos mostrar. Pueden ser siNo, alerta, ok, error, info, o una clase personalizada.
 *                                                                 // Si queremos un icono personalizado debemos crear una clase css p.ej .ventanaModalMiIcono{ background: url('imagenes/miIcono.png')}
 *                                                                 // y asignarla. icono: 'ventanaModalMiIcono'  
 *                       botones:[                                 // Lista de botones. Debemos indicar la función y el texto del botón. {'funcion':'', 'texto:' '' , con'texto:'''}
 *                                                                 // Como podemos ver en el ejemplo, es posible especificar una función javascript, un postBack, o 'cerrar' para cerrar la ventana emergente.
 *                                                                // También es posible especificar el contexto. Por defecto es document.
 *                            {'funcion':'cerrar', 'texto:''Salir'},
 *                            {'funcion':'<%=button1.UniqueID%>', 'texto:''Mi Postback'},
 *                            {'funcion': function(){$.ventanaModal.get('mensaje').append('<br />');}, 'texto:''Agregar br'},                           
 *                      ]
 *                  });
 *
 *
 *
 *  --------------------------------------------------------------------------------------------------------------------------------------------
 *  Otras funciones:
 *  --------------------------------------------------------------------------------------------------------------------------------------------
 * 
 *  Función:       $.ventanaModal('get', selector)
 *  Descripción:   Devuelve un objeto jquery de la ventana emergente.
 *  Devuelve:    Un objeto Jquery   
 *  Parámetros:    
 *               selector    - Puede ser: 'dialogo', 'titulo', 'mensaje', 'mascara', 'icono', 'botones'
 *                                        'dialogo' Devuelve un objeto jquery de toda la ventana emergente.
 *                                        'titulo'  Devuelve un objeto jquery del div del título de la ventana.
 *                                        'mensaje' Devuelve un objeto jquery del div del mensaje.
 *                                        'mascara' Devuelve un objeto jquery de la máscara gris que se pone detrás de la ventana emergente.
 *                                        'icono'   Devuelve un objeto jquery del div del icono.
 *                                        'botones' Devuelve un objeto jquery del div de los botones.
 *
 *
 *  Función:       $.ventanaModal('imagen', img)
 *  Descripción:   Devuelve un string con el nombre de la clase CSS de un icono.
 *  Devuelve:    string   
 *  Parámetros:    
 *               img      - Puede ser: 'alerta', 'siNo', 'error', 'ok', 'info'
 *
 *
 *  --------------------------------------------------------------------------------------------------------------------------------------------
 *  Ejemplos de uso:
 *  --------------------------------------------------------------------------------------------------------------------------------------------
 * 
 *  En la etiqueta onclick de un elemento html:
 *  <input type ="button" value="OK" onclick="$.ventanaModal()" />
 *  <input type ="button" runat="server" value="OK" onclientclick="$.ventanaModal()" />
 *
 *  Mediante un selector jQuery:
 *  $('#myButton').ventanaModal( 'alerta' , 'Mensaje', '<%=button1.UniqueID%>')
 *
 *  Llamándolo desde una función C# (Page_Load e.t.c)
 *  ClientScript.RegisterClientScriptBlock(GetType(), "Javascript", "<script>$.ventanaModal('alerta','Mensaje', 'Título')</script>");
*/  

;(function (window, document, $) {
    var nombrePlugin   = 'ventanaModal';
    var mostrarCarga   = true;  
    var ventanas       = [];
    var ventanaActiva  = null;
    var $mascara       = $('<div>').attr({'class': 'ventanaModalMascara'});
    var $window        = $(window);
    
    // configuración por defecto
    /** @dict */
    var porDefecto  = {
        'ancho': null,
        'alto': null,
        'mensaje': '',
        'titulo': '',
        'tipo': '',
        'boton1': 'cerrar',
        'boton2': 'cerrar',
        'icono': '',
        'cerrarEsc': true,
        'modal': true,
        'botones': [],
        'anchoDefecto': 320, // ancho y alto por defecto. Tomará estos valores cuando no se especifique un alto y un ancho.
        'altoDefecto': '', // Al no ponerle alto, se ajustará al tamaño del mensaje
        'el' : {
            '$dialogo' : null,
            '$titulo'  : null,
            '$icono'   : null,
            '$mensaje' : null,
            '$botones' : null
        }
    };
    
    // clases css de las imágenes por defecto
    /** @dict */
    var imagenes = {
        'alerta' : 'ventanaModalAlerta',
        'siNo'   : 'ventanaModalSiNo',
        'error'  : 'ventanaModalError',
        'ok'     : 'ventanaModalOk',
        'info'   : 'ventanaModalInfo'
    };
    
    // Asociar eventos para que al redimensionar la ventana se vuelva a centrar
    $window.on('resize', centrarVentanas);
    $(document).off('keydown',onEsc).on('keydown', onEsc);
    
    var methods = {
        'init' : function( config, mensaje, titulo, boton1, boton2 ) {
            /** @dict */
            var ventana           = {};
            porDefecto['botones'] = [];
            porDefecto['el']      = []; 
            var me                = this;
            var tipoventana       = typeof config;
            var tipoBoton1        = typeof boton1;
            var tipoBoton2        = typeof boton2;
            
            // leer configuración
            switch (tipoventana)
            {
                case 'object':
                    ventana = $.extend( {}, porDefecto, config );
                    break;
                case 'string':
                    ventana = $.extend( {}, porDefecto, {'tipo':config, 'mensaje': (mensaje || '' ) ,'titulo': (titulo || ''), 'boton1': (boton1 || '' ), 'boton2': (boton2 || '' )} );
                    break;
                default:
                    ventana = $.extend( {}, porDefecto);
            }
            
            // si ha indicado botones personalizados, los agregamos a la lista de botones
            if(tipoBoton1 == 'object'){
                ventana['botones'] = $.extend( ventana['botones'], boton1 );
            }
            
            if( tipoBoton2 == 'object'){
                ventana['botones'] = $.extend( ventana['botones'], boton2 );
            }
            
            // plantillas de ventanas por defecto
            if (ventana['tipo'] != null) {

                switch (ventana['tipo']) {
                
                    case 'siNo':
                        ventana['mensaje']   = ventana['mensaje']  || '¿Está seguro de que desea continuar?';
                        ventana['titulo']    = ventana['titulo']   || 'Confirmación';
                        ventana['icono']     = imagenes['siNo'];
                        if(tipoBoton1 != 'object') ventana['botones'].push({'funcion': boton1,'texto':'Si'});
                        if(tipoBoton2 != 'object') ventana['botones'].push({'funcion': boton2,'texto' : 'No'});
                        
                        break;
                    case 'alerta':
                        ventana['mensaje']   = ventana['mensaje'] || 'Alerta';
                        ventana['titulo']    = ventana['titulo']  || 'Alerta';
                        ventana['icono']     = imagenes['alerta'];
                        if(tipoBoton1 != 'object') ventana['botones'].push({'funcion': boton1,'texto' :'Aceptar'});
                        break;
                    case 'ok':
                        ventana['mensaje']   = ventana['mensaje'] || 'Operación Correcta';
                        ventana['titulo']    = ventana['titulo']  || 'OK';
                        ventana['icono']     = imagenes['ok'];
                        if(tipoBoton1 != 'object') ventana['botones'].push({'funcion': boton1,'texto': 'Aceptar'});
                        break;
                    case 'info':
                        ventana['mensaje']   = ventana['mensaje'] || 'Información';
                        ventana['titulo']    = ventana['titulo']  || 'Información';
                        ventana['icono']     = imagenes['info'];
                        if(tipoBoton1 != 'object') ventana['botones'].push({'funcion': boton1,'texto': 'Aceptar'});
                        break;
                    case 'error':
                        ventana['mensaje']   = ventana['mensaje'] || 'Se ha producido un error';
                        ventana['titulo']    = ventana['titulo']  || 'Error';
                        ventana['icono']     = imagenes['error'];
                        if(tipoBoton1 != 'object') ventana['botones'].push({'funcion': boton1,'texto' :'Aceptar'});
                        break;
                    case 'iframe':
                        ventana['icono']     = '';
                        if(tipoBoton1 == 'string') ventana['botones'].push({'funcion': boton1,'texto': 'Aceptar'});
                        if(tipoBoton2 == 'string') ventana['botones'].push({'funcion': boton2,'texto': 'Cancelar'});
                        ventana['ancho']     = ventana['ancho']   || 520;
                        ventana['alto']      = ventana['alto']    || 520;
                        break;
                    default:
                        ventana['icono']     = ventana['icono']     || imagenes['info'];
                        if(tipoBoton1 != 'object') ventana['botones'].push({'funcion': boton1,'texto' :'Aceptar'});
                        if(tipoBoton2 == 'string') ventana['botones'].push({'funcion': boton2,'texto': 'Cancelar'});
                        break;
                }
                
                // Preservamos el encadenamiento de jQuery
                if(typeof me != 'function') {
                    $(me).on('click', ventana, mostrar);
                    return me;
                }
                else mostrar(ventana);
            }
            return this;
        },
        'cerrar' : function( ventana ) {
            var v = (typeof ventana == 'object') ? ventana : obtenerVentana(ventana); 
            v['el']['$dialogo'].remove();
            eliminarVentana(v);
            if(ventanas.length == 0)$mascara.hide();
            return this;
        },
        'get' : function (selector) {
            return ( ventanas[ventanaActiva]['el']['$'+selector] || $.error('El elemento no existe') );
        },
        'imagen' : function(imagen) {
            return ( imagenes[imagen] || $.error('El elemento no existe') );
        }
    };
    
    /**
    * ventanaModal - Plugin jQuery para construir ventanas emergentes. 
    *
    * @class myAwesomePlugin
    * @memberOf jQuery.fn
    * @memberOf jQuery
    */
    $[nombrePlugin] =  $['fn'][nombrePlugin] = function( method ) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else {
            return methods['init'].apply( this, arguments );
        }
    };
    
    // ----------------------------------------------------------------------------------------------------------
    // Funciones privadas
    // ----------------------------------------------------------------------------------------------------------
    
    /**
     * Elimina la ventana especificada del DOM y la quita de la lista de ventanas.
     * @param {Object} ventana  Ventana a eliminar.
     * @private
     */ 
    function eliminarVentana(ventana) {
        var len = ventanas.length;
        for( var i=0; i<len; i++ ) {
            var w = ventanas[i];
            if( w == ventana ) {
                ventanas.splice(i--,1);
                break;
            }
        }
        len = ventanas.length;
        ventanaActiva = len > 0 ? ventanas[len -1]['id'] : null;
    }
     
    /**
     * Obtiene la ventana activa.
     * @return {Object} ventanas[ventanaActiva] Ventana activa actualmente
     * @param {number} [id]  Si no se define ninguna le devolvemos la última activa.
     * @private
     */ 
    function obtenerVentana(id) {
        for( var i=0, len=ventanas.length; i<len; i++ ) {
            if( id == ventanas[i]['id'] ) {
                return ventanas[i];
            }
        }
        return ventanas[ventanaActiva];
    }

    /**
     * Muestra la ventana.
     * @param {Object} e Ventana a mostrar.
     * @private
     */
    function mostrar(e) {
        
        // cuando se llama desde un selector jQuery tengo que cargar la configuración
        ventana = e.data || e;
        
        // ancho y alto de la ventana. Si no hay ninguno especificado, se ponen los valores por defecto
        ventana['ancho'] = ventana['ancho'] || porDefecto['anchoDefecto'];
        ventana['alto']  = ventana['alto']  || porDefecto['altoDefecto'];

        construirVentana(ventana);

        // mostramos la máscara y la ventana emergente
        if(ventana['modal'])$mascara.show();
        ventana['el']['$dialogo'].show();

        redimensionar(ventana);
        centrar(ventana);
    };
    
    /**
     * Función que se ejecuta cuando el usuario aprieta la tecla esc.
     * @param {Object} e  Elemento que disparó el evento.
     * @private
     */ 
    function onEsc(e) {
        if (e.which == 27){ 
            if(ventanaActiva!= null){
                if(ventanas[ventanaActiva]['cerrarEsc']){
                    methods['cerrar']();
                    e.preventDefault();
                }
            }
        }
    };
    
    /**
     * Función para crear un botón.
     * @return {Object} boton
     * @param {Object} btn  Ej: {funcion:'cerrar', texto:'', contexto: document } Si no se especifica contexto, será por defecto document
     * @param {Object} ventana
     * @private
     */ 
    function crearBoton(btn, ventana) {
        var miFuncion = null;

        if (!btn['funcion'] || btn['funcion'] == 'cerrar') {
            miFuncion = function(){methods['cerrar'](ventana)};
        } else if (typeof (btn['funcion']) == 'function') {
            miFuncion = btn['funcion'];
        } else {
            miFuncion = function () {
                if(btn.contexto) ['funcion']['contexto'].__doPostBack(btn['funcion'], '');
                else __doPostBack(btn['funcion'], '');
            };
        }
    
        var boton = $('<input>').attr({
            'type': 'button',
            'value': btn['texto']
        }).on('click', miFuncion)

        return boton;
    };
    
    /**
     * Centra todas las ventanas que estén en pantalla
     * @private
     */ 
    function centrarVentanas()
    {
        for (i = 0, size = ventanas.length; i < size; i++) {
            centrar(ventanas[i]);
        }
    }

    /**
     * Centra una ventana.
     * @param {Object} ventana
     * @private
     */ 
    function centrar(ventana) {
        
        var top       = ($window.height() - ventana['el']['$dialogo'].outerHeight()) / 2;
        var left      = ($window.width()  - ventana['el']['$dialogo'].outerWidth() ) / 2;
        ventana['el']['$dialogo'].css({
            'top'      : (top > 0 ? top : 0) + 'px',
            'left'     : (left > 0 ? left : 0) + 'px'
        });
        $mascara.css({
            'width'  : $window.width(),
            'height' : $window.height()
        });

        if (!ventana['alto']) {
            var windowHeight = $window.height() - ventana['el']['$botones'].outerHeight() - ventana['el']['$titulo'].outerHeight() - 50;
            ventana['el']['$mensaje'].css({
                'height'    : 'auto',
                'max-height': windowHeight + 'px'
            });
        }
    };

    /**
     * Ajusta el tamaño de una ventana.
     * @param {Object} ventana
     * @private
     */ 
    function redimensionar(ventana) {
        var esIframe  = (ventana['tipo'] =='iframe' ? true : false);    
        ventana['el']['$dialogo'].css('width', ventana['ancho'] + 'px');
        
        if (!ventana['alto']) {
            var windowHeight = $window.height() - ventana['el']['$botones'].outerHeight() - ventana['el']['$titulo'].outerHeight() - 50;
            ventana['el']['$mensaje'].css({'height'    : 'auto','max-height': windowHeight + 'px'});
            if(esIframe) ventana['el']['$mensaje'].find('iframe').css({'height'    : 'auto','max-height': windowHeight + 'px'});
        } else {
            var altoMensaje = ventana['alto'] - ventana['el']['$botones'].outerHeight() - ventana['el']['$titulo'].outerHeight();
            ventana['el']['$mensaje'].css('height', altoMensaje + 'px');
            if(esIframe)ventana['el']['$mensaje'].find('iframe').css('height', altoMensaje - 3 + 'px');
        }
    };
    
    /**
     * Construye una ventana en el DOM a partir del objeto ventana.
     * @param {Object} ventana
     * @private
     */ 
    function construirVentana(ventana) {
        
        var esIframe = (ventana['tipo'] =='iframe' ? true : false); 
        
        ventana['el']['$dialogo']  = $('<div>').attr({'class': 'ventanaModal'});
        ventana['el']['$titulo']   = $('<div>').attr({'class': 'ventanaModalTitulo'}).html(ventana['titulo']);
        ventana['el']['$icono']    = $('<div>').attr({'class': 'ventanaModalIcono'}).addClass(ventana['icono']);
        ventana['el']['$mensaje']  = $('<div>').attr({'class': 'ventanaModalMensaje'}).html( (esIframe ? '' : ventana['mensaje']) )
        ventana['el']['$botones']  = $('<div>').attr({'class': 'ventanaModalBotones'})
        ventana['el']['$dialogo'].append(ventana['el']['$titulo'],ventana['el']['$icono'],ventana['el']['$mensaje'],ventana['el']['$botones']);
        $('body').append(ventana['el']['$dialogo']);
        if($mascara.parent().length == '0' && ventana['modal'])$('body').append($mascara);
        
        if(esIframe){
            var tipoMascaraCarga = typeof $['mascaraCarga'];
            var perms = false;
            
            ventana['el']['$mensaje'].css({'margin':'0px', 'padding':'0px', 'border':'0px'});
            var $iFrame  = $('<iframe>').attr({'src': ventana['mensaje'],'frameborder':0,'scroll':'no'});
            
            if(tipoMascaraCarga == 'undefined'){
                $.error('No se ha encontrado el plugin de máscara de carga:$.mascaraCarga()')
            }else {
                // mostramos la máscara de carga
                $['mascaraCarga'](); 
                
                // cuando el iframe se haya cargado ocultamos la máscara de carga
                $iFrame.on('load', function(){
                    if(tipoMascaraCarga == 'function'){
                        $['mascaraCarga']('ocultar');                       

                        $iFrame.contents().find('form').on('submit',function(){
                            $['mascaraCarga']();
                        });

                        // vamos a hacer un hook de la función postback original para obligarle a que muestre la barra de carga
                        if($iFrame[0]['contentWindow']){
                            var postBackOriginal = $iFrame[0]['contentWindow']['__doPostBack'];
                            var nuevoPostBack = function (eventTarget, eventArgument) {
                                $['mascaraCarga']();
                                return postBackOriginal(eventTarget, eventArgument);
                            };
                            $iFrame[0]['contentWindow']['__doPostBack'] = nuevoPostBack;
                        }
                    }
                });
            }
            ventana['el']['$mensaje'].append($iFrame);
        }
        
        // si no hay botones o texto en barra de título los ocultamos
        ventana['el']['$titulo'].toggle ( (ventana['titulo']  !='' ? true : false) );
        ventana['el']['$botones'].toggle( (ventana['botones'] !='' ? true : false) );
        ventana['el']['$icono'].toggle( !esIframe );
        
        // ponemos los botones
        ventana['el']['$botones'].empty();
        for (i = 0, size = ventana['botones'].length; i < size; i++) {
        
            if (!ventana['botones'][i].jquery) {
                ventana['el']['$botones'].append(crearBoton(ventana['botones'][i],ventana));
            } else ventana['el']['$botones'].append(ventana['botones'][i]);
        }
        ventana['id']    = ventanas.length;
        ventanaActiva = ventana['id'];
        ventanas.push(ventana);
    };
    
})(window, document, jQuery);