<h1 align="center" style="font-weight: bold;">Intership Challenge 💻</h1>
<p align="center">
 <a href="#tech">Tecnologias usadas</a> • 
 <a href="#instalation-guide">Guia de instalação</a> • 
 <a href="#api-endpoints">API Endpoints</a> •
 <a href="#licenca">Licença</a> • 
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"></img>
  <img src="https://img.shields.io/badge/axios.js-854195?style=for-the-badge&logo=axios&logoColor=5A29E4"></img>
  <img src="https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge">
  <img src="https://img.shields.io/badge/ReactHookForm-000000?style=for-the-badge&logo=reacthookform&logoColor=white"></img>
  <img src="https://img.shields.io/badge/-Zod-3E67B1?style=flat&logo=zod&logoColor=white"></img>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green"></img>
  <img src="https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray"></img>
</p>
<h2 id="tech">📦 Tecnologias usadas:</h2>
<h3>Frontend:</h3>

- **Base:** HTML5, CSS3, JavaScript (ES6+)
- **Reatividade:** [React](https://react.dev/)
- **Gerenciamento de formulários:** [React Hook Form](https://react-hook-form.com/) e [Zod](https://zod.dev/)
- **CSS:** Sass
- **Requisição HTTP:** Axios

<h3>Backend:</h3>

- **Lógica do servidor:** [Django](https://www.djangoproject.com/)
- **API:** [Django REST Framework(API)](https://www.django-rest-framework.org/)

<h3>Controle de Versão:</h3>

- Git com Conventional Commits e seguindo Git-Flow




<h2 id="instalation-guide">🔥 Guia de instalação:</h2>

<h3>⚙️ Pré-requisitos:</h3>

Você precisa ter instalado na sua máquina as seguintes tecnologias:

- Node
- Python

*Obs.: Desenvolvi este projeto com Node 20.x e Python 3.12.x. Não testei o projeto em versões anteriores destas tecnologias.

<h3>🔨 Guia de instalação:</h1>


<h4>Passo 1: Clone esse repositório</h4>

```bash
git clone git@github.com:EmanuelLacerda/internship-challenge.git
```

<h4>Passo 2: Acesse a pasta do respositório</h4>

```bash
cd internship-challenge
```

<h4>Passo 3: Instale as dependências</h4>

Neste repositório, há 2 diretórios, sendo um deles a api(server/) e o outro o frontend(web/). Cada repositório possuí dependências próprias. Então, você precisa instalar as dependências individualmente. Abaixo segue como fazer para cada um dos dois.

**1° Acesse o diretório "server":**

```bash
cd server
```

**2° Execute o "pip3 install -r requirements.txt":**

```bash
pip3 install -r requirements.txt
```

**3° Volte para a raiz do projeto:**

```bash
cd ..
```

**4° Acesse o diretório "web":**

```bash
cd web
```

**5° Execute o comando "npm install":**

```bash
npm install
```

**6° Volte para a raiz do projeto:**

```bash
cd ..
```

<h4>Passo 04: Adicione as variáveis de ambiente no diretório server</h4>

Ao acessar server/.env.examples você verá o seguinte conteúdo:

```
SECRET_KEY=
DEBUG=
```

Explicação sobre as varíaveis:

- **SECRET_KEY:** Coloque nesta a SECRET_KEY que você tiver gerado para a aplicação Django.
- **DEBUG:** Coloque nesta um boolean indicando se o projeto está ou não no debug mode.

<h4>Passo 05: Execute o projeto</h4>

**1° Acesse o diretório server:**

```bash
cd server
```

**2° Execute a api:**

```bash
python3 manage.py runserver
```

**3° Acesse o diretório web:**

```bash
cd web
```

**4° Execute o frontend:**

```bash
npm run dev
```

*Obs.: Para o projeto funcionar corretamente, api e frontend devem estar em execução ao mesmo tempo.

