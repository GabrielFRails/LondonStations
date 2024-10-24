# Atividade 08 - Visualização de Informação (SPStations)

## Alunos
- Tallya Jesus - 202003616
- Luiza Costa - 201904239
- Gabriel Freitas - 202003564

## Para executar o programa faça:
 - Acesse a pasta do projeto e execute o script `bash exec.sh` (Linux) ou `make runlocal` ou `exec.bat` (Windows) - é necessário possuir o Python instalado
 - Também foi disponibilizado um Dockerfile caso prefira realizar a execução via Docker
 - Após a execução dos scripts, acesse `http://localhost:8000`

### Etapa 1 em sala

1. definição de duas ou mais perguntas que devem ser respondidas pela sua visualização;
	- Quantas linhas cada estação pertence?
	- Dada duas estações, qual o caminho mais curto entre elas?
2. escolha da técnica de visualização a ser utilizada;
	- grafo
3. análise e discussão de quais atributos serão usados com uma justificativa para a seleção e deleção de cada um;
	- Os atributos selecionados são: nome da estação, linhas e estações vizinhas. O nome da estação serve para identificar a estação, linhas para mostrar a qual linha a estação pertence e as estações vizinhas para saber o caminho a ser percorrido durante as viagens 
	- Não usamos a latitude e longitude pois elas não responderiam as perguntas escolhidas pelo grupo
4. definição do mapeamento visual, descrevendo as marcas e propriedades de marcas aplicadas, utilizando o modelo para construção de visualizações.
	- Marcas: nós e arestas
	- Propriedade: cor
	- Elas servem para que a pessoa consiga visualizar e associar as informações sobre as estações e suas linhas a partir das leis de gestalt como semelhança e proximidade.
5. discussão e definição das interações promovidas pelas visualizações, se houver.
	- Ao colocar o mouse sobre um nó ele destaca o nome da estação(caso o zoom esteja pequeno, apenas o nome da estação aparece)
	- ao selecionar duas estações o caminho mais curto entre elas é exibido de forma escrita e o caminho é destacado no grafo a partir diminuição do destaque das estações não selecionadas 
	- Existe o botão "Limpar seleção" que limpa o as estações escolhidas

obs.: a pergunta 2 da Etapa 2 foi respondida na pergunta 5 da Etapa 2
obs.: a pergunta 3 da Etapa 2 é respondida no interação
