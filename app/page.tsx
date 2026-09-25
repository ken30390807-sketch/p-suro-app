'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-zinc-100 to-slate-200 text-slate-900 p-4 sm:p-6 font-sans antialiased">
      <div className="max-w-md mx-auto">

        {/* ヘッダー */}
        <header className="text-center pt-8 pb-7">
          <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full mb-3 tracking-wide uppercase">
            Slot Analytics
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            設定推測カウンター
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            パチスロの設定推測をサポート
          </p>
        </header>

        {/* メニュー */}
        <div className="space-y-4">

          {/* リコリス・リコイル */}
          <Link
            href="/lycoris"
            className="group block bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98]"
          >
            <div className="p-5 sm:p-6">

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">

                  {/* アイコン */}
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl font-extrabold shadow-sm">
                    R
                  </div>

                  <div>
                    <p className="text-xs font-bold text-rose-600 tracking-wide uppercase mb-1">
                      Lycoris Recoil
                    </p>

                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      リコリス・リコイル
                    </h2>
                  </div>
                </div>

                {/* 矢印 */}
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-lg font-bold transition-all duration-200 group-hover:bg-rose-600 group-hover:text-white group-hover:translate-x-1">
                  →
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-500 leading-relaxed">
                  CZ・AT・終了画面・トロフィー・エピソードなどから
                  設定を推測します。
                </p>
              </div>

            </div>
          </Link>

        </div>

        {/* フッター */}
        <footer className="text-center mt-10 pb-6">
          <p className="text-xs text-slate-400">
            Setting Guess Counter
          </p>
        </footer>

      </div>
    </main>
  );
}