@echo off
echo ============================================
echo   Build Blog Douro Marmores
echo ============================================
echo.
echo Instalando dependencias...
call npm install
echo.
echo Construindo o blog...
call npm run build
echo.
echo Copiando arquivo para public...
copy /Y dist\index.html public\blog.html
echo.
echo ============================================
echo   PRONTO!
echo.
echo   O arquivo do blog esta em:
echo   public\blog.html
echo.
echo   Renomeie para index.html e suba na
echo   Hostinger em public_html\blog\
echo ============================================
echo.
pause
