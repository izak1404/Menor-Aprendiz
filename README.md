# 🚀 Plataforma Jovem Aprendiz - Ecossistema Integrado

Um ecossistema completo de recrutamento e capacitação profissional que conecta **Empresas** e **Estudantes/Aprendizes** através de duas plataformas (Web e Mobile), impulsionado por Inteligência Artificial.

## 📖 Sobre o Projeto

O objetivo deste projeto é revolucionar a forma como as empresas treinam e recrutam jovens talentos. A plataforma permite que recrutadores criem trilhas de estudo automatizadas com o uso de IA. Os alunos consomem esse conteúdo via aplicativo móvel, ganham experiência (XP) e desbloqueiam vagas de emprego ou desafios corporativos.

O ecossistema é dividido em duas partes principais:
1. **Portal das Empresas (Web):** Onde recrutadores gerem vagas, candidaturas e criam cursos e PDFs didáticos gerados automaticamente por IA.
2. **Aplicativo do Aluno (Mobile):** Onde os estudantes acedem aos materiais de estudo, conversam com a IA Tutora para tirar dúvidas e falam diretamente com os recrutadores.

---

## ✨ Principais Funcionalidades

### 🏢 Para Empresas (Painel Web)
* **Geração de Cursos via IA:** Criação automatizada de guias de estudo estruturados e PDFs usando a API do Gemini.
* **Gestão de Vagas:** Publicação de desafios e vagas, com requisitos de conclusão de cursos específicos.
* **Métricas em Tempo Real:** Dashboard para acompanhamento de candidatos ativos, taxas de conclusão e cursos publicados.

### 📱 Para Alunos (Aplicativo Mobile)
* **Gamificação e Trilhas:** O aluno consome o material (PDFs) e ganha recompensas (XP).
* **Tutor de IA Integrado:** Um assistente inteligente flutuante que tira dúvidas específicas sobre o material de estudo.
* **Chat Humano Direto:** Uma área exclusiva para os estudantes conversarem com os recrutadores das empresas.
* **Desbloqueio de Vagas:** Vagas e oportunidades exclusivas libertadas apenas após a conclusão das trilhas obrigatórias.

---

## 🛠️ Tecnologias Utilizadas

**Frontend Web (Portal das Empresas)**
* [Next.js](https://nextjs.org/) (React)
* [Tailwind CSS](https://tailwindcss.com/) (Estilização)
* [Lucide Icons](https://lucide.dev/) (Ícones)

**Frontend Mobile (Aplicativo dos Alunos)**
* [Expo](https://expo.dev/) & [React Native](https://reactnative.dev/)
* Navegação via `expo-router`

**Backend & Base de Dados**
* [Supabase](https://supabase.com/) (PostgreSQL)
* Armazenamento de Arquivos (Supabase Storage para PDFs)
* Autenticação e RLS (Row Level Security)

**Inteligência Artificial**
* Integração com IA Generativa (ex: Google Gemini) para criação de material didático e tutoria.

---

## 🗄️ Estrutura de Base de Dados (Relacional)

O projeto assenta em tabelas interligadas no Supabase:
* `cursos`: Armazena os tópicos, PDFs gerados e XP de recompensa.
* `vagas`: Vagas e desafios associados aos cursos (Chave Estrangeira para bloqueio/desbloqueio).
* `candidaturas`: Registo do progresso dos alunos e status das vagas.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) instalado.
* Conta no [Supabase](https://supabase.com/) configurada com o SQL inicial do projeto.

### 1. Clonar o Repositório
```bash
git clone [https://github.com/izak1404/Menor-Aprendiz.git](https://github.com/izak1404/Menor-Aprendiz.git)
cd Menor-Aprendiz