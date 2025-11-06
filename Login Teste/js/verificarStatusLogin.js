// auth_ui.js

// 💡 A função deve ser definida no escopo global
function verificarStatusLogin() {
    const token = localStorage.getItem('jwtToken');
    
    // Elementos da página principal (adaptados do seu código)
    const botaoLogin = document.getElementById('botao-login');
    const botaoCadastro = document.getElementById('botao-cadastro');
    const menuUsuario = document.getElementById('menu-usuario');
    const conteudoSecreto = document.getElementById('conteudo-protegido')
    // Adicione mais elementos aqui conforme seu HTML

    if (token) {
        // Logado
        if (botaoLogin) botaoLogin.style.display = 'none';
        if (botaoCadastro) botaoCadastro.style.display = 'none';
        if (menuUsuario) menuUsuario.style.display = 'block';
        if(conteudoSecreto) conteudoSecreto.style.display = 'block';
        
        // Aqui você chamaria a função para buscar o nome do usuário usando o token
        // carregarDadosUsuario(token); 
    } else {
        // Não Logado
        if (botaoLogin) botaoLogin.style.display = 'block';
        if (botaoCadastro) botaoCadastro.style.display = 'block';
        if (menuUsuario) menuUsuario.style.display = 'none';
    }
}

// Rotina de Logout (apenas para completar o ciclo)
document.addEventListener('click', (event) => {
    if (event.target.id === 'botao-logout') {
        localStorage.removeItem('jwtToken'); // Remove o token
        window.location.href = '.'; // Redireciona
    }
});

// 💡 Executa a verificação assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', verificarStatusLogin);