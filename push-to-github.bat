@echo off
echo ==============================================
echo PUSHING CHANGES TO GITHUB (sq10)
echo ==============================================
echo.

:: Initialize Git if it hasn't been initialized
if not exist .git (
    echo [1/4] Initializing Git repository...
    git init
    git remote add origin https://github.com/Prasannag-cmd/sq10
) else (
    echo [1/4] Git repository already initialized. Checking remote...
    git remote remove origin >nul 2>&1
    git remote add origin https://github.com/Prasannag-cmd/sq10
)

:: Stage all files
echo [2/4] Staging modified and new files...
git add .

:: Commit files
echo [3/4] Committing changes...
git commit -m "feat: configure phase 2 interactive plots, contrast upgrades, and vercel fix"

:: Rename branch to main and push
echo [4/4] Renaming branch to main and pushing to GitHub...
git branch -M main
echo.
echo Running git push...
git push -u origin main --force

echo.
echo ==============================================
echo PROCESS COMPLETED. Vercel will now deploy.
echo ==============================================
pause
