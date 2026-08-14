# Portfolio

## Первый запуск
npm install
npm run dev

## Каждый запуск
npm run dev

## Публикация на Vercel
1. Загрузить проект в GitHub.
2. Открыть `https://vercel.com`.
3. Нажать `Add New` -> `Project`.
4. Выбрать репозиторий с сайтом.
5. В настройках проекта указать:
   - Framework Preset: `Vite`
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Нажать `Deploy`.

git add .
git commit -m "Update site"
git push

## Где менять
- Весь текст RU/EN, проекты и фото проектов: `src/content/siteContent.js`
- Картинки: `public/assets/`
- Ссылки: `src/data/socialLinks.js`
- Цвета/отступы/шрифты: `tailwind.config.js`

## Быстрое редактирование
Обычно нужно менять только `src/content/siteContent.js`: там тексты, названия, описания, порядок проектов и пути к картинкам. Новые изображения кладите в `public/assets/`, затем указывайте путь вида `/assets/...`. После правок запускайте `npm run dev` для проверки и `npm run build` перед публикацией.
