	if (localStorage.getItem("userBrasil")) {
		$(".cadastro").toggleClass("hidden") ;
		$(".login").toggleClass("hidden");
		$(".sair").toggleClass("hidden");
		$(".botaoFinalizar").toggleClass("hidden");
		$(".buy").toggleClass("hidden");
	}

	$(".home").click(function(){
		window.location.href='galeria.html';
	})

	//captura formulário
	let username = "";
	let userPassword = "";

	//Cadastrar
	function cadastrar() {
		let permite = true;
		$.ajax({
			type: 'GET',
			url: 'http://rest.learncode.academy/api/pedrasbrasil/users',
			success: function(data){
				let users = data;
				for (var i = 0; i <users.length; i++) {
					if (username==users[i].userBrasil) {
						permite = false;
						alert("Deu ruim, usuário já existe");
						break;
					}
				}
				if (permite == true) {
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
				}
			}
		});
	};



	//valida e executa cadastro

	let erro1 = true;
    let erro2 = true;
    function refreshButton() {
        if (erro1 == true || erro2 == true) {
            $("#cadastrar").addClass("disabled");
            $("#logar").addClass("disabled");
        } else {
            $("#cadastrar").removeClass("disabled");
            $("#logar").removeClass("disabled");
        }
    }
    $("#setUsuario").keypress(function () {
        if (this.value == "") {
            // Inválido
            $("#labelErro1").show();
            $("#forUser").addClass("has-error");
            erro1 = true;
        } else {
            // Válido
            $("#labelErro1").hide();
            $("#formUser").removeClass("has-error");
            erro1 = false;
        }
        refreshButton();
    })
    $("#inputUsuario").keypress(function () {
        if (this.value == "") {
            // Inválido
            $("#labelErroA").show();
            $("#username").addClass("has-error");
            erro1 = true;
        } else {
            // Válido
            $("#labelErroA").hide();
            $("#username").removeClass("has-error");
            erro1 = false;
        }
        refreshButton();
    })
    $("#setPasword").keypress(function () {
        if (this.value == "") {
            // Inválido
            $("#labelErro2").show();
            $("#forPassword").addClass("has-error");
            erro2 = true;
        } else {
            // Válido
            $("#labelErro2").hide();
            $("#forPassword").removeClass("has-error");
            erro2 =	 false;
        }
        refreshButton();
    });
    $("#inputPasword").keypress(function () {
        if (this.value == "") {
            // Inválido
            $("#labelErroB").show();
            $("#fuserpassword").addClass("has-error");
            erro2 = true;
        } else {
            // Válido
            $("#labelErroB").hide();
            $("#userpassword").removeClass("has-error");
            erro2 =	 false;
        }
        refreshButton();
    });

	$("#cadastrar").click(function(event){
		event.preventDefault();
		username = $("#setUsuario").val();
		userPassword = $("#setPasword").val();
		cadastrar();
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
					if (a==users[i].user && b==users[i].password) {
						permite = true;
						break;
					}
				}
				if (permite == true) {
					localStorage.setItem("userBrasil", a);
					$(".cadastro").toggleClass("hidden") ;
					$(".login").toggleClass("hidden");
					$(".buy").toggleClass("hidden");
					$(".sair").toggleClass("hidden");
					$(".botaoFinalizar").toggleClass("hidden");
					alert("Login Efetuado!");
				}else{
					$("#inputUsuario").val("");
					$("#inputPasword").val("");
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
		localStorage.removeItem("userBrasil");
		localStorage.removeItem("products");
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
		localStorage.removeItem("products");
		localStorage.setItem("products", JSON.stringify(products));
	});

	$(".minhas-compras").click(function(){
		let productsLocalStorage = new Array;
		if (localStorage.getItem("products")) {
			productsLocalStorage = JSON.parse(localStorage.getItem("products"));
		}
		$(".carro").empty();
		if (productsLocalStorage.length == 0) {
			$(".finalizar").addClass("hidden");
			$(".carro").append('<p id="textoA">Você ainda não adicionou nenhum produto <br>:(</br></p>');
		} else {
			for (i = 0; i < productsLocalStorage.length; i++) {
				var lil = $('<div class="lilcard row"><img width="50px" height="50px" class="foto" src="'
					+productsLocalStorage[i].imagem_src+'"><span class="nomeP">'
					+productsLocalStorage[i].nome+'</span><span class=" valorP">'
					+"R$"+productsLocalStorage[i].valor+'</span><span class="quantidadeP">'
					+"Quantidade: "+productsLocalStorage[i].quantidade+'</span></div>');
				$(".carro").append(lil);
				$(".finalizar").removeClass("hidden");
			}
		}
	});

// converter valores:___________________

function moedaParaNumero(valor){
   	return isNaN(valor) == false ? parseFloat(valor) :   parseFloat(valor.replace("R$","").replace(".","").replace(",","."));
}
function numeroParaMoeda(numero){
    var numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}
//________________________

	$(".finalizar").click(function(){
		window.location.href='minhascompras.html';
	})

	//preencher minhas compras
	let productsLocalStorage = new Array;
		if (localStorage.getItem("products")) {
			productsLocalStorage = JSON.parse(localStorage.getItem("products"));
		}
	let soma = 0;
	let T = "";

	for (i = 0; i< productsLocalStorage.length; i++) {
		let produto = $('<div class="produto col-sm-12"><img width="100px" height="100px" class="fotoA" src="'
		+productsLocalStorage[i].imagem_src+'"><span class="nome">'
		+productsLocalStorage[i].nome+'</span><span class=" valor">'
		+"R$"+productsLocalStorage[i].valor+'</span><span class="quantidade">'
		+"Quantidade: "+productsLocalStorage[i].quantidade+'</span></div>');
		var v = moedaParaNumero(productsLocalStorage[i].valor);
		var q = moedaParaNumero(productsLocalStorage[i].quantidade);
		soma = soma+(v*q);
		T = numeroParaMoeda(soma);
		$(".minhascompras").append(produto);
	}
	$(".valorTotal").text(T);

//histórico
	function retrieveHistorico(){
		if (productsLocalStorage.length==0) {
			$(".aHxW").addClass("hidden");
			$(".Fcompra").toggleClass("hidden");
		}
		$.ajax({
			type: 'GET',
			url: 'http://rest.learncode.academy/api/pedrasbrasil/comprasefetuadas',
			success: function(data){
				let compras = data;
				for (var i = 0; i <compras.length; i++) {
					let dinheiros = Number(compras[i].quanto);
					let moeda = numeroParaMoeda(dinheiros);
					if (compras[i].quem==localStorage.userBrasil) {
						var produto = $('<div class="container-fluid"><div class="produto row"><span class="col-xs-6 nome">'
						+compras[i].quando+'</span><span class="col-xs-6 valor">'+'Total da compra: '
						+moeda+'</span></div>');
						$(".historico").append(produto);
						localStorage.removeItem("products");
					}
				}
			}
		});
	}
	retrieveHistorico();

// finalizar

	$(".Fcompra").click(function(){
		let x = new Date();
		usuarioCompra = localStorage.getItem("userBrasil");
		var dataCompra = "Compra efetuada no dia " + x.getDate() + "/"
                + (x.getMonth()+1)  + "/" 
                + x.getFullYear() + " as "  
                + x.getHours() + ":"  
                + x.getMinutes() + ":" 
                + x.getSeconds();
        $.ajax ({
			type:'POST',
			url:'http://rest.learncode.academy/api/pedrasbrasil/comprasefetuadas',
			data:{quem:usuarioCompra, quanto:soma, quando:dataCompra},
			dataType: 'json',
			success: function(data){
				alert("Compra efetuada com sucesso!")
				$(".Fcompra").addClass("hidden");
				$(".aHxW").addClass("hidden");
				$(".valorTotal").addClass("hidden");
				$(".historico").empty();
				$(".minhascompras").empty();
				retrieveHistorico();
			}
		});
	})

