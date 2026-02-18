
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#003366] text-white p-6 overflow-hidden text-center" dir="rtl">
      {/* Background Gradient & Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003366] to-[#001a33] z-0"></div>
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBkPSJNIDAgMzIgTCAzMiAwIEwgMzIgMzIgWiIgZmlsbD0iI2M1YTA1OSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+)'}}></div>
      
      <main className="z-10 w-full max-w-2xl flex flex-col items-center animate-in">
        <div className="bg-white p-4 rounded-2xl shadow-2xl mb-8 transform hover:scale-105 transition-transform duration-300">
          <img src="https://next.rajhifoundation.org/files/52c533df-1.png" alt="شعار مؤسسة عبدالله الراجحي الخيرية" className="h-20" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-shadow-lg">
          قريباً...
        </h1>
        <p className="text-white/60 font-light max-w-md mx-auto leading-relaxed mt-4">
          نعمل حالياً على تجهيز البوابة الإلكترونية لمشروع رمضان 1447هـ. ترقبوا الإطلاق الرسمي.
        </p>
      </main>

      <footer className="absolute bottom-8 text-[10px] text-white/30 tracking-[0.2em] uppercase">
        مؤسسة عبدالله بن عبدالعزيز الراجحي الخيرية
      </footer>
    </div>
  );
};

export default App;
