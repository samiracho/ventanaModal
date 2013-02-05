<?php
	sleep(1);
	if( isset($_POST['mi_texto']) )
	{
		header ("Location: formulario2.php");
	}
?>
<html>
	<body>
		<h1>Formulario 1</h1>
		<form method="post" action ="formulario.php">
			<input type = "text" name="mi_texto" value="2" />
			<input type = "submit" value="enviar" />
		</form>
	</body>
</html>