# Измерительное и паяльное оборудование 3Logic Group

## Общая информация

* сборка и работа dev сервера осуществляется с помощью webpack
* структура проекта модульно-компонентая
* mobile-first медиа выражения
* поддержка typescript, wasm, sass, scss

## Важно

* указывайте пути для изображений, видео и импортируемых файлов от папки src. Например:

````html
<img src="src/assets/img/placeholder.jpg" loading="lazy" alt="img">
````

````typescript
import 'src/scripts/global-scroll-controller'
````

````scss
@import 'src/styles/shared';
````

* желательно использовать **scss** и **typescript**, однако поддержка javascript, sass и css присутствует

## Скрипты

* npm i обновляет node_modules
* npm start запускает node server
* npm run dev собирает проект
* npm run build собирает и оптимизирует проект

