# Личный проект «Readme»

* Студент: [Николай Леонов](https://up.htmlacademy.ru/nodejs-2/8/user/1086097).
* Наставник: Илиас Эззахид.

---

_Не удаляйте и не изменяйте папки и файлы:_
_`.editorconfig`, `.gitattributes`, `.gitignore`._

---

## Памятка

### 1. Зарегистрируйтесь на Гитхабе

Если у вас ещё нет аккаунта на [github.com](https://github.com/join), скорее зарегистрируйтесь.

### 2. Создайте форк

Откройте репозиторий и нажмите кнопку «Fork» в правом верхнем углу. Репозиторий из Академии будет скопирован в ваш аккаунт.

<img width="769" alt="Press 'Fork'" src="https://cloud.githubusercontent.com/assets/259739/20264045/a1ddbf40-aa7a-11e6-9a1a-724a1c0123c8.png">

Получится вот так:

<img width="769" alt="Forked" src="https://cloud.githubusercontent.com/assets/259739/20264122/f63219a6-aa7a-11e6-945a-89818fc7c014.png">

### 3. Клонируйте репозиторий на свой компьютер

Будьте внимательны: нужно клонировать свой репозиторий (форк), а не репозиторий Академии. Также обратите внимание, что клонировать репозиторий нужно через SSH, а не через HTTPS. Нажмите зелёную кнопку в правой части экрана, чтобы скопировать SSH-адрес вашего репозитория:

<img width="769" alt="SSH" src="https://cloud.githubusercontent.com/assets/259739/20264180/42704126-aa7b-11e6-9ab4-73372b812a53.png">

Клонировать репозиторий можно так:

```
git clone SSH-адрес_вашего_форка
```

Команда клонирует репозиторий на ваш компьютер и подготовит всё необходимое для старта работы.

### 4. Начинайте обучение!

---

<a href="https://htmlacademy.ru/profession/fullstack"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/nodejs/logo-for-github-2.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[Node.js. Проектирование веб-сервисов](https://htmlacademy.ru/profession/fullstack)» от [HTML Academy](https://htmlacademy.ru).


### 5. Запуск приложений

## 5.1. Приложение Publications

  команды для работы с призмой
    npx nx run publication:db:generate
    npx nx run publication:db:migrate
    npx nx run publication:db:reset
    npx nx run publication:db:validate
    npx nx run publication:db:fill

  1. запускаем докер с постгрес
  docker compose --file ./apps/publication/docker-compose.dev.yml --env-file ./apps/publication/publication.env up -d
  2. запускаем сервер
  npx nx run publication:serve
  _________________________________________________________

  файл запросов publication.http
  находится в директории project/apps/publication/publication.http


## 5.2. Приложение Users
  1. запускаем докер монго с пользователями
  docker compose --file ./apps/user/docker-compose.dev.yml --env-file ./apps/user/.env up -d
  2. запускаем сервер
  npx nx run user:serve

  _________________________________________________________

  файл запросов authentication.http
  находится в директории project/apps/user/authentication.http


## 5.3. Приложение Filestore
1. запускаем докер монго
docker compose --file ./apps/filestore/docker-compose.dev.yml --env-file ./apps/filestore/.env up -d
2. запускаем сервер
npx nx run filestore:serve 

_________________________________________________________

файл запросов file-store.http
находится в директории  project/apps/filestore/file-store.http


## 5.4. Приложение Notify
1. запускаем докер с smpt и rabbitmq
docker compose --file ./apps/notify/docker-compose.dev.yml --project-name "readme-fake-smtp-server" --env-file "./apps/notify/.env" up -d
2. запускаем сервер
npx nx run notify:serve 

_________________________________________________________

команда для отправки на фейковый сервер
cmd /c curl --url "smtp://localhost:8025" --user "user:secretpassword" --mail-from "a@iantonov.me" --mail-rcpt "keks@htmlacademy.local" --upload-file "c:/1086097-readme-8/project/apps/notify/tmp/mail.txt"


## 5.5. Приложение Apigateway
1. запускаем сервер
npx nx run apigateway:serve
