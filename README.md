# SQL & Convex Interactive Learning Platform

An interactive web application that teaches SQL concepts alongside Convex database operations through hands-on exercises.

## 🎉 Phase 2: Complete ✅

**Major Milestone**: SQL.js database integration successfully implemented with containerized development support!

### Features Implemented:
- ✅ **SQL.js Database**: In-browser SQLite with sample movie dataset
- ✅ **Docker Container**: Full development environment with VS Code integration
- ✅ **Local WASM Files**: Eliminates external dependencies for reliable loading
- ✅ **Script Tag Loading**: Solves ES6 import issues in containerized environments
- ✅ **Port Forwarding**: Seamless localhost access from host machine
- ✅ **Hot Reload**: Full development experience with instant updates

## 🐳 Quick Start (Containerized Development)

### Using VS Code Dev Containers (Recommended):
1. **Open in Container**: Use VS Code Command Palette → "Dev Containers: Reopen in Container"
2. **Automatic Setup**: Dependencies install automatically via `postCreateCommand`
3. **Access App**: Open `http://localhost:5173` in your browser
4. **Development**: Full hot reload and debugging support

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
- **Ports**: 5173, 5174 forwarded to host
- **Workspace**: `/workspace` mounted from project root
- **User**: `vscode` with proper permissions
- **Auto-install**: Dependencies installed on container creation

## Project Structure

```
src/
├── components/
│   ├── ui/               # Reusable UI components
│   ├── lesson/           # Lesson-specific components (Phase 2)
│   └── layout/           # Layout components (Phase 2)
├── hooks/                # Custom React hooks (Phase 2)
├── types/                # TypeScript type definitions
├── data/                 # Lesson data and mock database (Phase 2)
├── utils/                # Utility functions (Phase 2)
└── convex/               # Convex schema and functions (Phase 4)
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
- ✅ Containerized development environment
- ✅ Local WASM file serving from public directory
- ✅ Real-time database status display

### Phase 3 (Planned)
- 📋 Interactive lesson components
- 📋 Query editor with validation
- 📋 Result display tables
- 📋 Progress tracking

### Phase 4 (Planned)
- 📋 Convex backend integration
- 📋 Real-time query execution
- 📋 User progress persistence
- 📋 Advanced lesson features

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

## Next Steps (Phase 3)

1. **Interactive Lesson Components**: Build query editor with syntax highlighting
2. **Lesson Navigation**: Implement lesson progression and validation
3. **Query Validation**: Add smart checking for correct SQL queries
4. **Result Comparison**: Display expected vs actual query results
5. **Convex Integration**: Prepare for Phase 4 backend integration

## Live Demo

🎉 **Working Application**: The app now displays a fully functional SQL.js database with:
- Real-time loading status
- Sample movie query results
- Database initialization feedback
- Container environment status

## Contributing

Follow the phase-by-phase development plan outlined in `ClaudeDesign.md` for consistent implementation.

---

Built with ❤️ for interactive database learning
