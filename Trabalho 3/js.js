	//verificar usuário logado
		function verUser(){
			if (localStorage.userBrasil!="") {
				$(".cadastro").toggleClass("hidden") ;
				$(".login").toggleClass("hidden");
				$(".sair").toggleClass("hidden");
				$(".botaoFinalizar").toggleClass("hidden");
				$(".buy").toggleClass("hidden");
			}
		}
	verUser();
	// retrieveCart()
	
	//captura formulário
	let username = "";
	let userPassword = "";

	// Validar formulário
	function validar(){
		let permite = true;
		for (var i = 0; i <users.length; i++) {
			if (username==users[i].userBrasil) {
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
			data:{userBrasil:username, password:userPassword},
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
		let users = [];
		$.ajax({
			type: 'GET',
			url: 'http://rest.learncode.academy/api/pedrasbrasil/users',
			success: function(data){
				let users = data;
				for (var i = 0; i <users.length; i++) {
					if (a==users[i].userBrasil || b==users[i].password) {
						permite = true;
						break;
					}
				}
				if (permite == true) {
					localStorage.userBrasil=a;
					$(".cadastro").toggleClass("hidden") ;
					$(".login").toggleClass("hidden");
					$("#inputUsuario").val("");
					$("#inputPasword").val("");
					$(".buy").toggleClass("hidden");
					$(".sair").toggleClass("hidden");
					$(".botaoFinalizar").toggleClass("hidden");
					alert("Login Efetuado!");
				}else{
					alert("Deu ruim, usuário ou senha incorreta")
				}
			}
		});
	}

	let inputUsuario = "";
	let inputPasword = "";
		$("#logar").click(function(event){
			event.preventDefault();
			inputUsuario = $("#inputUsuario").val();
			inputPasword = $("#inputPasword").val();
			validaLogin(inputUsuario,inputPasword);
		})

	//deslogar

	$(".sair").click(function(event){
		event.preventDefault();
		permite = false;
		localStorage.userBrasil="";
		$(".cadastro").toggleClass("hidden") ;
		$(".login").toggleClass("hidden");
		$(".sair").toggleClass("hidden");
		$(".botaoFinalizar").toggleClass("hidden");
		$(".buy").toggleClass("hidden");
		window.location.href='galeria.html';
	})

	//Adicionar a lista

	let products = new Array;
	$(".adccart").click(function(){
		let item = {
			nome: $(this).offsetParent().find(".pName").text(),
			valor: $(this).offsetParent().find(".valor").text(),
			quantidade: $(this).offsetParent().find("#quantidade").val(),
			imagem_src: $(this).offsetParent().find(".pImage").attr('src')
		};
		products.push(item);
		localStorage.clear();
		localStorage.setItem("products", JSON.stringify(products));
	});

	$(".minhas-compras").click(function(){
		let productsLocalStorage = JSON.parse(localStorage.getItem("products"));
		$(".carro").empty();
		if (productsLocalStorage.length == 0) {
			$(".carro").append('<p id="textoA">Você ainda não adicionou nenhum produto :(</p>');
		} else {
			for (i = 0; i < productsLocalStorage.length; i++) {
				var lil = $('<div class="lilcard"><img width="50px" height="50px" class="foto" src="'
					+productsLocalStorage[i].imagem_src+'"><span class="nomeP">'
					+productsLocalStorage[i].nome+'</span><span class=" valorP">'
					+"R$"+productsLocalStorage[i].valor+'</span><span class="quantidadeP">'
					+"Quantidade: "+productsLocalStorage[i].quantidade+'</span></div>');
				$(".carro").append(lil);
			}
		}
	});

