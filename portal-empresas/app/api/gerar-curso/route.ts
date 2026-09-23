import { NextResponse } from 'next/server';
import { ENV } from '@/lib/env';

export async function POST(req: Request) {
  try {
    if (!ENV.GEMINI_API_KEY || ENV.GEMINI_API_KEY.includes('COLA_AQUI')) {
      return NextResponse.json({ error: "A chave da API do Gemini não foi configurada." }, { status: 500 });
    }

    const { tema } = await req.json();

    const prompt = `Você é um especialista na criação de trilhas de aprendizagem corporativas.
    Crie um minicurso rápido e interativo sobre o tema: "${tema}".
    
    RETORNE APENAS UM JSON VÁLIDO. NENHUM TEXTO ADICIONAL ANTES OU DEPOIS. 
    NÃO INCLUA BLOCOS DE CÓDIGO (NÃO USE \`\`\`json). APENAS O OBJETO PURO NESTA ESTRUTURA:
    {
      "titulo": "Nome criativo do curso sobre ${tema}",
      "descricao": "Resumo envolvente de 2 linhas sobre o que o aluno vai aprender.",
      "modulos": [
        {
          "texto_explicativo": "Uma explicação direta ao ponto.",
          "pergunta": "Pergunta de múltipla escolha?",
          "opcoes": ["Opção errada", "Opção correta", "Outra errada", "Mais uma errada"],
          "resposta_correta": "Opção correta"
        },
        {
          "texto_explicativo": "Continuação da matéria...",
          "pergunta": "Segunda pergunta?",
          "opcoes": ["A", "B", "C", "D"],
          "resposta_correta": "B"
        }
      ]
    }
    Gere exatamente 3 módulos no formato acima.`;

    // Apontamos DIRETAMENTE para o modelo que a Google exigiu no erro
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${ENV.GEMINI_API_KEY.trim()}`;
    
    const googleRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await googleRes.json();

    if (!googleRes.ok) {
      throw new Error(`A Google recusou o pedido: ${data.error?.message || 'Erro Desconhecido'}`);
    }

    let text = data.candidates[0].content.parts[0].text;
    
    // Limpeza rigorosa do JSON
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return NextResponse.json(JSON.parse(text));
    
  } catch (error: any) {
    console.error("ERRO NA API DO GEMINI:", error);
    return NextResponse.json(
      { error: error.message || "Erro desconhecido ao processar a IA." }, 
      { status: 500 }
    );
  }
}