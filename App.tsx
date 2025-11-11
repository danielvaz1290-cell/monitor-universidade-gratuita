import React, { useEffect, useState, useMemo } from 'react';
import { Analyst } from './types';
import { MetricCard } from './components/MetricCard';
import { ProgressBar } from './components/ProgressBar';
import { Leaderboard } from './components/Leaderboard';
import { AdminPanel } from './components/AdminPanel';
import { PasswordModal } from './components/PasswordModal';

const App: React.FC = () => {
  const [totalApplications, setTotalApplications] = useState(1500);
  const [analysts, setAnalysts] = useState<Analyst[]>([
    { id: '1', name: 'Ana Silva', analyzedCount: 320 },
    { id: '2', name: 'Carlos Oliveira', analyzedCount: 295 },
    { id: '3', name: 'Mariana Costa', analyzedCount: 345 },
    { id: '4', name: 'João Santos', analyzedCount: 180 },
    { id: '5', name: 'Fernanda Lima', analyzedCount: 210 },
  ]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // Automatically update the 'last synchronized' time whenever data changes
  useEffect(() => {
    setLastUpdated(new Date());
  }, [totalApplications, analysts]);

  const { analyzed, pending } = useMemo(() => {
    const analyzedCount = analysts.reduce((sum, analyst) => sum + (analyst.analyzedCount || 0), 0);
    return {
      analyzed: analyzedCount,
      pending: totalApplications - analyzedCount,
    };
  }, [analysts, totalApplications]);

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8 font-sans text-slate-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black relative">
      
      {showWelcome && (
         <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowWelcome(false)}></div>
          <div className="relative bg-slate-900 border-2 border-green-900/50 p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(34,197,94,0.02)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-600"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-600"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-600"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-600"></div>
            <div className="relative z-10 text-center">
              <div className="inline-block mb-4 px-3 py-1 bg-green-950 border border-green-800 rounded-sm">
                 <h2 className="text-green-500 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">
                    Nova Transmissão
                </h2>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white uppercase mb-4 tracking-tight leading-none">
                Bem-vindo, <br/><span className="text-green-500">Operador.</span>
              </h1>
              <div className="w-16 h-1 bg-green-600 mx-auto mb-6"></div>
              <p className="text-slate-300 mb-8 font-mono text-sm leading-relaxed">
                Você está no Painel de Operações da Universidade Gratuita. Acompanhe os dados da operação e de sua missão em tempo real.
              </p>
              
              <button
                  onClick={() => setShowWelcome(false)}
                  className="w-full group relative overflow-hidden bg-green-600 hover:bg-green-500 text-green-950 font-black uppercase tracking-[0.2em] py-4 px-6 transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] active:scale-[0.98] rounded-md"
              >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Ciente. Iniciar.
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 h-full w-full scale-0 rounded-sm transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
              </button>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSuccess={() => {
            setShowPasswordModal(false);
            setIsConfigOpen(true);
          }}
        />
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-slate-800 pb-6">
          <div className="flex items-center gap-6">
            <div className="relative group shrink-0">
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-slate-700 group-hover:border-green-500/50 transition-colors duration-500"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-slate-700 group-hover:border-green-500/50 transition-colors duration-500"></div>
                <div className="w-24 h-24 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden p-3 shadow-lg shadow-black/50">
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_3px] pointer-events-none z-10 opacity-30"></div>
                    <img src="https://placehold.co/400x400/0f172a/4ade80/png?text=UG&font=oswald" onError={(e) => { e.currentTarget.src = "https://placehold.co/400x400/0f172a/334155?text=OPS\nUG&font=oswald"; }} alt="Insignia da Operação Universidade Gratuita" className="w-full h-full object-contain filter grayscale contrast-125 brightness-90 drop-shadow-[0_0_2px_rgba(255,255,255,0.1)] opacity-80 group-hover:filter-none group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-700 ease-out" />
                </div>
            </div>

            <div>
              <h4 className="text-green-500 font-mono text-xs uppercase tracking-[0.3em] mb-1">Central de Comando</h4>
              <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none">
                Operação <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-slate-300">Universidade Gratuita</span>
              </h1>
              <p className="text-slate-400 mt-2 font-medium">Monitoramento tático de análise de editais</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-950/30 border border-green-900/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-green-500 text-xs font-mono uppercase tracking-wider">
                  Sistema Online
                </span>
             </div>
            <span className="text-slate-500 text-xs font-mono">
              Última Sincronização: {lastUpdated.toLocaleTimeString('pt-BR')}
            </span>
             <button
                onClick={() => {
                  if (isConfigOpen) {
                    setIsConfigOpen(false);
                  } else {
                    setShowPasswordModal(true);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 mt-2 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all text-sm font-bold uppercase tracking-wider"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{isConfigOpen ? 'Fechar Painel' : 'Configurações'}</span>
              </button>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <MetricCard title="Alvos Identificados (Total)" value={totalApplications.toLocaleString('pt-BR')} icon={ <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-5a3 3 0 00-5.368-1.313 1 1 0 00-2.684 0 1 1 0 00-2.684 0A3 3 0 007 15a3 3 0 00-5.368 1.313 3 3 0 000 2.684 1 1 0 002.684 0 1 1 0 002.684 0A3 3 0 0013 15v4H3" /> </svg> } />
          <MetricCard title="Missões Cumpridas" value={analyzed.toLocaleString('pt-BR')} colorClass="bg-blue-950/40 border-blue-900/50" textColorClass="text-blue-400" icon={ <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> } />
          <MetricCard title="Hostis Restantes (Pendentes)" value={pending.toLocaleString('pt-BR')} colorClass={pending > 500 ? "bg-red-950/40 border-red-900/50 animate-pulse" : "bg-slate-800 border-slate-700"} textColorClass={pending > 500 ? "text-red-500" : "text-slate-300"} icon={ <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> } />
        </section>

        <section className="bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQMEgMGg0MHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIHN0cm9rZS1vcGFjaXR5PSIuMiIvPjwvc3ZnPg==')]"></div>
          <div className="relative z-10">
            <div className="flex justify-between mb-4 items-end">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Status Geral da Operação</h3>
              <div className="text-right">
                <span className="text-3xl font-black text-white">
                  {totalApplications > 0 ? ((analyzed / totalApplications) * 100).toFixed(1) : 0}%
                </span>
                <span className="text-green-500 text-xs ml-2 font-bold uppercase">Concluído</span>
              </div>
            </div>
            <ProgressBar current={analyzed} total={totalApplications} />
            <div className="mt-3 flex justify-between text-xs font-mono text-slate-500">
              <span>INÍCIO DA MISSÃO</span>
              <span>OBJETIVO FINAL: 100%</span>
            </div>
          </div>
        </section>

        {isConfigOpen && (
          <AdminPanel 
            analysts={analysts}
            setAnalysts={setAnalysts}
            totalApplications={totalApplications}
            setTotalApplications={setTotalApplications}
            onClose={() => setIsConfigOpen(false)}
          />
        )}

        <section>
          <Leaderboard analysts={analysts} />
        </section>
      </div>
    </div>
  );
};

export default App;