# Local LLM Chat App

Простое full‑stack приложение для локального чата с LLM.

Стек проекта:

- **Next.js (App Router)** — UI и API
- **Ollama** — локальный LLM‑сервер
- **PostgreSQL** — база данных

Все сервисы запускаются в Docker и поднимаются одной командой.

---

## Требования

Перед началом убедись, что у тебя установлено:

- Docker
- Docker Compose (обычно уже есть в Docker Desktop)
- Ollama CLI — _необязательно_, Ollama работает в контейнере

### GPU (опционально)

Если хочешь использовать NVIDIA GPU для Ollama, потребуется установить **NVIDIA Container Toolkit**.

---

## Запуск проекта

### 1. Клонирование репозитория

```bash
git clone https://github.com/cyntraten/local-llm-nextjs
cd local-llm-nextjs
```

### 2. Переменные окружения

Скопируй пример и при необходимости отредактируй значения:

```bash
cp env.example .env
```

Основные переменные:

- `POSTGRES_PORT`, `OLLAMA_PORT`, `NEXTJS_PORT` — можно менять, если порты заняты
- `LLM_HOST=http://ollama:11434` — **не менять** (используется внутри Docker-сети)
- `NEXTAUTH_URL`, `NEXT_PUBLIC_BASE_URL` — должны совпадать с портом Next.js

После заполнения env-файла в корне проекта нужно его копию поместить в папку dev-env

---

### 3. Сборка и запуск контейнеров

```bash
cd dev-env
docker-compose up --build
```

При первом запуске это может занять несколько минут:

- собирается Next.js
- устанавливаются зависимости
- применяются Prisma‑миграции
- выполняется seed базы данных

---

### 4. Открытие приложения

В браузере:

```
http://localhost:3000
```

Если менял `NEXTJS_PORT`, используй соответствующий порт.

Войдите или создайте аккаунт и пользуйтесь!

---

## Сервисы

| Сервис     | Порт  | Имя внутри Docker | Описание    |
| ---------- | ----- | ----------------- | ----------- |
| Next.js    | 3000  | `nextjs`          | UI и API    |
| PostgreSQL | 5432  | `db`              | База данных |
| Ollama     | 11434 | `ollama`          | LLM‑сервер  |

Важно:

- из браузера используется `localhost:{PORT}`
- между контейнерами — имена сервисов (`db`, `ollama`)

---

## Полезные команды

```bash
# Остановить контейнеры
docker-compose down

# Остановить контейнеры и удалить volumes (полный сброс БД)
docker-compose down -v

# Логи Next.js
docker-compose logs -f nextjs

# Логи Ollama
docker-compose logs -f ollama
```

---

## Ollama и модели

Модели нужно загружать **внутри контейнера Ollama**:

```bash
docker exec -it ollama ollama pull llama3.1
```

После этого модель будет доступна приложению.

---

## Возможные проблемы

### Не удаётся подключиться к PostgreSQL

Ошибка вида:

```
Can't reach database server at localhost:5432
```

Причина — использование `localhost` в строке подключения.

Правильно:

```env
POSTGRES_URL=postgresql://user:pass@db:5432/mydb?schema=public
```

---

### Next.js не может подключиться к Ollama

Ошибка:

```
connect ECONNREFUSED 127.0.0.1:11434
```

Проверь, что:

```env
LLM_HOST=http://ollama:11434
```

И что это значение используется в коде клиента Ollama.

---

### Порт уже занят

Измени порт в `.env`, например:

```env
NEXTJS_PORT=4000
NEXTAUTH_URL=http://localhost:4000
NEXT_PUBLIC_BASE_URL=http://localhost:4000
```

---

## Лицензия

[MIT](LICENSE)

---
