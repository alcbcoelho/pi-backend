## /users
Reúne registro dos usuários.

### Exemplo de usuário

```
{
    "id": 10,
    "username": "usuario_10",
    "password": "123456",
    "firstName": "Beatriz",
    "lastName": "Soares",
    "phone": "98010-2022",
    "email": "beatrizsoares@teste.com"
}
```
### GET

* **users/**

    Retorna um ARRAY de OBJETOS com atributos de cada usuário.

    * **Status:**

        * 200 - OK
        * 404 - Array vazio

* **users?username={nomeDoUsuário}**

    Retorna um OBJETO com atributos do usuário de username correspondente ao parâmetro de query inserido na URL.

    * **Status:**

        * 200 - OK
        * 404 - Usuário não encontrado

* **users/{id}**

    Retorna um OBJETO com atributos do usuário de id correspondente ao parâmetro inserido na URL.

    * **Status:**

        * 200 - OK
        * 404 - Usuário não encontrado

### POST

* **users/**

    Insere um novo usuário ao array de usuários da API.

    * **Status:**

        * 201 - Criado
        * 400 - Nome de usuário já em uso

### PUT

* **users/{id}**

    Atualiza atributos do usuário de ID correspondente ao parâmetro especificado na URL.

    * **Status:**

        * 204 - OK (sem conteúdo)
        * 400 - Nome de usuário já em uso
        * 404 - Usuário não encontrado

### DELETE

* **users/{id}**

    Remove do array de usuários da API o usuário de ID correspondente ao parâmetro especificado na URL.

    * **Status:**

        * 200 - OK
        * 404 - Usuário não encontrado

## /songs
Reúne as músicas presentes no banco de dados da aplicação.

### Exemplo de música

```
{ "id": 1, "name": "Dancing Queen", "artist": "ABBA" }
```
### GET

* **songs/**

    Retorna um ARRAY de OBJETOS com atributos de cada música.

    * **Status:**

        * 200 - OK
        * 404 - Array vazio

* **songs?name={nomeDaMúsica} | songs?artist={nomeDoArtista} | songs?name={nomeDaMúsica}&artist={nomeDoArtista}**

    Retorna um OBJETO com atributos da música com nome e/ou artista correspondentes ao(s) parâmetro(s) de query correspondente(s) inserido(s) na URL.

    * **Status:**

        * 200 - OK
        * 404 - Música/artista não encontrada

* **songs/{id}**

    Retorna um OBJETO com atributos da música de id correspondente ao parâmetro inserido na URL.

    * **Status:**

        * 200 - OK
        * 404 - Música não encontrada

### POST

* **songs/**

    Insere uma nova música ao array de músicas da API.

    * **Status:**

        * 201 - Criada

### PUT

* **songs/{id}**

    Atualiza atributos de música de ID correspondente ao parâmetro especificado na URL.

    * **Status:**

        * 204 - OK (sem conteúdo)
        * 404 - Música não encontrada

### DELETE

* **songs/{id}**

    Remove do array de músicas da API a música de ID correspondente ao parâmetro especificado na URL.

    * **Status:**

        * 200 - OK
        * 404 - Música não encontrada

## /playlists
Reúne as playlists criadas por usuários com base nas músicas disponíveis.

### Exemplo de playlist

```
{
    "id": 1,
    "name": "Rock Anos 70",
    "author": "/users/1",
    "songs": [
        "/songs/49",
        "/songs/99",
        "/songs/26",
        "/songs/39",
        "/songs/13",
        "/songs/89",
        "/songs/31",
        "/songs/2",
        "/songs/25",
        "/songs/70",
        "/songs/30",
        "/songs/50"
    ],
},
```
### GET

* **playlists/**

    Retorna um ARRAY de OBJETOS com atributos de cada playlist.

    * **Status:**

        * 200 - OK
        * 404 - Array vazio

* **playlists/{id}**

    Retorna um OBJETO com atributos da playlist de id correspondente ao parâmetro inserido na URL.

    * **Status:**

        * 201 - OK
        * 404 - Playlist não encontrada

### POST

* **playlists/**

    Insere uma nova playlist ao array de playlists da API.

    * **Status:**

        * 201 - Criada

### PUT

* **songs/{id}**

    Atualiza atributos da playlist de ID correspondente ao parâmetro especificado na URL.

    * **Status:**

        * 204 - OK (sem conteúdo)
        * 404 - Playlist não encontrada

### DELETE

* **songs/{id}**

    Remove do array de playlist da API a playlist de ID correspondente ao parâmetro especificado na URL.

    * **Status:**

        * 200 - OK
        * 404 - Playlist não encontrada
