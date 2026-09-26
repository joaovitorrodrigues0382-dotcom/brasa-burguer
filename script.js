let carrinho = [];

function adicionarProduto(nome, preco) {
    let produto = carrinho.find(item => item.nome === nome);

    if (produto) {
        produto.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}

function aumentarQuantidade(nome) {
    let produto = carrinho.find(item => item.nome === nome);
    produto.quantidade++;
    atualizarCarrinho();
}

function diminuirQuantidade(nome) {
    let produto = carrinho.find(item => item.nome === nome);

    produto.quantidade--;

    if (produto.quantidade <= 0) {
        carrinho = carrinho.filter(item => item.nome !== nome);
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    let carrinhoHTML = "<h2>🛒 Seu Pedido</h2>";

    if (carrinho.length === 0) {
        carrinhoHTML += "<p>Nenhum produto adicionado.</p>";
    } else {
        let total = 0;

        carrinho.forEach(function(produto) {
            let subtotal = produto.preco * produto.quantidade;
            total += subtotal;

            carrinhoHTML += `
                <div>
                    <p>
                        ${produto.nome} - R$ ${subtotal.toFixed(2)}
                    </p>

                    <button onclick="diminuirQuantidade('${produto.nome}')">−</button>

                    ${produto.quantidade}

                    <button onclick="aumentarQuantidade('${produto.nome}')">+</button>
                </div>
            `;
        });

        carrinhoHTML += `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
    }

    document.getElementById("carrinho").innerHTML = carrinhoHTML;
}function enviarPedido() {
    let mesa = document.getElementById("numeroMesa").value;
    let observacoes = document.getElementById("descricaoPedido").value;

    if (mesa === "") {
        alert("Digite o número da mesa!");
        return;
    }

    if (carrinho.length === 0) {
        alert("Adicione pelo menos um produto ao pedido!");
        return;
    }

    let mensagem = "🍔 NOVO PEDIDO%0A%0A";
    mensagem += "Mesa: " + mesa + "%0A%0A";
    mensagem += "Observações: " + observacoes + "%0A%0A";

    let total = 0;

    carrinho.forEach(function(produto) {
        let subtotal = produto.preco * produto.quantidade;
        total += subtotal;

        mensagem += produto.quantidade + "x " + produto.nome;
        mensagem += " - R$ " + subtotal.toFixed(2) + "%0A";
    });

    mensagem += "%0ATOTAL: R$ " + total.toFixed(2);

    let numeroWhatsApp = "5585986970318";

    let link = "https://wa.me/" + numeroWhatsApp + "?text=" + mensagem;

    window.open(link, "_blank");
}