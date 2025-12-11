# PLC Monitoring Dashboard

A real-time variable trend visualizer for industrial PLC systems. This application allows automation engineers to monitor how PLC variables change over time to debug control logic and tune system performance.

## Setup & Run Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm (v11.4.2 or compatible)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd plc-monitoring
```

2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

### Building for Production

Build the project:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Architecture & Performance Decisions

### State Management

The application uses **Angular Signals** for reactive state management:

- **VariablesStore**: Manages the list of available PLC variables and their selection state
- **DataStore**: Handles the real-time data stream, chart series computation, and frequency management
- **MonitoringFacade**: Provides a unified view model (VM) pattern for components

This architecture ensures:

- **Reactive updates**: Components automatically update when data changes
- **Performance**: Signals provide fine-grained reactivity without unnecessary re-renders
- **Separation of concerns**: Business logic is separated from UI components

### Data Stream Handling

The application uses **RxJS** with Angular's `rxResource` for efficient data streaming:

- **Single stream approach**: All variables transmit via one unified stream to minimize overhead
- **Configurable frequency**: Update rate can be adjusted (2 Hz, 10 Hz, 20 Hz) to test performance
- **Data buffering**: Only the last 50 data points per variable are kept in memory to prevent memory leaks
- **Efficient updates**: Chart updates are triggered only when data actually changes

### Component Architecture

The application follows a **feature-based architecture**:

```
src/app/features/monitoring/
├── components/
│   ├── chart/              # Highcharts-based trend visualization
│   ├── variables/          # Variable list with selection
│   └── frequency-selector/  # Update frequency control
├── models/                 # TypeScript interfaces and types
├── pages/                  # Main monitoring page
├── services/               # Business logic (mock data generation)
└── store/                  # State management (stores, facade)
```

**Benefits**:

- Clean separation of concerns (components vs services vs state)
- Reusable, feature-scoped components
- Easy to test and maintain
- Scalable structure for future modules

## Component Structure (Separation of Concerns)

### Core Components

1. **MonitoringComponent** (`pages/monitoring.ts`)

   - Main page component
   - Orchestrates child components
   - Handles user interactions (variable toggling, frequency changes)

2. **ChartComponent** (`components/chart/`)

   - Wraps Highcharts for trend visualization
   - Handles chart configuration and updates
   - Displays time-based X-axis with auto-scaled Y-axis

3. **VariablesComponent** (`components/variables/`)

   - Displays list of available variables
   - Shows latest values, types, and units
   - Handles variable selection (max 4)
   - List for 20+ variables

4. **FrequencySelectorComponent** (`components/frequency-selector/`)
   - Allows switching between update frequencies
   - Presets: Low (2 Hz), Medium (10 Hz), High (20 Hz)

**Separation principles applied**:

- **UI-only components**: `chart`, `variables`, `frequency-selector` render data received via inputs.
- **Stores**: `variables.store`, `data.store` own state and business rules.
- **Facade**: `monitoring.facade` coordinates stores and exposes a simplified view model to the page.
- **Services**: `plc-data.service` isolates data generation/sourcing from UI concerns.

### Services

- **PlcDataService**: Generates realistic mock data based on variable type:
  - **BOOL**: Random toggles with 5% probability
  - **INT**: Incrementing counters with occasional setpoint changes
  - **REAL**: Sinusoidal waveforms with noise (simulating sensor readings)

### Stores

- **VariablesStore**: Manages variable list and selection state
- **DataStore**: Handles data streaming, chart series computation, and frequency management
- **MonitoringFacade**: Provides unified view model for components and orchestrates interaction between stores

## Performance Notes

### Performance Optimizations

1. **Signal-based reactivity**: Only affected components re-render when data changes
2. **Computed values**: Chart series and derived state are computed lazily
3. **Efficient updates**: Chart uses Highcharts' optimized update mechanisms
4. **Disabled features**: Tooltips, markers, and hover states disabled to reduce overhead
5. **Incremental point adds**: New samples are appended per point instead of redrawing entire series, keeping DOM churn low and animations smooth.

## Technology Stack

- **Framework**: Angular 21.0
- **State Management**: Angular Signals
- **Charts**: Highcharts 12.4
- **Styling**: Tailwind CSS 4.1
- **Streaming**: RxJS 7.8
