import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Settings, 
  HelpCircle, 
  Key, 
  CheckCircle2, 
  XCircle,
  Mail,
  ExternalLink,
  Search,
  Rocket,
  Monitor,
  BarChart3,
  Palette,
  Video,
  FileText,
  MessageSquare,
  GraduationCap,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---
interface DashboardItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tag?: string;
  icon: React.ReactNode;
  status?: 'certified' | 'free';
  url?: string;
}

// --- Constants ---
const CATEGORIES = [
  { id: 'all', label: '전체', icon: <LayoutDashboard size={18} /> },
  { id: 'sales', label: '영업', icon: <Users size={18} /> },
  { id: 'marketing', label: '마케팅', icon: <TrendingUp size={18} /> },
  { id: 'management', label: '경영', icon: <BarChart3 size={18} /> },
  { id: 'planning', label: '기획', icon: <FileText size={18} /> },
  { id: 'hr', label: '인사', icon: <Users size={18} /> },
];

const ITEMS: DashboardItem[] = [
  {
    id: 'lite',
    title: '맞춤 코치 조회',
    description: '코칭패스 대시보드가 제공하는 맞춤형 코칭 서비스를 통해 당신의 비즈니스를 한 단계 더 성장시키세요.',
    category: 'hr',
    icon: <Key className="text-brand-gold" />,
    url: 'https://ai-149827241755.us-west1.run.app'
  },
  {
    id: 'analysis',
    title: '기업&직무분석 솔루션 제작',
    description: '기업과 직무에 대한 심층적인 분석을 통해 최적화된 솔루션을 제공합니다.',
    category: 'planning',
    icon: <BarChart3 className="text-brand-gold" />,
    url: 'https://service-613920434313.us-west1.run.app'
  },
  {
    id: 'custom',
    title: '기업 맞춤 솔루션',
    description: '기업의 특성과 니즈에 맞춘 최적화된 맞춤형 AI 솔루션을 제공합니다.',
    category: 'management',
    icon: <Monitor className="text-brand-gold" />,
    url: 'https://service-856804452068.us-west1.run.app'
  },
  {
    id: 'editing',
    title: '코칭패스 서류 첨삭',
    description: '전문적인 AI 기술을 활용하여 자기소개서 및 이력서 등 각종 서류를 완벽하게 첨삭해 드립니다.',
    category: 'hr',
    icon: <FileText className="text-brand-gold" />,
    url: 'https://ai-645334686104.us-west1.run.app'
  }
];

export default function App() {
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('GEMINI_API_KEY') || '');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [progress, setProgress] = useState(0);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [showUsage, setShowUsage] = useState(false);

  // Simulate progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleSaveKey = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const key = formData.get('apiKey') as string;
    setApiKey(key);
    localStorage.setItem('GEMINI_API_KEY', key);
    setIsKeyModalOpen(false);
  };

  const filteredItems = ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col font-sans selection:bg-purple-500/30">
      
      {/* --- Header --- */}
      <header className="sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-brand-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black border border-brand-gold/30 rounded-xl flex items-center justify-center shadow-lg shadow-brand-gold/10">
            <Key className="text-brand-gold" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">코칭패스 대시보드</h1>
            <p className="text-[10px] text-brand-gold/60 uppercase tracking-widest font-semibold">Coachingpass Dashboard</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-brand-gold transition-colors">홈</a>
          <a href="#" className="hover:text-brand-gold transition-colors">FQA</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-brand-gold/10 border border-brand-gold/20 rounded-full">
            <Users size={14} className="text-brand-gold" />
            <span className="text-xs font-bold text-brand-gold">개발자 : 정혁신</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-copy">
        
        {/* --- Hero Section --- */}
        <section className="relative w-full aspect-[16/9] max-h-[500px] overflow-hidden">
          <img 
            src="https://picsum.photos/seed/goldkey/1920/1080?grayscale&blur=2" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md border border-brand-gold/20 rounded-full mb-6"
            >
              <Key size={14} className="text-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Coachingpass Dashboard</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black mb-4 tracking-tighter"
            >
              합격의 열쇠<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold">코칭패스 대시보드</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 max-w-2xl text-lg font-medium"
            >
              코칭패스 대시보드를 활용해서 생산성과 효율성의 한계를 뛰어넘으세요.<br />
              여러분의 수익화 파이프라인의 핵심이 될 것입니다.
            </motion.p>
          </div>

          {/* Usage Instructions (Top Left) */}
          <div className="absolute top-8 left-8 z-20">
            <button 
              onClick={() => setShowUsage(!showUsage)}
              className="group flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-brand-gold/20 rounded-xl transition-all"
            >
              <HelpCircle size={18} className="text-brand-gold" />
              <span className="text-sm font-bold">사용방법</span>
              <Info size={14} className="text-gray-500 group-hover:text-white transition-colors" />
            </button>
            <AnimatePresence>
              {showUsage && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute top-12 left-0 w-64 p-4 bg-brand-card/95 backdrop-blur-2xl border border-brand-border rounded-2xl shadow-2xl mt-2"
                >
                  <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    대시보드 가이드
                  </h4>
                  <ul className="space-y-3 text-xs text-gray-400">
                    <li className="flex gap-2">
                      <span className="text-brand-gold font-bold">01.</span>
                      <span>카테고리 필터를 사용하여 원하는 AI 도구를 찾으세요.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-gold font-bold">02.</span>
                      <span>각 카드의 '바로가기'를 통해 해당 기능을 실행할 수 있습니다.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-gold font-bold">03.</span>
                      <span>결과물은 보안을 위해 복사가 제한되어 있습니다.</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-gray-500 italic">
                    마지막 업데이트: {new Date().toLocaleDateString()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
            <motion.div 
              className="h-full bg-gradient-to-r from-brand-gold via-white to-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* --- Content Area --- */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Search & Filters */}
          <div className="bg-brand-card border border-brand-border rounded-3xl p-6 mb-12 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                      activeCategory === cat.id 
                        ? "bg-brand-gold text-black shadow-lg shadow-brand-gold/20" 
                        : "bg-brand-dark text-gray-400 border border-brand-border hover:border-gray-700"
                    )}
                  >
                    {cat.icon}
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-brand-card border border-brand-border rounded-3xl overflow-hidden hover:border-brand-gold/30 transition-all hover:shadow-2xl hover:shadow-brand-gold/10"
                >
                  <div className="aspect-video relative overflow-hidden bg-brand-dark/50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="transform group-hover:scale-110 transition-transform duration-500">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 48, strokeWidth: 1.5 })}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed no-copy">
                      {item.description}
                    </p>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-brand-dark border border-brand-border rounded-2xl text-sm font-bold hover:bg-white/5 transition-all group-hover:border-brand-gold/50"
                    >
                      <ExternalLink size={16} />
                      바로가기
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="p-8 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
          <span>© 2026 코칭패스 대시보드. All rights reserved.</span>
          <span className="w-1 h-1 bg-gray-700 rounded-full" />
          <span>개발자: 정혁신</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-gray-500 hover:text-brand-gold transition-colors">이용약관</a>
          <a href="#" className="text-xs text-gray-500 hover:text-brand-gold transition-colors">개인정보처리방침</a>
        </div>
      </footer>

      {/* --- Floating Action Buttons --- */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
        <button 
          onClick={() => setShowMaintenance(true)}
          className="group flex items-center gap-3 px-5 py-3 bg-brand-card hover:bg-brand-card/80 backdrop-blur-xl border border-brand-gold/20 rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95"
        >
          <div className="w-8 h-8 bg-brand-gold/10 rounded-lg flex items-center justify-center">
            <Settings className="text-brand-gold group-hover:rotate-90 transition-transform duration-500" size={18} />
          </div>
          <span className="text-sm font-bold">오류/유지보수 문의</span>
        </button>
      </div>

      {/* --- Modals --- */}
      <AnimatePresence>
        {isKeyModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-brand-card border border-brand-border rounded-[32px] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <Key className="text-purple-500" size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Google API 인증</h3>
                </div>
                <button onClick={() => setIsKeyModalOpen(false)} className="text-gray-500 hover:text-white">
                  <XCircle size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSaveKey} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Google API Key</label>
                  <input 
                    name="apiKey"
                    type="password" 
                    defaultValue={apiKey}
                    placeholder="AI Studio에서 발급받은 키를 입력하세요"
                    className="w-full bg-brand-dark border border-brand-border rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                  <p className="text-xs text-blue-400/80 leading-relaxed">
                    * 입력하신 API Key는 브라우저 로컬 스토리지에 안전하게 저장되며, 외부로 유출되지 않습니다.
                  </p>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/20 transition-all active:scale-[0.98]"
                >
                  인증 정보 저장하기
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {showMaintenance && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-brand-card border border-brand-border rounded-[32px] p-8 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="text-red-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">오류/유지보수 문의</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                업데이트나 유지보수가 필요할 경우 아래 이메일로 어떤 부분이 필요한지 상세하게 작성 후 보내주세요.
              </p>
              <div className="bg-brand-dark border border-brand-border rounded-2xl p-4 mb-8">
                <span className="text-lg font-mono font-bold text-brand-gold">info@nextin.ai.kr</span>
              </div>
              <button 
                onClick={() => setShowMaintenance(false)}
                className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all"
              >
                닫기
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
