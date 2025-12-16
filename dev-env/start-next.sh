#!/bin/sh

echo "Ожидание готовности базы данных..."

while ! nc -z db 5432; do
  sleep 15
done

echo "База данных готова!"

echo "Запуск Prisma seed..."
npx prisma db seed

echo "Запуск Next.js..."
exec npm start