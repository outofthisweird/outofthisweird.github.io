# outofthisweird.log

GitHub Pages와 Jekyll로 만든 개인 블로그입니다.

글은 Markdown으로 쓰고, Jekyll이 홈 화면과 글 페이지를 정적 HTML로 조립합니다.

## 주로 바꾸는 파일

- `_config.yml`: 블로그 제목, 설명, 작성자 이름을 바꿉니다.
- `_posts/*.md`: 블로그 글을 추가하거나 고칩니다.
- `assets/css/style.css`: 글꼴, 색, 여백 같은 디자인을 바꿉니다.
- `_layouts/*.html`: 반복되는 페이지 구조를 바꿉니다.

## 글 추가하기

글 파일은 `_posts/YYYY-MM-DD-title.md` 형식으로 만듭니다.

```md
---
layout: post
title: "글 제목"
author: "이름 또는 닉네임"
---

본문을 씁니다.
```

## 로컬에서 미리보기

Ruby와 Bundler가 설치되어 있다면 다음 명령을 사용할 수 있습니다.

```sh
bundle install
bundle exec jekyll serve
```

브라우저에서 보통 아래 주소를 엽니다.

```text
http://localhost:4000
```

## 배포

이 저장소는 `outofthisweird.github.io` 저장소이므로 GitHub Pages 주소는 다음과 같습니다.

```text
https://outofthisweird.github.io
```
