// Mostrar e Ocultar / Cartão!
const toggleButton = document.getElementById("toggle-credit-card");
const criarCartao = document.getElementById("criar-cartao");

let isCreditCardFormVisible = false;

toggleButton.addEventListener("click", () => {
  if (isCreditCardFormVisible) {
    criarCartao.style.display = "none";
  } else {
    criarCartao.style.display = "flex";
  }
  isCreditCardFormVisible = !isCreditCardFormVisible;
});

// Mostrar e Ocultar / Carrinho!
const toggleCartButton = document.getElementById("toggle-cart");
const carrinho = document.getElementById("carrinho");

let isCartVisible = false;

toggleCartButton.addEventListener("click", () => {
  if (isCartVisible) {
    carrinho.style.display = "none";
  } else {
    carrinho.style.display = "flex";
  }
  isCartVisible = !isCartVisible;
});

// Mostrar e Ocultar / Usable
const toggleUsableButton = document.getElementById("toggle-usable");
const usable = document.getElementById("utilizaveis");

let isUsableVisible = false;

toggleUsableButton.addEventListener("click", () => {
  if (isUsableVisible) {
    usable.style.display = "none";
  } else {
    usable.style.display = "flex";
  }
  isUsableVisible = !isUsableVisible;
});

// POST REQUEST:
// CONFIMAR COMPRA!
async function confirmarCompra() {
  try {
    const response = await fetch("/comprar-carrinho", {
      method: "POST",
    });

    if (response.ok) {
      // A lógica adicional após uma resposta bem-sucedida, se necessário
      console.log("Compra confirmada com sucesso!");
      alert("Compra efetuada com sucesso!");
      // Recarrega a página após o alerta ser fechado
      window.location.reload();
    } else {
      const errorData = await response.json();
      if (errorData.error === "Saldo insuficiente") {
        // Exibe um alerta se o erro for de saldo insuficiente
        alert("Saldo insuficiente. Não é possível concluir a compra.");
      } else {
        throw new Error(`Erro na solicitação: ${response.status}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// DELETAR ITEM!
document.addEventListener("DOMContentLoaded", () => {
  const utilizarButtons = document.querySelectorAll(".utilizar-btn");

  utilizarButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const utilizavelId = button.getAttribute("data-id");
      utilizarItem(utilizavelId);
    });
  });

  async function utilizarItem(id) {
    try {
      const response = await fetch(`/utilizaveis/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("UTILIZADO COM SUCESSO!");
        location.reload(); // Recarrega a página
      } else {
        const errorData = await response.json();
        console.error(`Erro ao utilizar item: ${errorData.error}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
});
