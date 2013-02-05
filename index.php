<!DOCTYPE html>
<html>

	<head>
		<meta http-equiv="Cache-control" content="private">
		<link rel="stylesheet" type="text/css" href="ventana-modal.css" />
		<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
		<script type="text/javascript" src="min.js"></script>		
		<script type="text/javascript">		
			var men = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis felis venenatis nisl pellentesque scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae dolor in ligula sodales aliquam. Sed viverra arcu nec arcu vehicula in fermentum lectus rhoncus. Nullam sed odio mauris. Praesent ullamcorper pellentesque justo vitae lobortis. Duis turpis purus, fermentum a luctus et, blandit nec arcu. Vestibulum quis enim vel turpis dignissim luctus. Donec commodo congue tempor. Donec leo leo, consequat quis vulputate vel, tristique et lectus. Nam euismod scelerisque posuere. Suspendisse potenti";
			
			function __doPostBack(myId){alert('Postback de un elemento de la página principal '+myId)};
			
			$(function() {
     
				$('#myButton').ventanaModal( 'alerta' , men).css('color', 'red');
				$('#myButton1').ventanaModal( 'ok' , men).css('color', 'green');
				$('#myButton2').ventanaModal( 'siNo' , men, '', function(){alert('si')});
				
				
				$('#myButton3').on('click', function(){
					$.mascaraCarga();
				});
				
				$('#myButton4').on('click', function(){
					$.ventanaModal('error', men);
				});
				
				$('#myButton5').on('click', function(){
					$.ventanaModal('info');
				});
				
				$('#myButton6').on('click', function(){
					
					$.ventanaModal({
						ancho   : 460,
						alto    : 250,
						mensaje : 'Nombre:<input type="text" value= "Campo de texto" /><br />',
						titulo  : '',
						icono   : $.ventanaModal('imagen','info'),
						botones :[     
							{ funcion: 'cerrar', texto:'Salir' },
							{ funcion: function(){$.ventanaModal('get','mensaje').append('Nombre:<input type="text" value= "" /><br />');}, texto:'Agregar'},
							{ funcion: function(){var t = "";$.ventanaModal('get','mensaje').find('input').each(function( index ){t+=' '+ $(this).val();});alert(t);}, texto:'Leer'},
							{ funcion: '<%=button1.UniqueID%>', texto:'Postback' },
							{ funcion: function(){$.ventanaModal( 'siNo' , men);}, texto:'Otro' }
						]
					});
				});
				
				$('#myButton7').ventanaModal( 'iframe' , 'formulario.php', 'Mi Iframe (el título es opcional)', 'cerrar');
				
				$('#myButton8').ventanaModal( 'iframe' , 'iframe.html');
				
				$('#myButton9').ventanaModal( { tipo:'iframe', mensaje:'http://www.microsoft.es',titulo:'Mi iframe personalizado', botones:[{ funcion: 'cerrar', texto:'Botón Salir Personalizado' }] } );
				
				$('#myButton10').on('click', function(){
				
						var tipos = ['info','ok','siNo','error', 'alerta'];
						var timeOut = 0;
						for(i = 0; i < 100; i++){
							timeOut += 100;
							setTimeout(function() {$.ventanaModal( tipos[Math.floor(Math.random()*5)] , men)}, timeOut);
							timeOut += 100;
							setTimeout(function() {$.ventanaModal.cerrar();}, timeOut);		
						}
				});
				
			});
		</script>
	</head>
	<body>
		<h1> Pruebas Ventana Modal v2 </h1>
		<input id="myButton" type ="button" value="Alerta" />
		<input id="myButton1" type ="button" value="OK" />
		<input id="myButton2" type ="button" value="Confirmacion" />
		<input id="myButton3" type ="button" value="Máscara de carga" />
		<input id="myButton4" type ="button" value="Error" />
		<input id="myButton5" type ="button" value="Info" />
		<input type ="button" value="etiqueta onclick" onclick="$.ventanaModal()" />
		<input id="myButton6" type ="button" value="Personalizada sin título" />
		<input id="myButton7" type ="button" value="Probando iframe con máscara de carga" />
		<input id="myButton8" type ="button" value="Solo Iframe" />
		<input id="myButton9" type ="button" value="Iframe personalizado" />
		<input id="myButton10" type ="button" value="Lanzar Prueba Stress" />
		<br /><br />
		<iframe src="iframe.html"></iframe>
		
		<?php
			if( isset($_POST['mi_texto']) ){
				sleep(2);
				echo "<h2>Formulario enviado:".$_POST['mi_texto']."</h2>";
			}
		?>	
		<form id="myForm" method="post" action ="" >
			<input type = "text" name="mi_texto" value="2" />
			<input type = "submit" value="enviar" />
		</form>
		
		
	</body>
</html>
