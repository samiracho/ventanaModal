// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @warning_level QUIET
// @output_file_name miplugin.js
// @externs_url http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js
// ==/ClosureCompiler==

/// <reference path="jquery-1.9.0-vsdoc.js" />

/**
 * @fileoverview Plantilla de creación de plugin jQuery.
 * @version 0.1
 * @author Sami Racho 06/02/2013
*/

;(function ($) {

    var nombrePlugin = 'miPlugin';

    // configuración por defecto
    /** @dict */
    var porDefecto = {
        'valor1': null,
        'valor2': null
    };

    // constantes (ClosureCompiler respetará el nombre)
    /** @const */
    var miConstante;

    var methods = {
        'init': function (options) {

            return this.each(function () {

            });

        },
        'destroy': function () {

            return this.each(function () {

            })
        }
    };


    $['fn'][nombrePlugin] = function (method) {
    /// <summary>
    /// Descripción de mi plugin
    /// </summary>
    /// <param name="config" type="string">Descripción de los posibles parámetros</param>

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('El metodo ' + method + ' no existe en jQuery.' + nombrePlugin);
        }

    };

    // ----------------------------------------------------------------------------------------------------------
    // Funciones privadas
    // ----------------------------------------------------------------------------------------------------------

    /**
     * Descripción de mi función privada
     * @param {Object} parametro  Mi parámetro.
     * @private
     */
    function miFuncionPrivada1(parametro){
    
    }

})(jQuery);