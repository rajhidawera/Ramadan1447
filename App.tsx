
import React, { useState, useEffect, useCallback } from 'react';
import { BreathingCircle } from './components/BreathingCircle';
import { getZenReflection } from './services/gemini';
import { ZenMode, Koan } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<ZenMode>(ZenMode.IDLE);
  const [koan, setKoan] = useState<Koan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  const fetchWisdom = useCallback(async () => {
    setIsLoading(true);
    setMode(ZenMode.REFLECTING);
    const result = await getZenReflection(lang);
    setKoan(result);
    setIsLoading(false);
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden text-neutral-200 p-6">
      
      {/* Background Ambience */}
      <div className="blur-circle w-[400px] h-[400px] bg-indigo-900/20 top-[-10%] left-[-10%]"></div>
      <div className="blur-circle w-[300px] h-[300px] bg-blue-900/10 bottom-[10%] right-[-5%]"></div>
      
      {/* Navigation / Language Toggle */}
      <div className="absolute top-8 right-8 flex gap-4">
        <button 
          onClick={toggleLang}
          className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors"
        >
          {lang === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      <main className="z-10 w-full max-w-2xl flex flex-col items-center text-center">
        {mode === ZenMode.IDLE && (
          <div className="space-y-8 animate-in fade-in duration-1000">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-tighter">
              {lang === 'ar' ? 'لا تفعل أي شيء' : 'Do Nothing'}
            </h1>
            <p className="text-white/40 font-light max-w-sm mx-auto leading-relaxed">
              {lang === 'ar' 
                ? 'مرحباً بك في الفراغ. خذ نفساً عميقاً واستمتع بجمال السكون.' 
                : 'Welcome to the void. Take a deep breath and enjoy the beauty of stillness.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <button 
                onClick={() => setMode(ZenMode.BREATHING)}
                className="px-8 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-500 font-light text-sm uppercase tracking-widest"
              >
                {lang === 'ar' ? 'تنفس' : 'Breathe'}
              </button>
              <button 
                onClick={fetchWisdom}
                className="px-8 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-500 font-light text-sm uppercase tracking-widest"
              >
                {lang === 'ar' ? 'تأمل' : 'Reflect'}
              </button>
            </div>
          </div>
        )}

        {mode === ZenMode.BREATHING && (
          <div className="animate-in zoom-in-95 duration-1000">
            <BreathingCircle />
            <button 
              onClick={() => setMode(ZenMode.IDLE)}
              className="mt-16 text-xs text-white/30 hover:text-white uppercase tracking-widest transition-colors"
            >
              {lang === 'ar' ? 'عودة' : 'Return'}
            </button>
          </div>
        )}

        {mode === ZenMode.REFLECTING && (
          <div className="max-w-xl space-y-8 animate-in slide-in-from-bottom-4 duration-1000">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-2 border-white/5 border-t-white/40 rounded-full animate-spin"></div>
                <span className="text-xs text-white/20 uppercase tracking-widest">
                  {lang === 'ar' ? 'يستحضر الحكمة...' : 'Gathering wisdom...'}
                </span>
              </div>
            ) : (
              <>
                <blockquote className={`text-2xl md:text-3xl font-light italic leading-snug ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
                  "{koan?.text}"
                </blockquote>
                <p className="text-xs text-white/40 uppercase tracking-widest">— {koan?.source}</p>
                <div className="pt-12 flex gap-4 justify-center">
                  <button 
                    onClick={fetchWisdom}
                    className="text-xs text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    {lang === 'ar' ? 'حكمة أخرى' : 'Another Thought'}
                  </button>
                  <span className="text-white/10">|</span>
                  <button 
                    onClick={() => setMode(ZenMode.IDLE)}
                    className="text-xs text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    {lang === 'ar' ? 'عودة' : 'Home'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="absolute bottom-8 text-[10px] text-white/20 tracking-[0.2em] uppercase">
        {lang === 'ar' ? 'السكون • تجربة العدم' : 'As-Sukun • The Experience of Nothing'}
      </footer>
    </div>
  );
};

export default App;
