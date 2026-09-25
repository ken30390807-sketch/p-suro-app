```tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-zinc-100 to-slate-200 text-slate-900 font-sans antialiased">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ヘッダー */}
        <header className="text-center pt-4 pb-8">
          <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full mb-3 tracking-wide uppercase">
            Slot Analytics
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            設定推測カウンター
          </h1>

          <p className="mt-2 text-sm lg:text-base text-slate-500">
            パチスロの設定推測をサポート
          </p>
        </header>

        {/* 機種メニュー */}
        <div className="space-y-4">

          {/* リコリス・リコイル */}
          <Link
            href="/lycoris"
            className="group block bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98]"
          >
            <div className="p-5 sm:p-6 lg:p-7">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl lg:text-2xl font-extrabold shadow-sm shrink-0">
                    R
                  </div>

                  <div>
                    <p className="text-xs lg:text-sm font-bold text-rose-600 tracking-wide uppercase mb-1">
                      Lycoris Recoil
                    </p>

                    <h2 className="text-lg lg:text-xl font-extrabold text-slate-900">
                      リコリス・リコイル
                    </h2>
                  </div>
                </div>

                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-lg lg:text-xl font-bold transition-all duration-200 group-hover:bg-rose-600 group-hover:text-white group-hover:translate-x-1 shrink-0">
                  →
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-sm lg:text-base text-slate-500 leading-relaxed">
                  CZ・AT・終了画面・トロフィー・エピソードなどから
                  設定を推測します。
                </p>
              </div>
            </div>
          </Link>


          {/* 乙女5 */}
          <div className="block bg-white/80 rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/40 overflow-hidden">
            <div className="p-5 sm:p-6 lg:p-7">

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-xl lg:text-2xl font-extrabold shrink-0">
                    O
                  </div>

                  <div>
                    <p className="text-xs lg:text-sm font-bold text-slate-400 tracking-wide uppercase mb-1">
                      OTO5
                    </p>

                    <h2 className="text-lg lg:text-xl font-extrabold text-slate-700">
                      乙女5
                    </h2>
                  </div>
                </div>

                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold whitespace-nowrap">
                  準備中
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-sm lg:text-base text-slate-400 leading-relaxed">
                  設定推測カウンターを準備中です。
                </p>
              </div>

            </div>
          </div>


          {/* 青ブタ */}
          <div className="block bg-white/80 rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/40 overflow-hidden">
            <div className="p-5 sm:p-6 lg:p-7">

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-xl lg:text-2xl font-extrabold shrink-0">
                    B
                  </div>

                  <div>
                    <p className="text-xs lg:text-sm font-bold text-slate-400 tracking-wide uppercase mb-1">
                      BUNNY GIRL
                    </p>

                    <h2 className="text-lg lg:text-xl font-extrabold text-slate-700">
                      青ブタ
                    </h2>
                  </div>
                </div>

                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold whitespace-nowrap">
                  準備中
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-sm lg:text-base text-slate-400 leading-relaxed">
                  設定推測カウンターを準備中です。
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* フッター */}
        <footer className="text-center mt-10 pb-6">
          <p className="text-xs lg:text-sm text-slate-400">
            Setting Guess Counter
          </p>
        </footer>

      </div>
    </main>
  );
}
```
