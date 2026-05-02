#!/bin/bash
echo "============================================"
echo "  Build Blog Douro Marmores"
echo "============================================"
echo ""
echo "Instalando dependencias..."
npm install
echo ""
echo "Construindo o blog..."
npm run build
echo ""
echo "Copiando arquivo para public..."
cp dist/index.html public/blog.html
echo ""
echo "============================================"
echo "  PRONTO!"
echo ""
echo "  O arquivo do blog esta em:"
echo "  public/blog.html"
echo ""
echo "  Renomeie para index.html e suba na"
echo "  Hostinger em public_html/blog/"
echo "============================================"
