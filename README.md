# SQL & Convex Interactive Learning Platform

An interactive web application that teaches SQL concepts alongside Convex database operations through hands-on exercises.

## 🎉 Phase 3: Complete ✅

**Major Milestone**: Interactive lesson components fully implemented with educational SQL learning experience!

### Features Implemented:
- ✅ **Interactive Query Editor**: SQL input with copy/paste prevention for learning
- ✅ **Lesson Navigation**: Previous/Next navigation with progress tracking
- ✅ **Strict Validation**: Requires proper SQL syntax including semicolons
- ✅ **Real Results**: Shows actual movie data from in-browser SQLite database
- ✅ **Educational Features**: Hints, task descriptions, concept explanations
- ✅ **Learning Progression**: SQL completion unlocks Convex equivalent
- ✅ **Container Development**: Fixed Docker setup with proper Node.js base image
- ✅ **Production Ready**: 172.70kB optimized bundle, zero TypeScript errors

## 🐳 Quick Start (Containerized Development)

### Using VS Code Dev Containers (Recommended):
1. **Open in Container**: Use VS Code Command Palette → "Dev Containers: Reopen in Container"
2. **Automatic Setup**: Dependencies install automatically via `postCreateCommand`
3. **Start Lesson**: Run `npm run dev` and open `http://localhost:5173`
4. **Begin Learning**: Click "Start Lesson 1: Introduction to Databases"
5. **Educational Experience**: Type SQL queries (copy/paste disabled), get real-time feedback

### 🚨 Container Troubleshooting (Fixed Issues):
If `localhost:5173` doesn't load:
```bash
# Kill any defunct processes
pkill -f npm; pkill -f node; pkill -f vite

# Restart dev server
npm run dev

# Verify server is listening
netstat -tlnp | grep 5173
# Should show: tcp 0 0 0.0.0.0:5173 0.0.0.0:* LISTEN
```

**Root Cause Fixed**: Updated to `javascript-node:18` base image with proper port mapping.

### Traditional Setup:
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Container Configuration:
- **Base Image**: `javascript-node:18` (Fixed: was `base:ubuntu`)
- **Ports**: 5173, 5174 explicitly mapped container→host
- **Workspace**: `/workspace` mounted from project root
- **User**: `vscode` with proper permissions
- **Auto-install**: Dependencies installed on container creation

## 📚 Learning Experience

### Lesson 1: "Introduction to Databases"
**Try it now**: Start the app and click "Start Lesson 1"

**What you'll learn**:
- Basic SQL SELECT syntax
- How to query all columns with `*`
- Importance of semicolons in SQL
- Difference between SQL and Convex approaches

**Interactive Features**:
- **Type to Learn**: Copy/paste disabled to encourage hands-on practice
- **Real-time Validation**: Instant feedback on query correctness
- **Hint System**: 4 helpful tips to guide you
- **Live Results**: See actual movie data from the database
- **Progressive Unlocking**: Convex explanation reveals after SQL success

**Expected Query**: `SELECT * FROM movies;`
**Results**: 7 columns showing id, title, director, year, length_minutes, language, worldwide_gross_millions

### Database Schema
The sample database contains:
- **movies**: 14 Pixar films with complete metadata
- **boxoffice**: Revenue and rating data
- **theaters**: Theater information for advanced lessons

## Project Structure

```
src/
├── components/
│   ├── ui/               # ErrorBoundary, LoadingSpinner
│   └── lesson/           # QueryEditor, LessonView (Phase 3 ✅)
├── hooks/                # useDatabase with SQL.js integration
├── types/                # LessonData, DatabaseState interfaces
├── data/                 # lessons.ts, sampleData.ts with Pixar movies
├── utils/                # analytics.ts for usage tracking
└── convex/               # Schema and functions (Phase 4 - Optional)
```

## Features

### Phase 1: Complete ✅
- ✅ Modern React + TypeScript setup
- ✅ Tailwind CSS with custom theme
- ✅ Error boundaries and loading states
- ✅ TypeScript interfaces for lessons and database
- ✅ Development and production build setup

### Phase 2: Complete ✅
- ✅ SQL.js database integration (script tag loading approach)
- ✅ Sample database with movie data (14 Pixar films)
- ✅ Query execution engine with error handling
- ✅ Containerized development environment (Fixed networking issues)
- ✅ Local WASM file serving from public directory

### Phase 3: Complete ✅
- ✅ Interactive Query Editor with copy/paste prevention
- ✅ Lesson navigation system (Previous/Next buttons)
- ✅ Strict SQL validation requiring semicolons
- ✅ Real-time result display with formatted tables
- ✅ Educational hints and task descriptions
- ✅ Learning progression: SQL → Convex explanations
- ✅ Lesson 1: "Introduction to Databases" fully implemented
- ✅ Real-time database status display

### Phase 4: Optional Convex Integration
- 📋 User authentication and accounts
- 📋 Cross-device progress synchronization  
- 📋 Social learning features
- 📋 Advanced analytics and user tracking

### Next Development Steps
- 📋 Lesson 2: "SELECT Queries with Constraints" 
- 📋 Additional lessons (3-18) following SQLBolt curriculum
- 📋 Advanced query types (JOINs, aggregations)
- 📋 Deploy to GitHub Pages for public access


## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite with WASM support
- **Database**: SQL.js (browser SQLite) with local WASM files
- **Container**: Docker with VS Code Dev Containers
- **Development**: Hot reload, port forwarding (5173, 5174)
- **Backend**: Convex (planned for Phase 4)
- **Deployment**: GitHub Pages with containerized builds
- **Icons**: Lucide React

## Database Features

### Sample Dataset:
- **Movies Table**: 14 Pixar films with director, year, runtime data
- **Boxoffice Table**: Revenue and ratings data with foreign keys
- **Theaters Table**: Sample theater data for advanced JOIN exercises

### Query Capabilities:
- ✅ Basic SELECT queries with sample data display
- ✅ Error handling with user-friendly messages
- ✅ Real-time query execution status
- ✅ Results displayed in formatted tables

## Troubleshooting

### Container Issues:
- **Port Conflicts**: Ensure ports 5173/5174 are available
- **Permission Issues**: Container runs as `vscode` user
- **WASM Loading**: Local files served from `/public/sql.js/`

### SQL.js Issues:
- **Import Errors**: Uses script tag loading (not ES6 imports)
- **CORS Errors**: Local WASM files eliminate external dependencies
- **Memory Issues**: Database cleanup handled in useEffect cleanup

See `SQLJS_TROUBLESHOOTING.md` for detailed debugging information.

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Recent Updates

### Latest Changes (Phase 3 Complete):
- ✅ **Fixed Container Networking**: Updated to `javascript-node:18` base image
- ✅ **Interactive Lesson 1**: Complete implementation with copy/paste prevention
- ✅ **Strict Validation**: Requires proper SQL syntax including semicolons
- ✅ **Educational Features**: Hints, progressive unlocking, real-time feedback
- ✅ **Production Ready**: 172.70kB optimized bundle, zero TypeScript errors

## Live Demo

🎉 **Working Application**: The app now displays a fully functional SQL.js database with:
- Real-time loading status
- Sample movie query results
- Database initialization feedback
- Container environment status

## 🔄 Development Workflow

This project uses a **Feature Branch Workflow** for safe development and code stability.

### Quick Start Workflow:
```bash
# Start new feature
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
git push -u origin feature/your-feature-name

# Daily development
git add .
git commit -m "feat: add new component"
git push origin feature/your-feature-name

# Complete feature
git checkout main
git merge feature/your-feature-name
git push origin main
git tag "milestone-name"
git push origin --tags
```

### Branch Strategy:
- `main` - Stable, production-ready code
- `feature/phase3-*` - Phase 3 development
- `feature/phase4-*` - Phase 4 development
- `hotfix/*` - Emergency fixes

### 🚨 Recovery Commands:
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Go back to known good state
git checkout main
git reset --hard phase2-complete

# Create backup before risky changes
git tag backup-$(date +%Y%m%d)
```

📖 **See `GIT_WORKFLOW.md` for complete Git workflow documentation**

## Contributing

1. **Follow the branch workflow** outlined in `GIT_WORKFLOW.md`
2. **Phase-by-phase development** plan in `ClaudeDesign.md`
3. **Test before merging** - run build and development server
4. **Tag phase completions** for easy rollback points

---

Built with ❤️ for interactive database learning
