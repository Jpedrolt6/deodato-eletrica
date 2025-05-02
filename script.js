// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });

      // Adiciona/remover classe 'active'
      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});

// Menu Responsivo (hambúrguer)
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('open');
  menuToggle.classList.toggle('open');
});

// Mostrar botão "Voltar ao topo" quando rolar a página
window.addEventListener('scroll', () => {
  const btn = document.getElementById('btn-topo');
  if (window.scrollY > 300) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
});

// Voltar suavemente ao topo
document.getElementById('btn-topo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Abrir/Fechar Modal
const abrirModal = document.getElementById("abrir-modal");
const modal = document.getElementById("modal-orcamento");
const fecharModal = document.querySelector(".fechar");

abrirModal.addEventListener("click", () => {
  modal.style.display = "block";
});

fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Fechar o modal ao clicar fora dele
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

// Enviar formulário de forma assíncrona com AJAX
document.getElementById("form-orcamento").addEventListener("submit", function(e) {
  e.preventDefault(); // Impede o envio do formulário

  const nome = document.getElementById("nome").value;
  const tel = document.getElementById("tel").value;
  const servico = document.getElementById("servico").value;

  if (nome && tel && servico) {
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("tel", tel);
    formData.append("servico", servico);
    formData.append("_captcha", "false");

    // Envia os dados para o FormSubmit via AJAX
    fetch("https://formsubmit.co/ajax/jp1999@outlook.com.br", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Limpar o formulário
        document.getElementById("form-orcamento").reset();

        // Exibir a mensagem de sucesso na parte superior
        const feedback1 = document.getElementById("form-feedback");
        feedback1.style.display = "block"; // Exibe a mensagem de sucesso

        // Ocultar a mensagem de sucesso após 5 segundos
        setTimeout(() => {
          feedback1.style.display = "none";
        }, 8000);  // A mensagem desaparece depois de 5 segundos
      } else {
        alert("Algo deu errado. Tente novamente!");
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert("Ocorreu um erro. Por favor, tente novamente.");
    });
    
    // Fecha o modal
    modal.style.display = "none";
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});

// === Ver mais nos projetos ===
// Aqui a gente unifica as duas funções que estão tentando fazer o mesmo trabalho
const botoesVerMais = document.querySelectorAll('.ver-mais-btn');
const todasAsFotos = document.querySelectorAll('.fotos-projeto');

botoesVerMais.forEach((botao, index) => {
  botao.addEventListener('click', () => {
    // Fecha todas as seções de fotos
    todasAsFotos.forEach((fotos, i) => {
      if (i !== index) {
        fotos.style.display = 'none';
      }
    });

    // Alterna o display da seção clicada
    const fotos = todasAsFotos[index];
    fotos.style.display = fotos.style.display === 'none' ? 'flex' : 'none';
  });
});
