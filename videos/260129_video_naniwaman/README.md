# ナニワマン - 照明会社イベント用映像

光のヒーロー「ナニワマン」が、やお市・ひがしおおさか市を守る物語を通じて、照明会社のモノづくりの魅力を伝える映像作品です。

## 🎬 シナリオ概要

### 登場人物
- **ナニワマン**: 光のヒーロー
- **子ども**: 暗い路地裏で怯える
- **母親**: 子どもと一緒にいる
- **悪役**: 暗闇に潜む犯罪者

### シーン構成（全10シーン、約100秒）

1. **ナニワマン登場** (10秒) - ヒーローの使命を語る
2. **暗い路地裏** (6秒) - 親子が怯える
3. **悪役登場** (5秒) - 悪役が親子を脅かす
4. **ナニワマン救出** (8秒) - 光のビームで悪役を退治
5. **感謝の言葉** (10秒) - 親子との会話
6. **全国展開** (9秒) - 日本地図と光る点
7. **街の空撮** (8秒) - 明るい街並み
8. **工場シーン** (20秒) - 設計・製造工程
9. **ショッピングモール** (14秒) - アリオやお前での集合
10. **エンディング** (10秒) - NANIWA MANロゴ

## 🚀 セットアップ

### 依存関係のインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開くと、Remotion Studioが起動します。

## 🎥 レンダリング

### 動画のレンダリング

```bash
npm run render NaniwamanHero out/naniwaman.mp4
```

### レンダリングオプション

- **解像度**: 1920x1080 (Full HD)
- **フレームレート**: 30fps
- **総フレーム数**: 3000フレーム（100秒）

## 📁 プロジェクト構造

```
src/
├── Root.tsx                    # Remotionルートコンポーネント
├── NaniwamanVideo.tsx          # メイン動画コンポーネント
├── index.ts                    # エントリーポイント
└── scenes/                     # 各シーンのコンポーネント
    ├── Scene1_NaniwamanIntro.tsx
    ├── Scene2_DarkAlley.tsx
    ├── Scene3_VillainAppears.tsx
    ├── Scene4_NaniwamanSaves.tsx
    ├── Scene5_Gratitude.tsx
    ├── Scene6_NationalReach.tsx
    ├── Scene7_CityAerial.tsx
    ├── Scene8_Factory.tsx
    ├── Scene9_ShoppingMall.tsx
    └── Scene10_Ending.tsx
```

## 🎨 デザインの特徴

- **ヒーローカラー**: ゴールド (#ffd700) をメインカラーに使用
- **アニメーション**: Spring、Interpolateを活用した滑らかな動き
- **エフェクト**: 光のビーム、キラキラエフェクト、グロー効果
- **視覚的インパクト**: 明暗のコントラストで物語を強調

## 📝 カスタマイズ

### シーンの尺を調整

`src/NaniwamanVideo.tsx` の `scenes` オブジェクトでフレーム数を変更できます：

```typescript
const scenes = {
  intro: 300,           // 10秒
  darkAlley: 180,       // 6秒
  // ...
};
```

### 色やスタイルの変更

各シーンのコンポーネント内で、スタイルを直接編集できます。

## 🛠️ 技術スタック

- **Remotion**: React ベースの動画制作フレームワーク
- **React**: UIコンポーネント
- **TypeScript**: 型安全な開発

## 📄 ライセンス

UNLICENSED - プライベートプロジェクト
