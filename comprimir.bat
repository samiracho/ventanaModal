@ECHO OFF
ECHO Batch compresion archivos JS mediante Google Closure Compiler Modo ADVANCED
ECHO Espere...

java -jar compiler.jar --js mascara-carga.js ventana-modal.js  --externs jquery_extern.js --compilation_level ADVANCED_OPTIMIZATIONS --js_output_file min.js --warning_level QUIET

ECHO.
ECHO Compilacion Javascript finalizada
ECHO.
PAUSE