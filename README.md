
# 🎯 Sparta

**AI-Powered Presentation Generator**

Sparta is a full-stack SaaS application that leverages artificial intelligence to automatically generate professional PowerPoint presentations. Users can create stunning slides by simply providing a topic and selecting a design style, powered by Google's Gemini AI and React with Firebase.

---

## 🔗 Live Demo

[**Try Sparta Now →**](https://presentation-aryanabhale26s-projects.vercel.app/)

---

## 🎥 Demo Video

[![Sparta Demo](https://github.com/user-attachments/assets/06287faf-904c-480b-b179-fc6d51a743d4)

---

## 🎯 Features

### Core Capabilities
- **🤖 AI-Powered Generation** - Google Gemini AI generates slide content and HTML layouts
- **🎨 Multiple Design Styles** - 6+ professional themes (Classic, Modern, Minimal, Bold, Creative, Professional)
- **✏️ Live Editing** - Real-time inline editing with AI-assisted modifications
- **📊 Slide Outline Management** - Create, edit, and organize slide structure before generation
- **💾 Auto-Save** - Automatic saving of all edits to Firebase
- **📥 Export to PowerPoint** - Download presentations as editable .pptx files
- **🔐 Secure Authentication** - Clerk-based user authentication and session management
- **💳 Credit System** - Free tier (2 credits) and Pro tier (300 credits) with upgrade options
- **📱 Responsive Design** - Dark theme optimized for all devices

---

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React + Vite | Modern UI framework with fast builds |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Authentication** | Clerk | User authentication and management |
| **Database** | Firebase Firestore | NoSQL database for storing projects and slides |
| **Storage** | Firebase Storage | Store generated slide images |
| **AI Engine** | Google Gemini AI | Content generation and live streaming |
| **Image Processing** | ImageKit | Image optimization and delivery |
| **Export** | PptxGenJS + html2canvas | PowerPoint file generation |
| **State Management** | React Context API | User and project state management |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account
- Clerk account
- Google Gemini API key
- ImageKit account

### 1️⃣ Clone Repository
```bash
https://github.com/AryanAbhale26/Presentation.git
cd Presentation
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Configuration

Create a `.env` file in the root directory:
```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# ImageKit
VITE_URL_PONT=https://ik.imagekit.io/your_imagekit_id

# Google Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4️⃣ Firebase Setup

1. Create a [Firebase](https://firebase.google.com) project
2. Enable Firestore Database
3. Enable Firebase Storage
4. Create the following Firestore collections:
   - `users` - User profiles and credits
   - `project` - PPT projects and metadata
5. Set up Firebase Security Rules (see Firebase Console)

### 5️⃣ Run Development Server
```bash
npm run dev
```

Application will be available at `http://localhost:5173`

### 6️⃣ Build for Production
```bash
npm run build
npm run preview
```

---

## 📡 API Integrations

### Google Gemini AI
- **Live Streaming API** - Real-time slide generation with streaming responses
- **Content Generation** - Outline creation and slide content generation
- **AI Editing** - Inline content modification based on user prompts

### Firebase Services
- **Firestore** - Project storage, user data, slide content
- **Authentication** - User session management (integrated with Clerk)
- **Storage** - Generated slide images and assets

### Clerk Authentication
- **User Sign-up/Sign-in** - Email and social login options
- **Session Management** - Secure token-based authentication
- **User Profile** - User metadata and credit tracking


---

## 💳 Credit System

### Free Tier
- 2 credits upon registration
- 1 credit = 1 PPT generation
- Access to all design styles
- Basic features

### Pro Tier
- 300 credits per month
- Priority support
- Advanced features
- Bulk generation
- Custom branding options

---

## 🎨 Design Styles

1. **Professional Blue** - Corporate-style with blue and white tones
2. **Modern Gradient** - Contemporary design with vibrant gradients
3. **Minimal Clean** - Clean white design with subtle accents
4. **Bold Dark** - Dark theme with bold typography
5. **Creative Colorful** - Vibrant multi-color palette
6. **Classic Elegant** - Traditional presentation style

---

## 🔧 Key Features Explained

### AI Slide Generation
- User provides topic and number of slides
- Gemini AI generates structured outline
- Each slide is created with HTML/CSS based on selected design style
- Live streaming shows generation progress

### Inline Editing
- Click any element in the slide preview to edit
- AI-powered modifications via floating action tool
- Manual text editing with contenteditable
- Changes auto-save to Firebase

### Outline Management
- Edit slide titles and descriptions before generation
- Reorder slides
- Add/remove slides
- Regenerate specific slides

### Export System
- Converts HTML slides to canvas using html2canvas
- Generates PowerPoint file with PptxGenJS
- Preserves design and layout
- Downloadable .pptx format

---

## 🛠️ Development Workflow

### Component Structure
- **Workspace** - Main dashboard and project listing
- **PromptBox** - Initial topic input with slide count
- **Outline** - Design selection and outline editing
- **Editor** - Live slide preview and editing interface
- **SliderFrame** - Individual slide rendering with edit capability
- **OutlineSection** - Slide outline display with edit modal
- **FloatingActionTool** - AI-powered inline editing assistant

### State Management
- User context for authentication state
- Project state for current working project
- Slide state for generated content
- Credit tracking and validation

### Database Schema

**users collection:**
```javascript
{
  email: string,
  fullName: string,
  credits: number,
  createdAt: timestamp,
  tier: "free" | "pro"
}
```

**project collection:**
```javascript
{
  projectId: string,
  userInputPrompt: string,
  noOfSlider: number,
  designStyle: object,
  outline: array,
  slides: array,
  createdAt: timestamp
}
```

---

## 📝 License

This project is licensed under the MIT License.

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for effortless presentations**
