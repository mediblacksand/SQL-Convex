# SQL & Convex Interactive Learning Platform

An interactive web application that teaches SQL concepts alongside Convex database operations through hands-on exercises.

## Phase 1: Complete ✅

This phase includes:
- React + TypeScript + Vite setup
- Tailwind CSS configuration
- TypeScript interfaces and types
- Error boundary components
- Basic project structure
- Development and build configuration

## Quick Start

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

### Phase 1 (Current)
- ✅ Modern React + TypeScript setup
- ✅ Tailwind CSS with custom theme
- ✅ Error boundaries and loading states
- ✅ TypeScript interfaces for lessons and database
- ✅ Development and production build setup

### Phase 2 (Next)
- 🔄 SQL.js database integration
- 🔄 Sample database with movie data
- 🔄 Query execution engine
- 🔄 Basic lesson structure

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
- **Build Tool**: Vite
- **Database**: SQL.js (browser SQLite)
- **Backend**: Convex (planned)
- **Deployment**: GitHub Pages
- **Icons**: Lucide React

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Next Steps

1. **Phase 2**: Implement SQL.js database integration
2. Install remaining dependencies
3. Create sample database with movie data
4. Implement basic query execution
5. Build lesson navigation structure

## Contributing

Follow the phase-by-phase development plan outlined in `ClaudeDesign.md` for consistent implementation.

---

Built with ❤️ for interactive database learning