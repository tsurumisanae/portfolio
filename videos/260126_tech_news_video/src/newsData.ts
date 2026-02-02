export interface NewsItem {
    title: string;
    description: string;
    category: string;
}

export const newsData: NewsItem[] = [
    {
        title: "AI記者ツールキット発表",
        description: "AIエージェントが記者や編集者として機能する新しいニュースフィード作成ツールが登場。",
        category: "AI & イノベーション"
    },
    {
        title: "MediaTek & Google TPU提携",
        description: "MediaTekがGoogleと協力してTensor Processing Unit (TPU) を開発、株価が急騰。",
        category: "ハードウェア"
    },
    {
        title: "Meta 若者のAI利用を制限",
        description: "Metaは十代のユーザーがAIキャラクターと対話することを制限する措置を導入。",
        category: "ソーシャルメディア"
    },
    {
        title: "新32コアCPU 'Kratos' 発表",
        description: "Concurrent Technologiesがミッションクリティカルな用途向けの強力な32コアCPUを発表。",
        category: "ハードウェア"
    },
    {
        title: "メモリチップ不足の影響",
        description: "AIサーバーの需要急増により世界的なメモリ不足が発生、PC用RAM価格に影響。",
        category: "市場動向"
    }
];

export const videoMetadata = {
    title: "今日のテックニュース",
    date: "2026年1月26日"
};
