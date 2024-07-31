async function getData(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new Error("Erro");
    }
    const data = await response.json();
    document.getElementById("bairro").textContent = `${data.bairro || ""}`;
    document.getElementById("cidade").textContent = `${data.localidade || ""}`;
    document.getElementById("UF").textContent = `${data.uf || ""}`;
    document.getElementById("rua").textContent = `${data.logradouro || ""}`;

    return data;
  } catch (error) {
    console.error("Erro:", error);
  }
}

function handleClick() {
  const cepInput = document.getElementById("cepInput").value.replace(/\D/g, "");
  if (cepInput.length === 8) {
    getData(cepInput).then((data) => {
      if (data.erro) {
        alert("CEP inválido - Não foi encontrado nenhum endereço");
      }
      console.log("Dados coletados:", data);
    });
  } else {
    alert("Insira um CEP válido");
  }
}
