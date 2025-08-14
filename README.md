# Como Contribuir
## Configurando o Ambiente de Desenvolvimento
### 1. Instale o nodejs
1. Baixe o Node.js em [nodejs.org](https://nodejs.org)
2. Execute o instalador e siga os passos padrão

### 2. Clone o repositório
Navegue a um diretório vazio e execute o seguinte comando:
```console
git clone https://github.com/CodeBridge-Hub/CBHub-projeto-igreja.git .
```

### 3. Instale o gerenciador de pacotes uv
#### winget
Execute o seguinte comando para instalar o uv usando winget:
```console
winget install --id=astral-sh.uv  -e
```

#### pip
Execute o seguinte comando para instalar o uv usando pip:
```console
pip install uv
```

#### Outros métodos
Escolha alguma das várias opções de instalação disponíveis no [site da ferramenta](https://docs.astral.sh/uv/getting-started/installation/#installation-methods).

### 4. Instale as dependências do projeto
Abra um terminal no diretório raiz do projeto e execute os seguintes comandos:
```console
uv sync
```
```console
npm install
```

### 5. Instale as extensões do VSCode usadas no desenvolvimento
- [**Black Formater**](https://marketplace.visualstudio.com/items/?itemName=ms-python.black-formatter) - Formatador automático que mantém o código Python organizado.
- [**Better Jinja**](https://marketplace.visualstudio.com/items?itemName=samuelcolvin.jinjahtml) - Extensão que adiciona suporte a templates Jinja com code highlights, code snippets e formatação automática.
- [**Tailwind CSS IntelliSense**](https://marketplace.visualstudio.com/items/?itemName=bradlc.vscode-tailwindcss) - Extensão que adiciona suporte ao framework Tailwind CSS no intelisense do VSCode.


## Testando o Projeto
Abra um novo terminal e execute o seguinte comando para iniciar o servidor em modo debug junto ao compilador do Tailwind CSS:
```console
uv run manage.py runserver --dev
```
