# Hot Dices - Interactive Dice Game

A React Native mobile app that provides an engaging dice-based interactive experience with multi-language support.

## 🚀 Technologies Used

### Core

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **Expo** - Development platform and build tools

### Navigation & State

- **React Navigation** - App navigation
- **React Context** - State management

### Internationalization

- **i18next** - Multi-language support
- **react-i18next** - React bindings for i18next
- **AsyncStorage** - Language preference storage

### UI & Styling

- **React Native Size Matters** - Responsive design
- **React Native Responsive Fontsize** - Responsive font size
- **React Native Country Flag** - Language selection UI

### Features

- **Expo Sharing** - App sharing functionality
- **Expo Store Review** - App rating integration
- **Google Mobile Ads** - Ad integration

### Infra

- **CI/CD com GitHub Actions + EAS Build** - This project uses CI/CD via GitHub Actions integrated with Expo Application Services (EAS).

## 🎯 App Features

### Core Functionality

- **Interactive Dice Rolling** - Animated dice with random results
- **Task Generation** - Random tasks based on dice rolls
- **Location Assignment** - Random body locations for tasks
- **No-repeat Mode** - Prevents duplicate tasks

### Multi-language Support

- **6 Languages**: English, Portuguese, Spanish, Chinese, German, Hindi
- **Dynamic Switching** - Change language without restart
- **Persistent Settings** - Remembers language choice

### User Experience

- **Share App** - Easy sharing with custom messages
- **Rate App** - Direct link to app store
- **Responsive Design** - Works on different screen sizes
- **Offline Support** - No internet required

## 📱 Screens

- **Dashboard** - Main game interface with dice
- **Settings** - Language selection and app options

## 🛠️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/         # App header
│   ├── HeaderButton/   # Header buttons
│   ├── AdsBanner/      # Advertisement component
│   └── LanguageSelector/ # Language selection
├── constants/          # App constants and translations
├── navigation/         # Navigation setup
├── providers/          # Context providers
├── screens/            # App screens
│   ├── Dashboard/      # Main game screen
│   └── DiceGame/       # Dice game logic
├── styles/             # Global styles
└── @types/             # TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Expo CLI

### Installation

```bash
# Clone the repository
git clone https://github.com/saronph/hot-dices.git

# Install dependencies
npm install

# Start development server
npm start
```

### Building

```bash
# Build for iOS
npx expo run:ios

# Build for Android
npx expo run:android
```

## 🎨 Key Features

### React Native Development

- Cross-platform mobile app
- TypeScript for type safety
- Modern React patterns with hooks

### Internationalization

- Multi-language support (6 languages)
- Dynamic language switching
- Persistent user preferences

### User Experience

- Smooth animations
- Responsive design
- Intuitive interface
- Offline functionality

## 📄 License

MIT License
