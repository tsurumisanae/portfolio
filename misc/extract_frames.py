import cv2
import os

def extract_frames(video_path, output_dir, num_frames=5):
    """動画から均等に分散したフレームを抽出"""
    # 出力ディレクトリを作成
    os.makedirs(output_dir, exist_ok=True)
    
    # 動画を開く
    cap = cv2.VideoCapture(video_path)
    
    # 動画の総フレーム数を取得
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    # 抽出するフレーム番号を計算
    frame_indices = [int(total_frames * i / (num_frames + 1)) for i in range(1, num_frames + 1)]
    
    video_name = os.path.splitext(os.path.basename(video_path))[0]
    
    for idx, frame_num in enumerate(frame_indices):
        # フレーム位置を設定
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
        
        # フレームを読み込み
        ret, frame = cap.read()
        
        if ret:
            # 画像を保存
            output_path = os.path.join(output_dir, f"{video_name}_frame_{idx+1}.png")
            cv2.imwrite(output_path, frame)
            print(f"Saved: {output_path}")
    
    cap.release()
    print(f"Extracted {num_frames} frames from {video_name}")

# 動画ファイルのリスト
video_dir = r"C:\Users\mames\Desktop\見積り\㈱ナニワ\新しいフォルダー"
output_dir = r"C:\Users\mames\Desktop\tsurumi\video_frames"

videos = [
    "登場シーン.mp4",
    "悪役シーン.mp4",
    "職人シーン.mp4",
    "アリオ八尾.mp4"
]

# 各動画からフレームを抽出
for video in videos:
    video_path = os.path.join(video_dir, video)
    if os.path.exists(video_path):
        print(f"\nProcessing: {video}")
        extract_frames(video_path, output_dir, num_frames=5)
    else:
        print(f"Video not found: {video_path}")

print("\n完了！")
