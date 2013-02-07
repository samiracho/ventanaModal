@ECHO OFF
ECHO Batch compresion archivos JS mediante Google Closure Compiler Modo ADVANCED
ECHO Espere...

java -jar compiler.jar --js mascara-carga.js ventana-modal.js  --externs jquery_extern.js --compilation_level ADVANCED_OPTIMIZATIONS --js_output_file min.js --warning_level QUIET --output_wrapper "(function() {%%output%%})();" 

ECHO.
ECHO Compilacion Javascript finalizada
ECHO.

ECHO Concatenando archivos JS
ECHO Espere...

copy /b ..\jquery-1.9.1.min.js + ..\jquery.maskedinput.min.js + min.js sgi.min.js

ECHO.
ECHO Concatenacion Javascript finalizada: archivo sgi.min.js
ECHO.

PAUSE