import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: '.env.local ファイルに GEMINI_API_KEY が設定されていません。' },
        { status: 500 }
      );
    }

    const {
      games,
      cz,
      at,
      episodes,
      stScreens,
      trophies,
      rushEpisodes,
      rushWEpisodes,
      directRush,
      childhoodCz,
      commonBell,
    } = await req.json();

    const czProb = cz > 0 ? (games / cz).toFixed(1) : 'なし';
    const atProb = at > 0 ? (games / at).toFixed(1) : 'なし';
    const directRushProb = directRush > 0 ? (games / directRush).toFixed(1) : 'なし';
    const childhoodCzProb = childhoodCz > 0 ? (games / childhoodCz).toFixed(1) : 'なし';
    const commonBellProb = commonBell > 0 ? (games / commonBell).toFixed(1) : 'なし';

    const prompt = `
あなたは「スマスロ リコリコ（リコリス・リコイル）」のデータ解析・設定判別プロフェッショナルAIです。

【1. 基本データ】
・通常ゲーム数: ${games} G
・CZ当選回数: \({cz} 回 (確率: 1/\){czProb})
・AT当選回数: \({at} 回 (確率: 1/\){atProb})
・ラッシュ直撃回数: \({directRush || 0} 回 (確率: 1/\){directRushProb})
・幼少期CZ当選回数: \({childhoodCz || 0} 回 (確率: 1/\){childhoodCzProb})
・通常時 共通ベル回数: \({commonBell || 0} 回 (確率: 1/\){commonBellProb})

【2. ST終了画面 カウント】
[千束RUSH終了時]
・千束(制服) [デフォルト]: ${stScreens?.chisatoRush_chisatoUniform || 0} 回
・たきな(制服) [法則矛盾]: ${stScreens?.chisatoRush_takinaUniform || 0} 回 (※設定4以上濃厚)
・千束(私服) [高設定UP弱]: ${stScreens?.chisatoRush_chisatoCasual || 0} 回
・たきな(私服) [キャラ矛盾]: ${stScreens?.chisatoRush_takinaCasual || 0} 回 (※設定4以上濃厚)

[たきなRUSH終了時]
・たきな(制服) [デフォルト]: ${stScreens?.takinaRush_takinaUniform || 0} 回
・千束(制服) [法則矛盾]: ${stScreens?.takinaRush_chisatoUniform || 0} 回 (※設定4以上濃厚)
・たきな(私服) [高設定UP弱]: ${stScreens?.takinaRush_takinaCasual || 0} 回
・千束(私服) [キャラ矛盾]: ${stScreens?.takinaRush_chisatoCasual || 0} 回 (※設定4以上濃厚)

[共通画面]
・千束&たきな(ドレスコード): ${stScreens?.dressCode || 0} 回 (高設定UP強)
・押上の風景: ${stScreens?.oshiage || 0} 回 (設定2以上濃厚)
・ロボ太: ${stScreens?.robota || 0} 回 (設定4以上濃厚)
・ハワイ: ${stScreens?.hawaii || 0} 回 (設定6濃厚)

【3. サミートロフィー カウント】
・銅: ${trophies?.bronze || 0} 回 (設定2以上濃厚)
・銀: ${trophies?.silver || 0} 回 (設定3以上濃厚)
・金: ${trophies?.gold || 0} 回 (設定4以上濃厚)
・キリン柄: ${trophies?.giraffe || 0} 回 (設定5以上濃厚)
・虹: ${trophies?.rainbow || 0} 回 (設定6濃厚)

【4. プロローグエピソード カウント】
・【EP1】Time will tell ① [デフォルト]: ${episodes?.ep1 || 0} 回
・【EP2】The more the merrier [デフォルト]: ${episodes?.ep2 || 0} 回
・【EP3】Repay evil with evil [高設定期待度UP(弱)]: ${episodes?.ep3 || 0} 回
・【EP4】Time will tell ② [高設定期待度UP(強)]: ${episodes?.ep4 || 0} 回

【5. リコリスラッシュ中 エピソードボーナス カウント】
・【EP1】Easy does it [デフォルト]: ${rushEpisodes?.ep1 || 0} 回
・【EP2】Nothing seek, nothing find [デフォルト]: ${rushEpisodes?.ep2 || 0} 回
・【EP3】Opposites attract [高設定期待度UP(弱)]: ${rushEpisodes?.ep3 || 0} 回
・【EP4】Recoil of Lycoris −side千束＆真島− [高設定期待度UP(強)]: ${rushEpisodes?.ep4 || 0} 回

【6. リコリスラッシュW中 エピソードボーナス カウント】
・【EP1】More haste, less speed [デフォルト]: ${rushWEpisodes?.ep1 || 0} 回
・【EP2】So far, so good [デフォルト]: ${rushWEpisodes?.ep2 || 0} 回
・【EP3】Recoil of Lycoris −sideリコリコ− [高設定期待度UP(弱)]: ${rushWEpisodes?.ep3 || 0} 回
・【EP4】Recoil of Lycoris −sideハワイ− [高設定期待度UP(強)]: ${rushWEpisodes?.ep4 || 0} 回

【7. 主要設定差の基準値】
・ラッシュ直撃確率: 設定1 (1/22429.5) 〜 設定6 (1/6263.7)
・幼少期CZ確率: 設定1 (1/3965.0) 〜 設定6 (大幅優遇)
・共通ベル確率: 設定1 (1/95.8) / 設定5 (1/83.2) / 設定6 (1/79.1)

【判別方針】
1. サミートロフィーおよびST終了画面の確定要素（虹/キリン柄/金/銀/銅、ハワイ/ロボ太/押上/キャラ矛盾）から、最低設定の下限を最優先で特定する。
2. ラッシュ直撃確率、幼少期CZ確率、共通ベル確率（1/95.8〜1/79.1）の実測値を大きな設定差要素として総合評価に組み込む。
3. ST終了画面（私服/ドレスコード）、プロローグエピソード（EP3/EP4）、リコリスラッシュ中EP（EP3/EP4）、リコリスラッシュW中EP（EP3/EP4）の示唆比率を総合評価する。
4. CZ・AT確率の実測値をスペック表と比較して最終的な設定割合・推奨立ち回りを算定する。

【出力フォーマット】
1. 総合推測設定（※ここで必ず「設定1：〇%、設定2：〇%、設定3：〇%、設定4：〇%、設定5：〇%、設定6：〇%」の形式で、合計が100%になる各設定の可能性（推測確率）の確率配分を明記すること）
2. 確定・示唆演出の解析（ST終了画面・トロフィー・各種EPボーナス）
3. 確率データの評価（CZ・AT確率、ラッシュ直撃確率、幼少期CZ確率、共通ベル確率）
4. 立ち回り・続行判断の助言
`;

    let response;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        attempts++;
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });
        break;
      } catch (err: any) {
        if (err?.status === 503 && attempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }
        throw err;
      }
    }

    if (!response || !response.text) {
      throw new Error('AIからの応答を取得できませんでした。');
    }

    return NextResponse.json({ analysis: response.text });
  } catch (error: any) {
    console.error('API Error Details:', error);
    return NextResponse.json(
      { error: error.message || 'AI分析に失敗しました。' },
      { status: 500 }
    );
  }
}