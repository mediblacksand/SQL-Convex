# Git Workflow Guide - SQL & Convex Learning Platform

## 🎯 Overview

This document outlines the Git workflow for the SQL & Convex Interactive Learning Platform project. Follow these guidelines to maintain code quality and project stability.

## 🌟 Branch Strategy

### **Main Branch**
- `main` - Always deployable, production-ready code
- Contains completed phases and stable features
- Protected from direct pushes (recommended)

### **Feature Branches**
```
feature/phase3-interactive-lessons    # Phase 3 development
feature/phase4-convex-integration     # Phase 4 development  
feature/ui-improvements               # UI/UX enhancements
feature/lesson-content               # Lesson data and content
hotfix/critical-fixes                # Emergency bug fixes
```

## 🚀 Daily Workflow

### **1. Starting New Work**

```bash
# Get latest main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Push to GitHub immediately  
git push -u origin feature/your-feature-name
```

### **2. During Development**

```bash
# Make changes, then commit frequently
git add .
git commit -m "feat: add query editor component"

# Push regularly (backup + collaboration)
git push origin feature/your-feature-name

# Good commit message examples:
# feat: add interactive query validation
# fix: resolve SQL.js memory leak issue  
# docs: update lesson structure documentation
# refactor: improve database hook performance
```

### **3. Completing Feature**

```bash
# Switch to main
git checkout main
git pull origin main

# Merge feature (creates merge commit)
git merge feature/your-feature-name

# Or rebase for cleaner history
git rebase feature/your-feature-name

# Push to main
git push origin main

# Tag major milestones
git tag "phase3-complete-$(date +%Y%m%d)"
git push origin --tags

# Delete feature branch (optional)
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

## 🏗️ Phase-Specific Workflows

### **Phase 3: Interactive Lessons**

```bash
# Start Phase 3
git checkout main
git checkout -b feature/phase3-interactive-lessons

# Work on components:
git commit -m "feat: add QueryEditor component"
git commit -m "feat: add LessonNavigation component"  
git commit -m "feat: implement query validation logic"
git commit -m "test: add validation tests"

# Complete Phase 3
git checkout main
git merge feature/phase3-interactive-lessons
git tag "phase3-complete"
git push origin main --tags
```

### **Phase 4: Convex Integration**

```bash
# Start Phase 4  
git checkout main
git checkout -b feature/phase4-convex-integration

# Work on backend:
git commit -m "feat: setup Convex schema"
git commit -m "feat: add user authentication"
git commit -m "feat: implement real-time features" 

# Complete Phase 4
git checkout main  
git merge feature/phase4-convex-integration
git tag "phase4-complete"
git push origin main --tags
```

## 🛡️ Recovery & Safety

### **1. Backup Before Risky Changes**

```bash
# Create safety tag
git tag backup-before-experiment-$(date +%Y%m%d-%H%M)
git push origin --tags

# Later, if needed:
git reset --hard backup-before-experiment-20241226-1430
```

### **2. Undo Recent Changes**

```bash
# Undo last commit (keep files changed)
git reset --soft HEAD~1

# Undo last commit (discard all changes)  
git reset --hard HEAD~1

# Undo multiple commits
git reset --hard HEAD~3  # Go back 3 commits
```

### **3. Fix Broken Main Branch**

```bash
# Find last good commit
git log --oneline -10

# Reset to good commit (example hash)
git reset --hard d7d347e

# Force push (CAUTION: only for solo projects)
git push --force origin main
```

### **4. Abandon Feature Branch**

```bash
# Switch to main
git checkout main

# Delete bad branch
git branch -D feature/broken-feature

# Start over
git checkout -b feature/phase3-interactive-lessons-v2
```

### **5. Lost and Confused?**

```bash
# See where you are
git status
git branch -a

# See recent work
git log --oneline -5

# Return to safety
git checkout main
```

## 📋 Best Practices

### **Commit Messages**

Use conventional commits format:

```bash
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks

# Examples:
git commit -m "feat: add SQL query syntax highlighting"
git commit -m "fix: resolve database connection timeout"
git commit -m "docs: update Phase 3 requirements"
```

### **Branch Naming**

```bash
feature/phase3-interactive-lessons    # Phase work
feature/query-editor-component        # Specific feature
fix/sql-memory-leak                   # Bug fixes
hotfix/critical-database-error        # Emergency fixes
docs/api-documentation               # Documentation
```

### **When to Commit**

✅ **Good times to commit:**
- Completed a component
- Fixed a bug
- Added tests
- End of coding session
- Before trying risky changes

❌ **Avoid committing:**
- Broken/non-compiling code
- Half-finished features
- Temporary debugging code
- Personal config files

### **Testing Before Merge**

```bash
# Always test before merging to main
npm run build        # Production build
npm run dev         # Development server  
npm run lint        # Code quality (if configured)

# TypeScript check
npx tsc --noEmit
```

## 🔄 GitHub Integration

### **Pull Request Workflow** (Recommended)

1. **Push feature branch:**
   ```bash
   git push origin feature/phase3-interactive-lessons
   ```

2. **Create Pull Request on GitHub:**
   - Compare: `feature/phase3-interactive-lessons` → `main`
   - Add description of changes
   - Request review (if working with others)

3. **Merge via GitHub interface**
4. **Delete feature branch**

### **Direct Push Workflow** (Solo Development)

```bash
# Test locally first
npm run build

# Merge and push
git checkout main
git merge feature/your-feature
git push origin main
```

## 📊 Project Status Tracking

### **Current State**
- **Main Branch**: Phase 2 Complete (SQL.js integration)
- **Active Branch**: `feature/phase3-interactive-lessons`
- **Next Planned**: `feature/phase4-convex-integration`

### **Phase Tags**
```bash
git tag -l
# Expected tags:
# phase1-complete
# phase2-complete  
# phase3-complete
# phase4-complete
```

### **Quick Status Check**

```bash
# See current branch and status
git status

# See recent commits
git log --oneline -5

# See all branches
git branch -a

# See available tags/milestones
git tag -l
```

## 🚨 Emergency Procedures

### **If You Break Everything**

```bash
# Don't panic! Go back to main
git checkout main

# Check if main is okay
npm run build

# If main is broken too, reset to last tag
git reset --hard phase2-complete

# Start fresh branch for fixes
git checkout -b hotfix/emergency-fix
```

### **If Git Conflicts Arise**

```bash
# During merge, if conflicts occur:
git status              # See conflicted files
# Edit files to resolve conflicts
git add .              # Mark conflicts as resolved  
git commit             # Complete the merge
```

### **If Branch Gets Corrupted**

```bash
# Create new branch from main
git checkout main
git checkout -b feature/phase3-v2

# Cherry-pick good commits from old branch
git cherry-pick <commit-hash>  # Repeat for each good commit
```

## 📞 Quick Reference

| Command | Purpose |
|---------|---------|
| `git status` | Check current state |
| `git log --oneline -5` | Recent commits |
| `git branch -a` | All branches |
| `git checkout main` | Switch to main |
| `git pull origin main` | Get latest main |
| `git checkout -b feature/name` | New feature branch |
| `git add .` | Stage changes |
| `git commit -m "message"` | Commit changes |
| `git push origin branch` | Push to GitHub |
| `git merge feature/name` | Merge to current branch |
| `git tag name` | Create tag |
| `git reset --hard hash` | Reset to commit |

---

## 💡 Remember

- **Main branch = working code always**
- **Feature branches = safe experimentation**  
- **Commit early, commit often**
- **Test before merging**
- **Tag phase completions**
- **Backup before risky changes**

Happy coding! 🚀