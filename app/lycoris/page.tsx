'use client';

import React, { useState } from 'react';

export default function Home() {
  // 基本データ
  const [games, setGames] = useState('0');
  const [cz, setCz] = useState('0');
  const [at, setAt] = useState('0');

  // 1. プロローグエピソード カウンター
  const [episodes, setEpisodes] = useState({
    ep1: 0, // Time will tell ① (デフォルト)
    ep2: 0, // The more the merrier (デフォルト)
    ep3: 0, // Repay evil with evil (高設定期待度UP弱)
    ep4: 0, // Time will tell ② (高設定期待度UP強)
  });

  // 2. ST終了画面 RUSH別分割
  const [stScreens, setStScreens] = useState({
    chisatoRush_chisatoUniform: 0,
    chisatoRush_takinaUniform: 0,
    chisatoRush_chisatoCasual: 0,
    chisatoRush_takinaCasual: 0,

    takinaRush_takinaUniform: 0,
    takinaRush_chisatoUniform: 0,
    takinaRush_takinaCasual: 0,
    takinaRush_chisatoCasual: 0,

    dressCode: 0,
    oshiage: 0,
    robota: 0,
    hawaii: 0,
  });

  // 3. サミートロフィー カウンター
  const [trophies, setTrophies] = useState({
    bronze: 0, // 銅 (設定2以上濃厚)
    silver: 0, // 銀 (設定3以上濃厚)
    gold: 0,   // 金 (設定4以上濃厚)
    giraffe: 0,// キリン柄 (設定5以上濃厚)
    rainbow: 0,// 虹 (設定6濃厚)
  });

  // 4. リコリスラッシュ中 エピソードボーナス カウンター
  const [rushEpisodes, setRushEpisodes] = useState({
    ep1: 0, // Easy does it (デフォルト)
    ep2: 0, // Nothing seek, nothing find (デフォルト)
    ep3: 0, // Opposites attract (高設定期待度UP弱)
    ep4: 0, // Recoil of Lycoris −side千束＆真島− (高設定期待度UP強)
  });

  // 5. リコリスラッシュW中 エピソードボーナス カウンター
  const [rushWEpisodes, setRushWEpisodes] = useState({
    ep1: 0, // More haste, less speed (デフォルト)
    ep2: 0, // So far, so good (デフォルト)
    ep3: 0, // Recoil of Lycoris −sideリコリコ− (高設定期待度UP弱)
    ep4: 0, // Recoil of Lycoris −sideハワイ− (高設定期待度UP強)
  });

  // 6. ラッシュ直撃回数 カウンター
  const [directRush, setDirectRush] = useState(0);

  // 8. 幼少期CZ カウンター
  const [childhoodCz, setChildhoodCz] = useState(0);

  // 9. 共通ベル カウンター
  const [commonBell, setCommonBell] = useState(0);

  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const addGames = (amount: number) => {
    setGames((prev) => {
      const current = Number(prev) || 0;
      return String(Math.max(0, current + amount));
    });
  };

  const updateCzCount = (delta: number) => {
    setCz((prev) => String(Math.max(0, (Number(prev) || 0) + delta)));
  };

  const updateAtCount = (delta: number) => {
    setAt((prev) => String(Math.max(0, (Number(prev) || 0) + delta)));
  };

  const updateEpisodeCount = (key: keyof typeof episodes, delta: number) => {
    setEpisodes((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const updateScreenCount = (key: keyof typeof stScreens, delta: number) => {
    setStScreens((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const updateTrophyCount = (key: keyof typeof trophies, delta: number) => {
    setTrophies((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const updateRushEpisodeCount = (key: keyof typeof rushEpisodes, delta: number) => {
    setRushEpisodes((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const updateRushWEpisodeCount = (key: keyof typeof rushWEpisodes, delta: number) => {
    setRushWEpisodes((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const updateDirectRushCount = (delta: number) => {
    setDirectRush((prev) => Math.max(0, prev + delta));
  };

  const updateChildhoodCzCount = (delta: number) => {
    setChildhoodCz((prev) => Math.max(0, prev + delta));
  };

  const updateCommonBellCount = (delta: number) => {
    setCommonBell((prev) => Math.max(0, prev + delta));
  };

  const handleAnalyze = async () => {
    if (!games || Number(games) === 0) {
      alert('「通常時 総ゲーム数」を入力してください');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          games: Number(games),
          cz: Number(cz),
          at: Number(at),
          episodes,
          stScreens,
          trophies,
          rushEpisodes,
          rushWEpisodes,
          directRush,
          childhoodCz,
          commonBell,
        }),
      });

      const data = await res.json();
      if (data.error) {
        setResult(`エラー: ${data.error}`);
      } else {
        setResult(data.analysis);
      }
    } catch (err) {
      setResult('通信エラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  // 算出される確率系
  const czProb = Number(cz) > 0 && Number(games) > 0 ? (Number(games) / Number(cz)).toFixed(1) : null;
  const atProb = Number(at) > 0 && Number(games) > 0 ? (Number(games) / Number(at)).toFixed(1) : null;
  const directRushProb = directRush > 0 && Number(games) > 0 ? (Number(games) / directRush).toFixed(1) : null;
  const childhoodCzProb = childhoodCz > 0 && Number(games) > 0 ? (Number(games) / childhoodCz).toFixed(1) : null;
  const commonBellProb = commonBell > 0 && Number(games) > 0 ? (Number(games) / commonBell).toFixed(1) : null;

  // 汎用カウンターコンポーネント用
  const renderEpisodeCounter = (label: string, subLabel: string, key: keyof typeof episodes) =>
    React.createElement(
      'div',
      { className: 'flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 my-2 shadow-2xs transition hover:bg-slate-100/60' },
      React.createElement(
        'div',
        { className: 'flex-1 pr-3' },
        React.createElement('p', { className: 'text-sm font-bold text-slate-800 mb-0.5' }, label),
        React.createElement('p', { className: 'text-xs text-slate-500 leading-snug' }, subLabel)
      ),
      React.createElement(
        'div',
        { className: 'flex items-center space-x-3' },
        React.createElement('button', { type: 'button', onClick: () => updateEpisodeCount(key, -1), className: 'w-9 h-9 bg-white text-slate-700 rounded-lg font-bold border border-slate-300 hover:bg-slate-100 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '-'),
        React.createElement('span', { className: 'w-8 text-center font-mono font-bold text-base text-rose-600' }, episodes[key]),
        React.createElement('button', { type: 'button', onClick: () => updateEpisodeCount(key, 1), className: 'w-9 h-9 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '+')
      )
    );

  const renderScreenCounter = (label: string, subLabel: string, key: keyof typeof stScreens) =>
    React.createElement(
      'div',
      { className: 'flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 my-2 shadow-2xs transition hover:bg-slate-100/60' },
      React.createElement(
        'div',
        { className: 'flex-1 pr-3' },
        React.createElement('p', { className: 'text-sm font-bold text-slate-800 mb-0.5' }, label),
        React.createElement('p', { className: 'text-xs text-slate-500 leading-snug' }, subLabel)
      ),
      React.createElement(
        'div',
        { className: 'flex items-center space-x-3' },
        React.createElement('button', { type: 'button', onClick: () => updateScreenCount(key, -1), className: 'w-9 h-9 bg-white text-slate-700 rounded-lg font-bold border border-slate-300 hover:bg-slate-100 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '-'),
        React.createElement('span', { className: 'w-8 text-center font-mono font-bold text-base text-rose-600' }, stScreens[key]),
        React.createElement('button', { type: 'button', onClick: () => updateScreenCount(key, 1), className: 'w-9 h-9 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '+')
      )
    );

  const renderTrophyCounter = (label: string, subLabel: string, key: keyof typeof trophies) =>
    React.createElement(
      'div',
      { className: 'flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 my-2 shadow-2xs transition hover:bg-slate-100/60' },
      React.createElement(
        'div',
        { className: 'flex-1 pr-3' },
        React.createElement('p', { className: 'text-sm font-bold text-slate-800 mb-0.5' }, label),
        React.createElement('p', { className: 'text-xs text-slate-500 leading-snug' }, subLabel)
      ),
      React.createElement(
        'div',
        { className: 'flex items-center space-x-3' },
        React.createElement('button', { type: 'button', onClick: () => updateTrophyCount(key, -1), className: 'w-9 h-9 bg-white text-slate-700 rounded-lg font-bold border border-slate-300 hover:bg-slate-100 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '-'),
        React.createElement('span', { className: 'w-8 text-center font-mono font-bold text-base text-rose-600' }, trophies[key]),
        React.createElement('button', { type: 'button', onClick: () => updateTrophyCount(key, 1), className: 'w-9 h-9 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '+')
      )
    );

  const renderRushEpisodeCounter = (label: string, subLabel: string, key: keyof typeof rushEpisodes) =>
    React.createElement(
      'div',
      { className: 'flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 my-2 shadow-2xs transition hover:bg-slate-100/60' },
      React.createElement(
        'div',
        { className: 'flex-1 pr-3' },
        React.createElement('p', { className: 'text-sm font-bold text-slate-800 mb-0.5' }, label),
        React.createElement('p', { className: 'text-xs text-slate-500 leading-snug' }, subLabel)
      ),
      React.createElement(
        'div',
        { className: 'flex items-center space-x-3' },
        React.createElement('button', { type: 'button', onClick: () => updateRushEpisodeCount(key, -1), className: 'w-9 h-9 bg-white text-slate-700 rounded-lg font-bold border border-slate-300 hover:bg-slate-100 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '-'),
        React.createElement('span', { className: 'w-8 text-center font-mono font-bold text-base text-rose-600' }, rushEpisodes[key]),
        React.createElement('button', { type: 'button', onClick: () => updateRushEpisodeCount(key, 1), className: 'w-9 h-9 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '+')
      )
    );

  const renderRushWEpisodeCounter = (label: string, subLabel: string, key: keyof typeof rushWEpisodes) =>
    React.createElement(
      'div',
      { className: 'flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 my-2 shadow-2xs transition hover:bg-slate-100/60' },
      React.createElement(
        'div',
        { className: 'flex-1 pr-3' },
        React.createElement('p', { className: 'text-sm font-bold text-slate-800 mb-0.5' }, label),
        React.createElement('p', { className: 'text-xs text-slate-500 leading-snug' }, subLabel)
      ),
      React.createElement(
        'div',
        { className: 'flex items-center space-x-3' },
        React.createElement('button', { type: 'button', onClick: () => updateRushWEpisodeCount(key, -1), className: 'w-9 h-9 bg-white text-slate-700 rounded-lg font-bold border border-slate-300 hover:bg-slate-100 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '-'),
        React.createElement('span', { className: 'w-8 text-center font-mono font-bold text-base text-rose-600' }, rushWEpisodes[key]),
        React.createElement('button', { type: 'button', onClick: () => updateRushWEpisodeCount(key, 1), className: 'w-9 h-9 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '+')
      )
    );

  return React.createElement(
    'main',
    { className: 'min-h-screen bg-gradient-to-br from-slate-100 via-zinc-100 to-slate-200 text-slate-900 p-4 sm:p-6 w-full max-w-md md:max-w-lg lg:max-w-2xl mx-auto pb-24 font-sans antialiased' },
    
    React.createElement(
      'header',
      { className: 'text-center my-6' },
      React.createElement('span', { className: 'inline-block px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full mb-2 tracking-wide uppercase' }, 'Lycoris Recoil Analytics'),
      React.createElement('h1', { className: 'text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight' }, 'スマスロ リコリコ 設定推測 AI')
    ),

    React.createElement(
      'div',
      { className: 'bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6' },

      // 1. 基本データ (ゲーム数 + CZ/AT カウンター)
      React.createElement(
        'div',
        { className: 'space-y-4 border-b border-slate-100 pb-6' },
        React.createElement(
          'div',
          { className: 'flex items-center justify-between' },
          React.createElement(
            'h2',
            { className: 'font-bold text-rose-600 text-base tracking-wide flex items-center gap-2' },
            React.createElement('span', { className: 'w-2 h-2 rounded-full bg-rose-600' }),
            '1. 基本データ'
          )
        ),
        
        // ゲーム数入力
        React.createElement(
          'div',
          { className: 'space-y-1.5' },
          React.createElement('label', { className: 'block text-xs font-bold text-slate-600 uppercase tracking-wider' }, '通常時 総ゲーム数 (G)*'),
          React.createElement('input', {
            type: 'number',
            value: games,
            onChange: (e) => setGames(e.target.value),
            onClick: (e) => (e.target as HTMLInputElement).select(),
            className: 'w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition shadow-2xs',
          }),
          React.createElement(
            'div',
            { className: 'grid grid-cols-4 gap-2 pt-1.5' },
            React.createElement('button', { type: 'button', onClick: () => addGames(1000), className: 'py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-xs font-bold rounded-lg border border-slate-200 text-slate-700 shadow-2xs transition' }, '+1000'),
            React.createElement('button', { type: 'button', onClick: () => addGames(100), className: 'py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-xs font-bold rounded-lg border border-slate-200 text-slate-700 shadow-2xs transition' }, '+100'),
            React.createElement('button', { type: 'button', onClick: () => addGames(10), className: 'py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-xs font-bold rounded-lg border border-slate-200 text-slate-700 shadow-2xs transition' }, '+10'),
            React.createElement('button', { type: 'button', onClick: () => addGames(1), className: 'py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-xs font-bold rounded-lg border border-slate-200 text-slate-700 shadow-2xs transition' }, '+1')
          )
        ),

        // CZ当選回数 カウンター
        React.createElement(
          'div',
          { className: 'flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 my-2 mt-4 shadow-2xs' },
          React.createElement(
            'div',
            { className: 'flex-1 pr-3' },
            React.createElement('p', { className: 'text-sm font-bold text-slate-800 mb-0.5' }, 'CZ 当選回数'),
            React.createElement('p', { className: 'text-xs text-slate-500 leading-snug font-mono' }, czProb ? `確率: 1/${czProb}` : '確率: -')
          ),
          React.createElement(
            'div',
            { className: 'flex items-center space-x-3' },
            React.createElement('button', { type: 'button', onClick: () => updateCzCount(-1), className: 'w-9 h-9 bg-white text-slate-700 rounded-lg font-bold border border-slate-300 hover:bg-slate-100 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '-'),
            React.createElement('span', { className: 'w-8 text-center font-mono font-bold text-base text-rose-600' }, cz),
            React.createElement('button', { type: 'button', onClick: () => updateCzCount(1), className: 'w-9 h-9 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '+')
          )
        ),

        // AT当選回数 カウンター
        React.createElement(
          'div',
          { className: 'flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 my-2 shadow-2xs' },
          React.createElement(
            'div',
            { className: 'flex-1 pr-3' },
            React.createElement('p', { className: 'text-sm font-bold text-slate-800 mb-0.5' }, 'AT 当選回数'),
            React.createElement('p', { className: 'text-xs text-slate-500 leading-snug font-mono' }, atProb ? `確率: 1/${atProb}` : '確率: -')
          ),
          React.createElement(
            'div',
            { className: 'flex items-center space-x-3' },
            React.createElement('button', { type: 'button', onClick: () => updateAtCount(-1), className: 'w-9 h-9 bg-white text-slate-700 rounded-lg font-bold border border-slate-300 hover:bg-slate-100 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '-'),
            React.createElement('span', { className: 'w-8 text-center font-mono font-bold text-base text-rose-600' }, at),
            React.createElement('button', { type: 'button', onClick: () => updateAtCount(1), className: 'w-9 h-9 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '+')
          )
        )
      ),

      // 2. ST終了画面 カウンター
      React.createElement(
        'div',
        { className: 'pt-2 space-y-4 border-b border-slate-100 pb-6' },
        React.createElement(
          'div',
          { className: 'flex justify-between items-center mb-1' },
          React.createElement(
            'h2',
            { className: 'font-bold text-rose-600 text-base tracking-wide flex items-center gap-2' },
            React.createElement('span', { className: 'w-2 h-2 rounded-full bg-rose-600' }),
            '2. ST終了画面カウント'
          ),
          React.createElement(
            'span',
            { className: 'text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200' },
            `計 ${Object.values(stScreens).reduce((a, b) => a + b, 0)} 回`
          )
        ),

        React.createElement(
          'div',
          { className: 'space-y-2 border-l-3 border-rose-500 pl-3.5 py-1 my-3' },
          React.createElement('p', { className: 'text-xs font-bold text-rose-700 uppercase tracking-wider mb-2' }, '【千束RUSH終了時】'),
          renderScreenCounter('千束(制服)', 'デフォルト', 'chisatoRush_chisatoUniform'),
          renderScreenCounter('たきな(制服)', '法則矛盾 (設定4以上濃厚)', 'chisatoRush_takinaUniform'),
          renderScreenCounter('千束(私服)', '高設定期待度UP (弱)', 'chisatoRush_chisatoCasual'),
          renderScreenCounter('たきな(私服)', 'キャラ矛盾 (設定4以上濃厚)', 'chisatoRush_takinaCasual')
        ),

        React.createElement(
          'div',
          { className: 'space-y-2 border-l-3 border-indigo-500 pl-3.5 py-1 my-4' },
          React.createElement('p', { className: 'text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2' }, '【たきなRUSH終了時】'),
          renderScreenCounter('たきな(制服)', 'デフォルト', 'takinaRush_takinaUniform'),
          renderScreenCounter('千束(制服)', '法則矛盾 (設定4以上濃厚)', 'takinaRush_chisatoUniform'),
          renderScreenCounter('たきな(私服)', '高設定期待度UP (弱)', 'takinaRush_takinaCasual'),
          renderScreenCounter('千束(私服)', 'キャラ矛盾 (設定4以上濃厚)', 'takinaRush_chisatoCasual')
        ),

        React.createElement(
          'div',
          { className: 'space-y-2 border-l-3 border-amber-500 pl-3.5 py-1 my-4' },
          React.createElement('p', { className: 'text-xs font-bold text-amber-700 uppercase tracking-wider mb-2' }, '【共通示唆・確定画面】'),
          renderScreenCounter('千束&たきな(ドレス)', '高設定期待度UP (強)', 'dressCode'),
          renderScreenCounter('押上の風景', '設定2以上濃厚', 'oshiage'),
          renderScreenCounter('ロボ太', '設定4以上濃厚', 'robota'),
          renderScreenCounter('ハワイ', '設定6濃厚', 'hawaii')
        )
      ),

      // 3. サミートロフィー カウンター
      React.createElement(
        'div',
        { className: 'pt-2 space-y-4 border-b border-slate-100 pb-6' },
        React.createElement(
          'div',
          { className: 'flex justify-between items-center mb-1' },
          React.createElement(
            'h2',
            { className: 'font-bold text-rose-600 text-base tracking-wide flex items-center gap-2' },
            React.createElement('span', { className: 'w-2 h-2 rounded-full bg-rose-600' }),
            '3. サミートロフィーカウント'
          ),
          React.createElement(
            'span',
            { className: 'text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200' },
            `計 ${Object.values(trophies).reduce((a, b) => a + b, 0)} 回`
          )
        ),
        React.createElement(
          'div',
          { className: 'space-y-2 border-l-3 border-amber-500 pl-3.5 py-1' },
          renderTrophyCounter('銅トロフィー', '設定2以上濃厚', 'bronze'),
          renderTrophyCounter('銀トロフィー', '設定3以上濃厚', 'silver'),
          renderTrophyCounter('金トロフィー', '設定4以上濃厚', 'gold'),
          renderTrophyCounter('キリン柄トロフィー', '設定5以上濃厚', 'giraffe'),
          renderTrophyCounter('虹トロフィー', '設定6濃厚', 'rainbow')
        )
      ),

      // 4. プロローグエピソード カウンター
      React.createElement(
        'div',
        { className: 'pt-2 space-y-4 border-b border-slate-100 pb-6' },
        React.createElement(
          'div',
          { className: 'flex justify-between items-center mb-1' },
          React.createElement(
            'h2',
            { className: 'font-bold text-rose-600 text-base tracking-wide flex items-center gap-2' },
            React.createElement('span', { className: 'w-2 h-2 rounded-full bg-rose-600' }),
            '4. プロローグエピソードカウント'
          ),
          React.createElement(
            'span',
            { className: 'text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200' },
            `計 ${Object.values(episodes).reduce((a, b) => a + b, 0)} 回`
          )
        ),
        React.createElement(
          'div',
          { className: 'space-y-2 border-l-3 border-purple-500 pl-3.5 py-1 my-3' },
          renderEpisodeCounter('【EP1】Time will tell ①', 'デフォルト / 真島が社内で通話', 'ep1'),
          renderEpisodeCounter('【EP2】The more the merrier', 'デフォルト / ロボ太とウォールナットが会話', 'ep2'),
          renderEpisodeCounter('【EP3】Repay evil with evil', '高設定期待度UP(弱) / 真島がモニター演説', 'ep3'),
          renderEpisodeCounter('【EP4】Time will tell ②', '高設定期待度UP(強) / 真島が屋上で通話', 'ep4')
        )
      ),

      // 5. リコリスラッシュ中 エピソードボーナス カウンター
      React.createElement(
        'div',
        { className: 'pt-2 space-y-4 border-b border-slate-100 pb-6' },
        React.createElement(
          'div',
          { className: 'flex justify-between items-center mb-1' },
          React.createElement(
            'h2',
            { className: 'font-bold text-rose-600 text-base tracking-wide flex items-center gap-2' },
            React.createElement('span', { className: 'w-2 h-2 rounded-full bg-rose-600' }),
            '5. リコリスラッシュ中 EPボーナス'
          ),
          React.createElement(
            'span',
            { className: 'text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200' },
            `計 ${Object.values(rushEpisodes).reduce((a, b) => a + b, 0)} 回`
          )
        ),
        React.createElement(
          'div',
          { className: 'space-y-2 border-l-3 border-emerald-500 pl-3.5 py-1 my-3' },
          renderRushEpisodeCounter('【EP1】Easy does it', 'デフォルト', 'ep1'),
          renderRushEpisodeCounter('【EP2】Nothing seek, nothing find', 'デフォルト', 'ep2'),
          renderRushEpisodeCounter('【EP3】Opposites attract', '高設定期待度UP(弱)', 'ep3'),
          renderRushEpisodeCounter('【EP4】Recoil of Lycoris −side千束＆真島−', '高設定期待度UP(強)', 'ep4')
        )
      ),

      // 6. リコリスラッシュW中 エピソードボーナス カウンター
      React.createElement(
        'div',
        { className: 'pt-2 space-y-4 border-b border-slate-100 pb-6' },
        React.createElement(
          'div',
          { className: 'flex justify-between items-center mb-1' },
          React.createElement(
            'h2',
            { className: 'font-bold text-rose-600 text-base tracking-wide flex items-center gap-2' },
            React.createElement('span', { className: 'w-2 h-2 rounded-full bg-rose-600' }),
            '6. リコリスラッシュW中 EPボーナス'
          ),
          React.createElement(
            'span',
            { className: 'text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200' },
            `計 ${Object.values(rushWEpisodes).reduce((a, b) => a + b, 0)} 回`
          )
        ),
        React.createElement(
          'div',
          { className: 'space-y-2 border-l-3 border-cyan-500 pl-3.5 py-1 my-3' },
          renderRushWEpisodeCounter('【EP1】More haste, less speed', 'デフォルト', 'ep1'),
          renderRushWEpisodeCounter('【EP2】So far, so good', 'デフォルト', 'ep2'),
          renderRushWEpisodeCounter('【EP3】Recoil of Lycoris −sideリコリコ−', '高設定期待度UP(弱)', 'ep3'),
          renderRushWEpisodeCounter('【EP4】Recoil of Lycoris −sideハワイ−', '高設定期待度UP(強)', 'ep4')
        )
      ),

      // 7. ラッシュ直撃確率 カウンター
      React.createElement(
        'div',
        { className: 'pt-2 space-y-4 border-b border-slate-100 pb-6' },
        React.createElement(
          'div',
          { className: 'flex justify-between items-center mb-1' },
          React.createElement(
            'h2',
            { className: 'font-bold text-rose-600 text-base tracking-wide flex items-center gap-2' },
            React.createElement('span', { className: 'w-2 h-2 rounded-full bg-rose-600' }),
            '7. ラッシュ直撃確率'
          ),
          React.createElement(
            'span',
            { className: 'text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200 font-mono' },
            directRushProb ? `1/${directRushProb}` : '確率: -'
          )
        ),
        React.createElement(
          'div',
          { className: 'space-y-2 border-l-3 border-orange-500 pl-3.5 py-1 my-3' },
          React.createElement(
            'div',
            { className: 'flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 my-2 shadow-2xs' },
            React.createElement(
              'div',
              { className: 'flex-1 pr-3' },
              React.createElement('p', { className: 'text-sm font-bold text-slate-800 mb-0.5' }, '通常時 ラッシュ直撃回数'),
              React.createElement('p', { className: 'text-xs text-slate-500 leading-snug' }, '設定1: 1/22429.5 〜 設定6: 1/6263.7')
            ),
            React.createElement(
              'div',
              { className: 'flex items-center space-x-3' },
              React.createElement('button', { type: 'button', onClick: () => updateDirectRushCount(-1), className: 'w-9 h-9 bg-white text-slate-700 rounded-lg font-bold border border-slate-300 hover:bg-slate-100 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '-'),
              React.createElement('span', { className: 'w-8 text-center font-mono font-bold text-base text-rose-600' }, directRush),
              React.createElement('button', { type: 'button', onClick: () => updateDirectRushCount(1), className: 'w-9 h-9 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '+')
            )
          )
        )
      ),

      // 8. 幼少期CZ カウンター
      React.createElement(
        'div',
        { className: 'pt-2 space-y-4 border-b border-slate-100 pb-6' },
        React.createElement(
          'div',
          { className: 'flex justify-between items-center mb-1' },
          React.createElement(
            'h2',
            { className: 'font-bold text-rose-600 text-base tracking-wide flex items-center gap-2' },
            React.createElement('span', { className: 'w-2 h-2 rounded-full bg-rose-600' }),
            '8. 幼少期CZ'
          ),
          React.createElement(
            'span',
            { className: 'text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200 font-mono' },
            childhoodCzProb ? `1/${childhoodCzProb}` : '確率: -'
          )
        ),
        React.createElement(
          'div',
          { className: 'space-y-2 border-l-3 border-pink-500 pl-3.5 py-1 my-3' },
          React.createElement(
            'div',
            { className: 'flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 my-2 shadow-2xs' },
            React.createElement(
              'div',
              { className: 'flex-1 pr-3' },
              React.createElement('p', { className: 'text-sm font-bold text-slate-800 mb-0.5' }, '幼少期CZ当選回数'),
              React.createElement('p', { className: 'text-xs text-slate-500 leading-snug' }, '設定1: 1/3965.0 〜 設定6: 高確率（設定差大）')
            ),
            React.createElement(
              'div',
              { className: 'flex items-center space-x-3' },
              React.createElement('button', { type: 'button', onClick: () => updateChildhoodCzCount(-1), className: 'w-9 h-9 bg-white text-slate-700 rounded-lg font-bold border border-slate-300 hover:bg-slate-100 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '-'),
              React.createElement('span', { className: 'w-8 text-center font-mono font-bold text-base text-rose-600' }, childhoodCz),
              React.createElement('button', { type: 'button', onClick: () => updateChildhoodCzCount(1), className: 'w-9 h-9 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '+')
            )
          )
        )
      ),

      // 9. 共通ベル出現率 カウンター
      React.createElement(
        'div',
        { className: 'pt-2 space-y-4' },
        React.createElement(
          'div',
          { className: 'flex justify-between items-center mb-1' },
          React.createElement(
            'h2',
            { className: 'font-bold text-rose-600 text-base tracking-wide flex items-center gap-2' },
            React.createElement('span', { className: 'w-2 h-2 rounded-full bg-rose-600' }),
            '9. 共通ベル出現率'
          ),
          React.createElement(
            'span',
            { className: 'text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200 font-mono' },
            commonBellProb ? `1/${commonBellProb}` : '確率: -'
          )
        ),
        React.createElement(
          'div',
          { className: 'space-y-2 border-l-3 border-amber-400 pl-3.5 py-1 my-3' },
          React.createElement(
            'div',
            { className: 'p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 my-2 shadow-2xs space-y-3' },
            React.createElement(
              'div',
              { className: 'flex justify-between items-center' },
              React.createElement(
                'div',
                { className: 'pr-3' },
                React.createElement('p', { className: 'text-sm font-bold text-slate-800 mb-0.5' }, '通常時 共通ベル回数'),
                React.createElement('p', { className: 'text-xs text-slate-500 leading-snug' }, '設定1: 1/95.8 〜 設定6: 1/79.1')
              ),
              React.createElement(
                'div',
                { className: 'flex items-center space-x-3' },
                React.createElement('button', { type: 'button', onClick: () => updateCommonBellCount(-1), className: 'w-9 h-9 bg-white text-slate-700 rounded-lg font-bold border border-slate-300 hover:bg-slate-100 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '-'),
                React.createElement('span', { className: 'w-8 text-center font-mono font-bold text-base text-rose-600' }, commonBell),
                React.createElement('button', { type: 'button', onClick: () => updateCommonBellCount(1), className: 'w-9 h-9 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 active:scale-95 text-base flex items-center justify-center shadow-xs transition' }, '+')
              )
            ),
            React.createElement(
              'div',
              { className: 'grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60' },
              React.createElement('button', { type: 'button', onClick: () => updateCommonBellCount(10), className: 'py-2 bg-white hover:bg-slate-100 active:scale-95 text-xs font-bold rounded-lg border border-slate-300 text-slate-700 shadow-2xs transition' }, '+10'),
              React.createElement('button', { type: 'button', onClick: () => updateCommonBellCount(5), className: 'py-2 bg-white hover:bg-slate-100 active:scale-95 text-xs font-bold rounded-lg border border-slate-300 text-slate-700 shadow-2xs transition' }, '+5'),
              React.createElement('button', { type: 'button', onClick: () => updateCommonBellCount(1), className: 'py-2 bg-white hover:bg-slate-100 active:scale-95 text-xs font-bold rounded-lg border border-slate-300 text-slate-700 shadow-2xs transition' }, '+1')
            )
          )
        )
      ),

      React.createElement(
        'button',
        {
          onClick: handleAnalyze,
          disabled: loading,
          className: 'w-full py-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold text-base rounded-xl transition disabled:opacity-50 mt-8 shadow-lg shadow-rose-600/25 active:scale-98 tracking-wide',
        },
        loading ? 'AIが分析中...' : '設定判別を行う'
      )
    ),

    result &&
      React.createElement(
        'div',
        { className: 'mt-8 p-5 sm:p-6 bg-white rounded-3xl border border-rose-200/80 space-y-3 shadow-xl shadow-slate-200/50' },
        React.createElement(
          'div',
          { className: 'flex items-center gap-2 border-b border-slate-100 pb-3' },
          React.createElement('span', { className: 'w-3 h-3 rounded-full bg-rose-600' }),
          React.createElement('h2', { className: 'font-extrabold text-lg text-slate-900 tracking-tight' }, 'AIプロフェッショナル分析結果')
        ),
        React.createElement(
          'div',
          { className: 'text-sm sm:text-base whitespace-pre-wrap leading-relaxed text-slate-700 pt-1 font-normal' },
          result
        )
      )
  );
}