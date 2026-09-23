'use client';

import { useState, useEffect } from 'react';
import { Users, Sparkles, X, Award, Trash2, AlertTriangle, Briefcase, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DashboardEmpresa() {
  const [modalAtivo, setModalAtivo] = useState<string | null>(null);
  
  // Estados de confirmação e alerta visual (substitutos dos popups do navegador)
  const [cursoParaExcluir, setCursoParaExcluir] = useState<string | null>(null);
  const [vagaParaExcluir, setVagaParaExcluir] = useState<string | null>(null);
  const [alerta, setAlerta] = useState<{ tipo: 'sucesso' | 'erro', texto: string } | null>(null);
  const [excluindo, setExcluindo] = useState(false);

  const [tituloCurso, setTituloCurso] = useState('');
  const [xpNovoCurso, setXpNovoCurso] = useState('150'); 
  const [listaCursos, setListaCursos] = useState<any[]>([]);

  const [tituloVaga, setTituloVaga] = useState('');
  const [descricaoVaga, setDescricaoVaga] = useState('');
  const [cursoSelecionado, setCursoSelecionado] = useState('');
  const [listaVagas, setListaVagas] = useState<any[]>([]);
  
  const [totalCandidatos, setTotalCandidatos] = useState(0);
  const [empresaNome, setEmpresaNome] = useState('Tech Corp SA');
  const [carregando, setCarregando] = useState(false);
  const [statusConexao, setStatusConexao] = useState('A carregar dados...');

  const mostrarAlerta = (tipo: 'sucesso' | 'erro', texto: string) => setAlerta({ tipo, texto });

  const carregarDados = async () => {
    try {
      const resCursos = await supabase.from('cursos').select('*');
      if (!resCursos.error) setListaCursos(resCursos.data || []);

      let resVagas = await supabase.from('vagas').select('*, cursos!curso_obrigatorio_id(titulo)');
      
      if (resVagas.error) {
        resVagas = await supabase.from('vagas').select('*');
      }
      
      setListaVagas(resVagas.data || []);

      const resCands = await supabase.from('candidaturas').select('id');
      if (!resCands.error && resCands.data) {
        setTotalCandidatos(resCands.data.length);
      }

      setStatusConexao('Pronto');
    } catch (err: any) {
      console.error("Erro inesperado:", err);
      setStatusConexao('Erro crítico na ligação.');
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const confirmarExclusaoCurso = async () => {
    if (!cursoParaExcluir) return;
    setExcluindo(true);
    try {
      await supabase.from('cursos').delete().eq('id', cursoParaExcluir);
      carregarDados(); 
      setCursoParaExcluir(null); 
      mostrarAlerta('sucesso', 'Curso eliminado com sucesso.');
    } catch (error) {
      setCursoParaExcluir(null);
      mostrarAlerta('erro', 'Não foi possível eliminar o curso.');
    } finally {
      setExcluindo(false);
    }
  };

  const confirmarExclusaoVaga = async () => {
    if (!vagaParaExcluir) return;
    setExcluindo(true);
    try {
      await supabase.from('vagas').delete().eq('id', vagaParaExcluir);
      carregarDados();
      setVagaParaExcluir(null);
      mostrarAlerta('sucesso', 'Vaga eliminada permanentemente.');
    } catch (error) {
      setVagaParaExcluir(null);
      mostrarAlerta('erro', 'Erro ao eliminar esta vaga.');
    } finally {
      setExcluindo(false);
    }
  };

  const handlePublicarCurso = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tituloCurso) return;

    setCarregando(true);
    try {
      const res = await fetch('/api/gerar-curso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema: tituloCurso })
      });
      
      if (res.status === 404) throw new Error("A rota da API não foi encontrada!");
      if (res.status === 500) throw new Error("Erro no servidor da IA.");

      let cursoIA;
      try {
        cursoIA = await res.json();
      } catch (e) {
        throw new Error("O Gemini devolveu uma resposta inválida (não é JSON).");
      }

      if (cursoIA.error) throw new Error("Erro devolvido pela IA: " + cursoIA.error);

      const { error } = await supabase.from('cursos').insert([{ 
        titulo: cursoIA.titulo || tituloCurso, 
        empresa: empresaNome, 
        descricao: cursoIA.descricao || "Material gerado automaticamente com IA.",
        xp: parseInt(xpNovoCurso), 
        conteudo: cursoIA.modulos  
      }]);

      if (error) throw new Error("O Supabase recusou os dados: " + error.message);

      setModalAtivo(null);
      setTituloCurso('');
      carregarDados(); 
      mostrarAlerta('sucesso', 'Curso interativo publicado com sucesso!');
      
    } catch (error: any) {
      mostrarAlerta('erro', error.message);
    } finally {
      setCarregando(false);
    }
  };

  const handlePublicarVaga = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tituloVaga || !descricaoVaga) return;

    setCarregando(true);
    try {
      const { error } = await supabase.from('vagas').insert([{
        titulo: tituloVaga,
        descricao: descricaoVaga,
        empresa: empresaNome,
        curso_obrigatorio_id: cursoSelecionado !== '' ? cursoSelecionado : null
      }]);

      if (error) throw error;

      setModalAtivo(null);
      setTituloVaga('');
      setDescricaoVaga('');
      setCursoSelecionado('');
      carregarDados();
      mostrarAlerta('sucesso', 'Vaga publicada com sucesso!');
    } catch (error: any) {
      mostrarAlerta('erro', 'Erro ao criar vaga: ' + error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 p-8 font-sans relative">
      <div className="max-w-6xl mx-auto">
        
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
              onClick={() => setModalAtivo('criarVaga')}
              className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Briefcase size={18} /> Nova Vaga
            </button>
            <button 
              onClick={() => setModalAtivo('gerarCurso')}
              className="bg-sky-500 hover:bg-sky-400 text-zinc-950 px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20"
            >
              <Sparkles size={18} /> Novo Curso com IA
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
            <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <Briefcase size={24} />
            </div>
            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Vagas Abertas</h3>
            <p className="text-4xl font-black text-white">{listaVagas.length}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
            <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 text-sky-400 rounded-xl flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Candidatos Ativos</h3>
            <p className="text-4xl font-black text-white">{totalCandidatos}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
            <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 text-amber-400 rounded-xl flex items-center justify-center mb-4">
              <Award size={24} />
            </div>
            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Cursos Criados</h3>
            <p className="text-4xl font-black text-white">{listaCursos.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <section className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Briefcase size={20} className="text-emerald-500"/> Oportunidades & Vagas
            </h2>
            {listaVagas.length === 0 ? (
              <p className="text-zinc-500 text-sm">Nenhuma vaga publicada.</p>
            ) : (
              <div className="space-y-3">
                {listaVagas.map((vaga) => (
                  <div key={vaga.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-emerald-500/50 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white text-sm">{vaga.titulo}</h4>
                      <button onClick={() => setVagaParaExcluir(vaga.id)} className="text-zinc-600 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-2 mb-3">{vaga.descricao}</p>
                    
                    {vaga.cursos ? (
                      <span className="inline-flex text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-1 rounded">
                        🔒 Requer: {vaga.cursos.titulo}
                      </span>
                    ) : vaga.curso_obrigatorio_id ? (
                      <span className="inline-flex text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-1 rounded">
                        🔒 Requer Curso Específico
                      </span>
                    ) : (
                      <span className="inline-flex text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded">
                        🔓 Vaga de Acesso Livre
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Award size={20} className="text-sky-500"/> Trilhas de Estudo (IA)
            </h2>
            {listaCursos.length === 0 ? (
              <p className="text-zinc-500 text-sm">Nenhum curso registado.</p>
            ) : (
              <div className="space-y-3">
                {listaCursos.map((curso) => (
                  <div key={curso.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex justify-between items-center hover:border-sky-500/50 transition-all">
                    <div>
                      <h4 className="font-bold text-white text-sm">{curso.titulo}</h4>
                      <p className="text-xs text-sky-400 mt-0.5">+{curso.xp || curso.recompensa_xp || 0} XP</p>
                    </div>
                    <button onClick={() => setCursoParaExcluir(curso.id)} className="text-zinc-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* MODAIS DE CRIAÇÃO (VAGA E CURSO) */}
        {modalAtivo === 'criarVaga' && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-40">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl p-6 relative shadow-2xl">
              <button onClick={() => setModalAtivo(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><X size={20} /></button>
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="text-emerald-400" size={20} />
                <h3 className="text-xl font-bold text-white">Publicar Nova Vaga</h3>
              </div>
              <form onSubmit={handlePublicarVaga} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">Título da Vaga</label>
                  <input type="text" value={tituloVaga} onChange={(e) => setTituloVaga(e.target.value)} placeholder="Ex: Jovem Aprendiz - Suporte TI" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:border-emerald-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">Descrição / Requisitos</label>
                  <textarea value={descricaoVaga} onChange={(e) => setDescricaoVaga(e.target.value)} placeholder="Descreve as tarefas da vaga..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:border-emerald-500 outline-none h-24 resize-none" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">Trilha de Estudo Obrigatória (Opcional)</label>
                  <select value={cursoSelecionado} onChange={(e) => setCursoSelecionado(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:border-emerald-500 outline-none appearance-none">
                    <option value="">Nenhuma (Acesso Livre)</option>
                    {listaCursos.map((curso) => (
                      <option key={curso.id} value={curso.id}>{curso.titulo}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" disabled={carregando} className="w-full font-bold py-3 rounded-xl transition-all shadow-lg bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-emerald-500/20 mt-4">
                  {carregando ? "A salvar..." : "Publicar Vaga"}
                </button>
              </form>
            </div>
          </div>
        )}

        {modalAtivo === 'gerarCurso' && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-40">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl p-6 relative shadow-2xl">
              <button onClick={() => setModalAtivo(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><X size={20} /></button>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-sky-400" size={20} />
                <h3 className="text-xl font-bold text-white">Criar Curso Interativo</h3>
              </div>
              <p className="text-zinc-400 text-xs mb-6">A IA estruturará o tema em formato de quiz interativo.</p>
              <form onSubmit={handlePublicarCurso} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">Tema do Curso</label>
                  <input type="text" value={tituloCurso} onChange={(e) => setTituloCurso(e.target.value)} placeholder="Ex: Atendimento ao Cliente" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:border-sky-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">Recompensa (XP)</label>
                  <input type="number" value={xpNovoCurso} onChange={(e) => setXpNovoCurso(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:border-sky-500 outline-none" required />
                </div>
                <button type="submit" disabled={carregando} className="w-full font-bold py-3 rounded-xl transition-all shadow-lg bg-sky-500 text-zinc-950 hover:bg-sky-400 shadow-sky-500/20">
                  {carregando ? "A gerar com IA..." : "Gerar com Gemini"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL DE CONFIRMAÇÃO PARA EXCLUIR VAGA E CURSO */}
        {(cursoParaExcluir || vagaParaExcluir) && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-8 relative shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-500/10 text-red-500 flex items-center justify-center rounded-full mb-6 border border-red-500/20"><AlertTriangle size={32} /></div>
                <h3 className="text-xl font-bold text-white mb-3">Apagar permanentemente?</h3>
                <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                  Tens a certeza? Esta ação é irreversível e os dados associados serão perdidos.
                </p>
                <div className="flex gap-4 w-full">
                  <button onClick={() => { setCursoParaExcluir(null); setVagaParaExcluir(null); }} disabled={excluindo} className="flex-1 bg-zinc-950 border border-zinc-800 hover:bg-zinc-800 text-white font-semibold py-3 rounded-xl transition-colors">Cancelar</button>
                  <button onClick={cursoParaExcluir ? confirmarExclusaoCurso : confirmarExclusaoVaga} disabled={excluindo} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors">{excluindo ? "A excluir..." : "Sim, Apagar"}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL DE SUCESSO OU ERRO (O NOVO "ALERT") */}
        {alerta && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-3xl p-8 relative shadow-2xl flex flex-col items-center text-center">
              {alerta.tipo === 'sucesso' ? (
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 flex items-center justify-center rounded-full mb-6 border border-emerald-500/20"><CheckCircle size={32} /></div>
              ) : (
                <div className="w-16 h-16 bg-red-500/10 text-red-500 flex items-center justify-center rounded-full mb-6 border border-red-500/20"><AlertTriangle size={32} /></div>
              )}
              <h3 className="text-xl font-bold text-white mb-3">{alerta.tipo === 'sucesso' ? 'Sucesso!' : 'Atenção!'}</h3>
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed">{alerta.texto}</p>
              <button onClick={() => setAlerta(null)} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-xl transition-colors">Entendido</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}