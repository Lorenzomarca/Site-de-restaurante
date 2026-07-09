# 🍽️ Gourmet Express | Sistema de Pedidos

> Uma aplicação web moderna, rápida e totalmente responsiva para gerenciamento e realização de pedidos de restaurante em tempo real, equipada com um cardápio interativo e painel administrativo integrado.

---

## 🚀 Funcionalidades

### 💻 Área do Cliente
*   **📖 Cardápio Digital Interativo:** Navegação fluida categorizada por Entradas, Burgers, Pizzas, Massas, Carnes, Bebidas e Doces.
*   **🔍 Busca em Tempo Real:** Barra de pesquisa instantânea filtrando por nome ou descrição do prato[cite: 1, 2].
*   **❤️ Sistema de Favoritos:** Permite favoritar itens para acesso rápido posterior[cite: 1, 2].
*   **🌓 Modo Escuro/Claro:** Alternância dinâmica de tema visual para melhor conforto do usuário[cite: 1, 2].
*   **🛒 Carrinho Lateral Dinâmico:** Gerenciamento de quantidades, cálculo automatizado de subtotal, taxa de entrega fixa de R$ 7,00 e suporte a cupons de desconto (como `GOURMET10` e `MASTER20`)[cite: 1, 2].
*   **🚚 Checkout Integrado:** Formulário completo para dados de entrega e seleção de formas de pagamento (Dinheiro com opção de troco, PIX, Crédito ou Débito)[cite: 1, 2].

### ⚙️ Painel Administrativo
*   **➕ Cadastro de Itens:** Formulário completo para adicionar novos produtos com nome, categoria, preço, imagem, descrição e marcadores especiais[cite: 1, 2].
*   **✏️ Edição e Exclusão:** Gerenciamento completo de produtos existentes com atualização imediata na interface.
*   **📦 Controle de Estoque:** Ativação/desativação de disponibilidade do item e definição de destaques ("Mais Vendidos")[cite: 1, 2].

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído puramente com tecnologias web nativas, garantindo leveza e performance:

*   **HTML5:** Estruturação semântica e acessível.
*   **CSS3:** Estilização moderna baseada em variáveis nativas (`:root`), layouts em *Grid/Flexbox* e responsividade mobile fluida[cite: 1, 3].
*   **JavaScript (ES6+):** Manipulação assíncrona do DOM, gerenciamento de estado global e persistência de dados[cite: 1, 2].
*   **Font Awesome (v6.4.0):** Conjunto de ícones vetoriais[cite: 1].
*   **Google Fonts:** Tipografia elegante utilizando a fonte *Poppins*[cite: 1, 3].

---

## 📦 Armazenamento de Dados

Para simular um banco de dados real sem a necessidade de um ecossistema backend complexo, a aplicação utiliza o **`localStorage` do navegador**. 
*   O cardápio inicial é populado automaticamente (*seeded*) caso o armazenamento esteja vazio[cite: 2].
*   Alterações de produtos, itens favoritos e o estado atual do carrinho persistem mesmo se a página for atualizada[cite: 2].

---
