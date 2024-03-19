document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("search-form");
    const input = document.getElementById("song-title");
    const lyricsContainer = document.getElementById("lyrics-container");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página

        const searchTerm = input.value.trim(); // Obtém o valor do campo de entrada e remove espaços em branco extras

        if (searchTerm === "") {
            alert("Por favor, digite o título da música."); // Verifica se o campo de entrada está vazio
            return;
        }

        searchLyrics(searchTerm);
    });

    async function searchLyrics(title) {
        try {
            // Substitua 'YOUR_API_KEY' pela sua chave de API
            const response = await fetch(`https://api.lyrics.ovh/v1/${title}`);
            const data = await response.json();

            if (response.ok) {
                displayLyrics(data.lyrics);
            } else {
                displayError("Letra não encontrada.");
            }
        } catch (error) {
            console.error("Erro ao buscar a letra:", error);
            displayError("Ocorreu um erro ao buscar a letra da música.");
        }
    }

    function displayLyrics(lyrics) {
        lyricsContainer.innerHTML = `<pre>${lyrics}</pre>`;
    }

    function displayError(message) {
        lyricsContainer.innerHTML = `<p>${message}</p>`;
    }
});
