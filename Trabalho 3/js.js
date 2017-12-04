	//verificar usuário logado
		function verUser(){
			if (localStorage.user!="") {
				$(".cadastro").toggleClass("hidden") ;
				$(".login").toggleClass("hidden");
				$(".sair").toggleClass("hidden");
				$(".botaoFinalizar").toggleClass("hidden");
				$(".buy").toggleClass("hidden");
			}
		}
	verUser();

	// Carregar usuários cadastrados:
	let users = [];
	function getUsers(){
		$.ajax({
			type: 'GET',
			url: 'http://rest.learncode.academy/api/pedrasbrasil/users',
			success: function(data){
				users = data;
			}
		});
	};
	getUsers();
	
	//captura formulário
	let username = "";
	let userPassword = "";

	// Validar formulário
	function validar(){
		let permite = true;
		for (var i = 0; i <users.length; i++) {
			if (username==users[i].user) {
				permite = false;
				break;
			}
		}
		if (permite == true) {
			cadastrar();
		}else{
			alert("Deu ruim, usuário já existe")
		}
	}

	//Cadastrar
	function cadastrar() {
		$.ajax ({
			type:'POST',
			url:'http://rest.learncode.academy/api/pedrasbrasil/users',
			data:{user:username, password:userPassword},
			dataType: 'json',
			success: function(data){
				alert("Usuário Cadastrado! Entre com seu usuário e senha!")
			}
		});
		$("#setUsuario").val("");
		$("#setPasword").val("");
	};

	//valida e executa cadastro
	$("#cadastrar").click(function(event){
		event.preventDefault();
		username = $("#setUsuario").val();
		userPassword = $("#setPasword").val();
		validar();
	})

	//logar usuário

	let permite = false;
	function validaLogin(a,b){
		for (var i = 0; i <users.length; i++) {
			if (a==users[i].user || b==users[i].password) {
				permite = true;
				break;
			}
		}
		if (permite == true) {
			localStorage.user=a;
			$(".cadastro").toggleClass("hidden") ;
			$(".login").toggleClass("hidden");
			$("#inputUsuario").val("");
			$("#inputPasword").val("");
			$(".buy").toggleClass("hidden");
			$(".sair").toggleClass("hidden");
			$(".botaoFinalizar").toggleClass("hidden");
		}else{
			alert("Deu ruim, usuário ou senha incorreta")
		}
	}

	let inputUsuario = "";
	let inputPasword = "";
		$("#logar").click(function(event){
			event.preventDefault();
			inputUsuario = $("#inputUsuario").val();
			inputPasword = $("#inputPasword").val();
			validaLogin(inputUsuario,inputPasword);
			alert("Login Efetuado!");
		})

	//deslogar

	$(".sair").click(function(event){
		event.preventDefault();
		permite = false;
		localStorage.user="";
		$(".cadastro").toggleClass("hidden") ;
		$(".login").toggleClass("hidden");
		$(".sair").toggleClass("hidden");
		$(".botaoFinalizar").toggleClass("hidden");
		$(".buy").toggleClass("hidden");
	})

	//Adicionar a lista
	$(".adccart").click(function(){
		let botaoFinalizar = $(".botaoFinalizar"); 
		let produtoImagem = ($(this).offsetParent().find(".card-image-top").attr("src"));
		let produtoNome = ($(this).offsetParent().find(".card-title").text());
		let produtoValor = ($(this).offsetParent().find(".valor").text());
console.log(produtoImagem)
		// var image = $("<div></div>").addClass("col-md-3").append(produtoImagem);
		// var nomP = $("<div></div>").addClass("col-md-3").append(produtoNome);
		// var valP = $("<div></div>").addClass("col-md-3").append("R$",produtoValor);


		// var cartao = $("<div></div>").addClass("row cartao").append(image, nomP, valP);

		// $(".carro").append(cartao)
	})