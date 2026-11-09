# MAI topic

毎朝更新される、小笠原さん向けの情報まとめページです。ホーム画面にインストールできるPWAとして配信しています。

**公開URL:** https://ogasawararyuhei-source.github.io/mai-topic/

## ジャンル（11項目・データ駆動で追加可能）

AIニュース / GitHub人気 / GitHub最新 / GitHub（ブログで熱いもの） / ラズベリーパイ・スタックちゃん×AI / ドット・MUSE・PC接続 / CNC・AI DIY / クリカット・カッターマシン / UVプリンター / 子どもの怪我・病気リスク / 子どもの発達

## 使い方

- スクロールではなくスワイプで移動（左右：記事、上下：ジャンル）
- テーマ切り替え：スチームパンク / 魔女 / D&D風 / ケルト風 / ギリシャ神話風
- タップで和訳全文、メモ保存と共有に対応
- iPhoneでは Safari で開いて「ホーム画面に追加」するとアプリとして起動できます

## 構成

- `index.html` — 本体（記事データを含む自己完結ページ）
- `manifest.webmanifest` / `sw.js` / `icon.svg` — PWA用ファイル
- `.github/workflows/pages.yml` — mainへのプッシュでGitHub Pagesへ自動デプロイ
