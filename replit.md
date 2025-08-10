# Roblox Multi-Account Manager

## Overview

This is a full-stack web application designed to manage multiple Roblox accounts and instances. It provides a comprehensive dashboard for monitoring and controlling Roblox game instances, offering features for account management, instance lifecycle control, activity logging, and system monitoring. The project leverages proven techniques for multi-instance functionality, including UWP package cloning and mutex bypass methods, aiming to provide a robust and anti-detection capable solution for managing multiple Roblox game instances. It also integrates enhancements for performance monitoring, automation, and tracking of the PS99 developer ecosystem.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: Radix UI components with Tailwind CSS (using shadcn/ui design system)
- **State Management**: TanStack Query for server state
- **Build Tool**: Vite

### Architecture Pattern
The application utilizes a monorepo structure separating client and server code, with shared schemas and types. It follows a RESTful API design for the backend and a component-based architecture for the frontend. Core architectural decisions include:
- **Multi-Instance Core**: Implements UWP package cloning, AppxManifest.xml modification, and ROBLOX_singletonMutex/Event bypass for robust multi-instance support.
- **Process Management**: Enhanced process manager for advanced Roblox process control, including mutex management and registry modification integration.
- **Performance Optimization**: Includes FPS unlocking via `DFIntTaskSchedulerTargetFps` and intelligent RAM management with automatic cleanup.
- **Automation & Enhancement**: Integrates macro management, boost scheduling, and FastFlags optimization for PS99 (Pet Simulator 99) enhancements.
- **Developer Ecosystem Tracking**: Features a system for tracking PS99 developers, community groups, assets, and network connections.
- **Cross-platform Compatibility**: Designed to adapt to non-Windows environments, with full functionality on Windows and demo modes for Mac/Linux where applicable.
- **Deployment**: Supports both portable versions and an Electron desktop application for flexible distribution.
- **UI/UX**: Modern web dashboard with real-time monitoring, resource tracking, quick launch buttons, performance cards, and advanced form controls. Uses Tailwind CSS for styling and Lucide React for icons.

### Key Features
- Account and Instance Management
- Activity Logging
- System Monitoring (CPU, memory, GPU, FPS)
- Anti-detection measures
- PS99 Boost Scheduler and Macro Manager
- PS99 Performance Optimizer and Value Tracker
- PS99 Developer Ecosystem and Community Tracking

## External Dependencies

### Core Framework Dependencies
- `@neondatabase/serverless` (for serverless PostgreSQL)
- `drizzle-orm`
- `@tanstack/react-query`
- `react-hook-form`
- `wouter`

### UI Dependencies
- `@radix-ui/*`
- `tailwindcss`
- `lucide-react`
- `class-variance-authority`

### Development Dependencies
- `vite`
- `typescript`
- `tsx`