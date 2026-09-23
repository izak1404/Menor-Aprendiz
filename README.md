# 🚀 Plataforma de Recrutamento & Trilhas de Aprendizagem com IA

Uma plataforma inovadora que liga empresas a talentos através de trilhas de aprendizagem geradas por Inteligência Artificial. Se o candidato concluir o curso e passar no quiz, a vaga é desbloqueada!

## 🛠️ Tecnologias Utilizadas
* **Portal Corporativo:** Next.js, React, Tailwind CSS
* **Aplicativo Mobile (Alunos):** React Native, Expo
* **Base de Dados & Autenticação:** Supabase (PostgreSQL)
* **Inteligência Artificial:** Google Gemini API (gemini-3.6-flash)

---

## 📋 Pré-requisitos

Antes de começares, certifica-te de que tens instalado na tua máquina:
* [Node.js](https://nodejs.org/)
* [Git](https://git-scm.com/)
* App **Expo Go** instalada no teu telemóvel (iOS ou Android)
* Uma conta no [Supabase](https://supabase.com/) e no [Google AI Studio](https://aistudio.google.com/) para as chaves de API.

---

## ⚙️ Configuração do Banco de Dados (Supabase)
No painel do teu Supabase, acede ao **SQL Editor** e cria as tabelas base para o sistema funcionar:

```sql
-- Tabela de Cursos (IA)
CREATE TABLE cursos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa text,
  titulo text NOT NULL,
  descricao text,
  xp integer,
  conteudo jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Tabela de Vagas
CREATE TABLE vagas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa text NOT NULL,
  titulo text NOT NULL,
  descricao text NOT NULL,
  curso_obrigatorio_id uuid REFERENCES cursos(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Tabela de Candidaturas
CREATE TABLE candidaturas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vaga_id uuid REFERENCES vagas(id) ON DELETE CASCADE,
  aluno_nome text NOT NULL,
  aluno_email text NOT NULL,
  status text DEFAULT 'Pendente',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);