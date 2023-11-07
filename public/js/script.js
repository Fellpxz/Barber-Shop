// MOSTRAR CARTÃO!

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

// FETCH DATA!

async function comprarServico(serviceId) {
  try {
    const response = await fetch(`/comprar-servico/${serviceId}`, {
      method: "POST",
    });

    if (response.status === 200) {
      // Atualizar a interface do usuário após a compra bem-sucedida
      const data = await response.json();
      // Atualizar o saldo na interface do usuário
      const saldoElement = document.getElementById("saldo");
      if (saldoElement) {
        saldoElement.innerText = `${data.saldo} Reais`;
      }
    } else {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}
