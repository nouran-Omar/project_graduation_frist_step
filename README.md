# PulseX - Healthcare Platform

PulseX is a comprehensive healthcare platform focused on cardiovascular health management. It enables patients to consult with doctors, upload medical records, and receive AI-powered health recommendations.

## 🏗️ Project Structure

This repository contains:
- **Frontend**: React + Vite application (main directory)
- **AI Service**: Python/FastAPI microservice for medical image analysis (`/ai-service`)

## 🚀 Quick Start

### Frontend (React)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### AI Service (Python)

```bash
# Navigate to AI service
cd ai-service

# See quick start guide
cat QUICKSTART.md

# Or run directly
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python main.py
```

## 📋 Features

### Patient Features
- 🏥 Doctor appointments booking
- 📊 Health dashboard with metrics
- 📁 Medical records upload (X-rays, lab tests)
- 🤖 AI-powered health recommendations
- 💬 Chat with doctors
- 📱 QR code generation for medical records
- ❤️ Heart risk assessment
- 📖 Patient success stories

### Doctor Features
- 👥 Patient management
- 📅 Appointment scheduling
- 💬 Patient communication
- 📊 Patient health metrics view
- 📁 Access to patient medical records

### Admin Features
- 👥 User management (patients & doctors)
- 📊 Platform analytics
- 📖 Story management
- 📝 Activity logs

### AI-Powered Features
- 🔬 **X-ray Analysis**: Chest X-ray classification using DenseNet121
- 📄 **Lab Test OCR**: Extract and analyze medical values using EasyOCR
- 💡 **Smart Recommendations**: Personalized health recommendations
- ⚠️ **Risk Assessment**: Automated risk level calculation

## 🤖 AI Service

The AI service is a separate FastAPI-based microservice that provides:

1. **X-ray Analysis**
   - Binary classification (Normal/Abnormal)
   - Confidence scoring
   - Risk level assessment
   - Health recommendations

2. **Lab Test Analysis**
   - OCR text extraction
   - Medical value parsing (cholesterol, blood pressure, blood sugar, etc.)
   - Risk factor identification
   - Health metric analysis

3. **Combined Analysis**
   - Comprehensive health assessment
   - Unified recommendations

### AI Service Documentation
- 📘 [Complete Documentation](ai-service/README.md)
- 🚀 [Quick Start Guide](ai-service/QUICKSTART.md)
- 💻 [.NET Integration Guide](ai-service/DOTNET_INTEGRATION.md)
- 📊 [Summary](ai-service/SUMMARY.md)

### AI Service Endpoints
- `GET /health` - Health check
- `POST /api/xray/analyze` - Analyze X-ray images
- `POST /api/lab-test/analyze` - Analyze lab test images
- `POST /api/recommendations` - Get comprehensive recommendations

### Technology Stack (AI Service)
- FastAPI (Python web framework)
- PyTorch (Deep learning)
- DenseNet121 (X-ray classification)
- EasyOCR (Text extraction)
- Pillow, OpenCV (Image processing)

## 🏗️ Architecture

```
┌─────────────────────┐
│   React Frontend    │
│    (Vite + React)   │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   .NET Backend API  │
│  (To be developed)  │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  AI Service (FastAPI)│
│  - X-ray Analysis   │
│  - Lab Test OCR     │
└─────────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- TailwindCSS
- Framer Motion
- React Router DOM
- Lucide React (Icons)

### AI Service
- Python 3.8+
- FastAPI
- PyTorch + TorchVision
- EasyOCR
- Pillow, OpenCV

## 📚 Documentation

- [Frontend Setup](./README.md) (this file)
- [AI Service Documentation](./ai-service/README.md)
- [AI Quick Start](./ai-service/QUICKSTART.md)
- [.NET Integration](./ai-service/DOTNET_INTEGRATION.md)

## 🚀 Development

### Running Frontend
```bash
npm run dev
```

### Running AI Service
```bash
cd ai-service
python main.py
```

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
