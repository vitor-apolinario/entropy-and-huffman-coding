# Entropia e codificação de Huffman

Funcionalidades da ferramenta desenvolvida:

* Ler determinado arquivo e calcular sua entropia (Shanon);
* Compactar arquivos através da codificação de Huffman.

<br>

# Experimento

O experimento consiste em ler arquivos em diferentes formatos (html, zip, pem, txt) e calcular sua respectiva entropia. Depois, codificar cada arquivo utilizando o algoritmo de Huffman, calcular a entropia do arquivo compactado e comparar com a entropia original do arquivo.

<br>

# Resultados

Os resultados são reportados na tabela abaixo. Os arquivos em linguagem natural (formatos html e txt) apresentaram os maiores aumentos na entropia quando compactados (0.2154 e 0.3124, respectivamente), assim como níveis de compressão mais elevados (por volta de 40%). Quando comprimido, o arquivo cifrado (pem) reduziu cerca de 25% de tamanho mas teve o menor aumento de entropia em relação ao arquivo original (cerca de 0.01). Por fim, o arquivo compactado (zip), quando comprimido novamente, diminuiu cerca de 3% de tamanho mas aumentou e entropia cerca de 0.14 em relação a entropia do arquivo original.

<br>

| File | Size (Bytes) | Entropy | Encoded size (Bytes) | Encoded entropy | Encoded entropy diff | Encoded size diff (%) |
|:----:|:------------:|:-------:|:--------------------:|:---------------:|:--------------------:|:---------------------:|
| html |     4033     |  0.7444 |         2416         |      0.9661     |       + 0.2154       |        - 40.09        |
|  zip |     7210     |  0.9641 |         6983         |      0.9901     |       + 0.1469       |         - 3.14        |
|  pem |     1870     |  0.9708 |         1388         |      0.9828     |       + 0.0119       |        - 25.77        |
|  txt |    667353    |  0.6719 |        370131        |      0.9819     |       + 0.3124       |        - 44.53        |

<br>

# Como rodar

Certifique-se que está com o Node.js configurado (mais detalhes em nodejs.org)

Clone e acesse a pasta do projeto

instale as dependências

```
npm install
```

rode o comando

```
npm run start
```