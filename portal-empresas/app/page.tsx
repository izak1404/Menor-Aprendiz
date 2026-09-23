'use client';

import { useState, useEffect } from 'react';
import { Users, FileText, PlusCircle, Sparkles, X, Send, Eye, MessageSquare, TrendingUp, Award } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DashboardEmpresa() {
  const [modalAtivo, setModalAtivo] = useState<string | null>(null);
  const [tituloCurso, setTituloCurso] = useState('');
  const [empresaNome, setEmpresaNome] = useState('Tech Corp SA');
  const [carregando, setCarregando] = useState(false);
  const [statusConexao, setStatusConexao] = useState('A verificar ligação...');
  const [listaCursos, setListaCursos] = useState<any[]>([]);

  // Testar ligação e buscar cursos do Supabase ao carregar a página
  useEffect(() => {
    async function carregarDados() {
      try {
        const { data, error } = await supabase.from('cursos').select('*');
        
        if (error) throw error;
        
        console.log("Dados do Supabase:", data);
        setListaCursos(data || []);
        setStatusConexao('Pronto');
      } catch (err) {
        console.error("Erro ao ligar ao Supabase:", err);
        setStatusConexao('Erro na ligação. Verifica o ficheiro .env.local');
      }
    }

    carregarDados();
  }, []);

  // Função para salvar o curso gerado pela IA no Supabase
  const handlePublicarCurso = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tituloCurso) return;

    setCarregando(true);
    try {
      const { error } = await supabase.from('cursos').insert([
        { 
          titulo: tituloCurso, 
          empresa: empresaNome, 
          descricao: "Material gerado automaticamente com IA (Gemini).",
          recompensa_xp: 150 
        }
      ]);

      if (error) throw error;

      alert("Curso gerado e publicado com sucesso na plataforma!");
      setModalAtivo(null);
      setTituloCurso('');
      
      // Atualizar a lista de cursos na hora
      const { data } = await supabase.from('cursos').select('*');
      if (data) setListaCursos(data);
    } catch (error) {
      console.error("Erro ao publicar curso:", error);
      alert("Erro ao publicar o curso na base de dados.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho */}
        <header className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Portal Corporativo</h1>
            <p className="text-zinc-400 mt-1 text-sm">Gestão de talentos e criação de trilhas com IA.</p>
            <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 bg-zinc-900 border border-zinc-800 text-sky-400 rounded-full">
              {statusConexao}
            </span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setModalAtivo('gerarCurso')}
              className="bg-sky-500 hover:bg-sky-400 text-zinc-950 px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20"
            >
              <Sparkles size={18} /> Novo Curso com IA
            </button>
          </div>
        </header>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
            <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 text-sky-400 rounded-xl flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Candidatos Ativos</h3>
            <p className="text-4xl font-black text-white">24</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
            <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Taxa de Conclusão</h3>
            <p className="text-4xl font-black text-white">68%</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
            <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 text-amber-400 rounded-xl flex items-center justify-center mb-4">
              <Award size={24} />
            </div>
            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Cursos na Plataforma</h3>
            <p className="text-4xl font-black text-white">{listaCursos.length}</p>
          </div>
        </div>

        {/* Cursos Publicados (Dinâmicos do Supabase) */}
        <section className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 shadow-sm mb-12">
          <h2 className="text-lg font-bold text-white mb-6">Cursos Publicados via IA</h2>
          {listaCursos.length === 0 ? (
            <p className="text-zinc-500 text-sm">Ainda nenhum curso registado. Clica em "Novo Curso com IA" para criar o primeiro.</p>
          ) : (
            <div className="space-y-3">
              {listaCursos.map((curso) => (
                <div key={curso.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex justify-between items-center hover:border-sky-500/50 transition-all">
                  <div>
                    <h4 className="font-bold text-white text-sm">{curso.titulo}</h4>
                    <p className="text-xs text-sky-400 mt-0.5">{curso.empresa} • Recompensa: +{curso.recompensa_xp} XP</p>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-semibold">Ativo para Alunos</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* MODAL DE CRIAÇÃO DE CURSO COM IA */}
        {modalAtivo === 'gerarCurso' && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl p-6 relative shadow-2xl">
              <button onClick={() => setModalAtivo(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-sky-400" size={20} />
                <h3 className="text-xl font-bold text-white">Criar Curso & PDF com IA</h3>
              </div>
              <p className="text-zinc-400 text-xs mb-6">O Gemini estruturará o conteúdo didático e publicará instantaneamente para os alunos.</p>

              <form onSubmit={handlePublicarCurso} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">Título do Curso / Competência</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Fundamentos de Redes e Suporte Nível 1"
                    value={tituloCurso}
                    onChange={(e) => setTituloCurso(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:border-sky-500 outline-none"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={carregando}
                  className="w-full bg-sky-500 text-zinc-950 font-bold py-3 rounded-xl hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
                >
                  {carregando ? "A gerar com IA e a salvar..." : "Gerar e Publicar na Plataforma"}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}