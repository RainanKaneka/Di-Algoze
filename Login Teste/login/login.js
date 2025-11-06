document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formLogin');
    const mensagemElement = document.getElementById('mensagemStatus');

    // 1. Adiciona um "ouvinte" ao evento de envio do formulário
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // <-- CRUCIAL: Impede que a página recarregue
        
        // Limpa mensagens anteriores
        mensagemElement.textContent = 'Processando...';
        mensagemElement.style.color = 'blue';

        // 2. Coleta os dados dos campos
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        // 3. Monta o objeto de dados (Body) que será enviado ao Backend
        const dadosLogin = { email, senha };
        
        // URL da sua rota de cadastro
        const urlLogin = 'http://localhost:5500/api/auth/login'; 

        try {
            // 4. Faz a requisição POST (O fetch é assíncrono!)
            const response = await fetch(urlLogin, {
                method: 'POST', // Método HTTP
                // 💡 Cabeçalho (Header) para dizer ao servidor que o Body é JSON
                headers: {
                    'Content-Type': 'application/json' 
                },
                // Converte o objeto JavaScript para uma string JSON (necessário para o Body)
                body: JSON.stringify(dadosLogin) 
            });

            const data = await response.json(); // Tenta ler a resposta JSON

            // 5. Trata a Resposta do Backend
            if (response.ok) { // Verifica se o status é 2xx (Sucesso)
                localStorage.setItem('jwtToken', data.token);
                mensagemElement.textContent = data.mensagem || 'Login realizado com sucesso!';
                mensagemElement.style.color = 'green';
                form.reset(); // Limpa o formulário após sucesso
                window.location.href = "../index.html"
            } else {
                // Se o status for 400, 500, etc. (Erro)
                mensagemElement.textContent = `Erro no login: ${data.erro || 'Tente novamente.'}`;
                mensagemElement.style.color = 'red';
            }

        } catch (error) {
            // Erro de rede (servidor offline, CORS)
            mensagemElement.textContent = 'Erro de conexão com o servidor. Verifique se o servidor está rodando.';
            mensagemElement.style.color = 'darkred';
            console.error('Erro de rede:', error);
        }
    });
});