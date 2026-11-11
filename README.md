# Sidequest · DesafiosEV
Aplicação web em português para sortear desafios de jogos, salvar favoritos e registrar conclusões. Interface responsiva, sem cadastro; dados persistidos no localStorage do navegador.

## Executar
Requer Node.js 20 ou superior. Sem dependências externas de execução.

```sh
npm start
# servidor na porta 3000; PORT permite alterar
npm test
```

Abra o servidor no navegador. Escolha jogo, modo e dificuldade e clique em **Sortear meu desafio**. Favoritos e conclusões podem ser desmarcados. Clique em um item do diário para reabrir suas regras.

## Catálogo
FC 26 (treinador/jogador), Elden Ring (jornada/chefes) e theHunter: Call of the Wild (expedição/observação). A referência ambígua a “the hunter 2” foi interpretada como Call of the Wild. Edite `engine.js` para ampliar o catálogo e regras compatíveis. Dados são curados, sem API oficial ou elenco completo atualizado; verifique disponibilidade na edição do usuário. Zoro é inspiração de build, sem personagem licenciado integrado.

A seleção combina possibilidades compatíveis com o modo; tenta evitar as últimas 100 combinações, com limite de 80 tentativas. Catálogos finitos podem repetir, especialmente observação de caça, e a interface informa isso. Dificuldade tranquila reduz restrições; intensa adiciona objetivos ou limitações. Não há garantia de spawn de troféus.

## Arquivos
- `engine.js`: geração independente da interface.
- `app.js`: seleção, diário e persistência local.
- `server.js`: servidor HTTP com lista explícita de arquivos públicos.
- `engine.test.js`: validação de modos, restrições e repetição.

Fontes Google são opcionais; existem fontes locais alternativas. Não há backend de contas ou sincronização; limpar dados do navegador remove o progresso.

## Publicação
O workflow `.github/workflows/pages.yml` testa e publica somente os arquivos públicos no GitHub Pages a cada push em `main`. Em Settings → Pages, selecione **GitHub Actions** como origem. Se necessário, execute **Publish Sidequest** pela aba Actions após habilitar Pages. O site usa caminhos relativos para funcionar no subdiretório do repositório.
