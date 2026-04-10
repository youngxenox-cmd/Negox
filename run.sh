#!/bin/bash
git add .
git status
echo ""
read -p "Message de commit : " msg
git commit -m "$msg"
git push origin main
echo ""
echo "✅ Pushed — Vercel déploie automatiquement"
