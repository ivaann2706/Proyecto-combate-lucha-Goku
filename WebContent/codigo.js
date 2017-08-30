angular
	.module("miModulo",[])
	.controller("miControlador", ["$http",mainController]);

function mainController($http){
	var vm = this;
	
	vm.listaJugadores = [];
	
	vm.obtenerLuchadores = function(){
		
		var exito = function(resp){
			do{
				vm.listaJugadores = resp.data;
			    vm.jugadorAleatorio1=vm.listaJugadores[Math.trunc(Math.random()*(9-0+1)+0)];
			    vm.jugadorAleatorio2=vm.listaJugadores[Math.trunc(Math.random()*(9-0+1)+0)];
			}while(vm.jugadorAleatorio1 == vm.jugadorAleatorio2);
			
			if((vm.jugadorAleatorio1.defensa > vm.jugadorAleatorio2.ataque) && ((vm.jugadorAleatorio2.defensa > vm.jugadorAleatorio1.ataque)) && vm.listaJugadores.length>0){
				alert("Hay un empate técnico entre los dos jugadores siguientes");
			}
			
		};

		var error = function(){
			alert("Ha habido un error en la consulta");
		};

		$http.get("datos/lista.json").then(exito,error);
	};
	
	vm.atacar1al2 = function(){
		if(vm.jugadorAleatorio2.defensa < vm.jugadorAleatorio1.ataque && vm.jugadorAleatorio2.vida>0 ){
			vm.jugadorAleatorio2.vida = vm.jugadorAleatorio2.vida - vm.jugadorAleatorio1.ataque + vm.jugadorAleatorio2.defensa;
		}
		if(vm.jugadorAleatorio2.vida<0){
			vm.jugadorAleatorio2.vida=0;
			alert(vm.jugadorAleatorio2.nombre + " ha muerto \n FIN de la partida");
			vm.listaJugadores =[];
		}
	}
	
	vm.atacar2al1 = function(){
		if(vm.jugadorAleatorio1.defensa < vm.jugadorAleatorio2.ataque && vm.jugadorAleatorio1.vida>0 ){
			vm.jugadorAleatorio1.vida = vm.jugadorAleatorio1.vida - vm.jugadorAleatorio2.ataque + vm.jugadorAleatorio1.defensa;
		}
		if(vm.jugadorAleatorio1.vida<0){
			vm.jugadorAleatorio1.vida=0;
			alert(vm.jugadorAleatorio1.nombre + " ha muerto \n FIN de la partida");
			vm.listaJugadores =[];
		}
	}
	
	
	
	

	
}
