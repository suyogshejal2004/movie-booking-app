
# 🎬 MovieFlix – React Native Movie Booking App  
![Status](https://img.shields.io/badge/status-under_development-orange?style=for-the-badge&logo=react)

> A modern, full-featured movie booking app built with **React Native** and **Firebase**, offering an immersive, end-to-end user experience — from discovering trending movies to booking tickets and completing payments via UPI.

<!-- <p align="center">
  <img alt="MovieFlix Banner" src="https://via.placeholder.com/1200x400.png/121011/EB2F3D?text=MovieFlix+App" />
</p> -->

---
## 📸 App Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/f637b239-65b8-44fc-97de-38379e0309b3" width="250" />
  <img src="https://github.com/user-attachments/assets/e10dc408-70ec-4b51-8517-27b3906ae691" width="250" />
  <img src="https://github.com/user-attachments/assets/a969768f-229a-4ee2-b663-0878ab68638e" width="250" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ca72c338-a323-448a-ab5d-5141505dcd30" width="250" />
  <img src="https://github.com/user-attachments/assets/87510504-b07e-4110-be68-abfaf2d8e4cd" width="250" />
  <img src="https://github.com/user-attachments/assets/87061333-2135-430e-847d-d697455ec99c" width="250" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/68d89f6b-b404-4f37-891b-304387b8992d" width="250" />
  <img src="https://github.com/user-attachments/assets/69208962-8a47-4994-b8c6-5d2a6d7fa61e" width="250" />
  <img src="https://github.com/user-attachments/assets/12086196-ac98-41a1-bb4d-8bbb790a98e3" width="250" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/c11da01b-4aea-4ad6-9394-d477ffd57fb6" width="250" />
  <img src="https://github.com/user-attachments/assets/6d19b622-2958-4f93-88da-3bd75fdb4036" width="250" />
  <img src="https://github.com/user-attachments/assets/3d2e1deb-ace0-4c66-9fe9-ede37ec3dfad" width="250" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/cc38cc49-0d0b-4900-bf1a-b60dd7c1b9a4" width="250" />
  <img src="https://github.com/user-attachments/assets/11874999-a6ff-4788-8ceb-e55c1eb95f2a" width="250" />
  <img src="https://github.com/user-attachments/assets/c12b0b80-9519-4744-9616-ccea2832a22f" width="250" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/900e9e5f-6cdd-4233-b30d-e6a618fcb608" width="250" />
  <img src="https://github.com/user-attachments/assets/c05bdce9-2f78-4665-9e1f-63f802072b01" width="250" />
  <img src="https://github.com/user-attachments/assets/4d7c156b-4746-4ceb-9c95-d9e05b755779" width="250" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/a7b1a1d3-7f5c-4fbd-b8d0-f49d1c3694fc" width="250" />
  <img src="https://github.com/user-attachments/assets/ff21d20c-1bfc-4c46-a0fa-2ee6c5a56eb2" width="250" />
  <img src="https://github.com/user-attachments/assets/99bb1134-0300-405d-9e42-eb03a783ebbf" width="250" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/c8d7aedc-7d02-4c76-9138-51d9bab8f94a" width="250" />
  <img src="https://github.com/user-attachments/assets/ebfdf77c-8550-425e-b494-a6817d0d12e8" width="250" />
  <img src="https://github.com/user-attachments/assets/7e7c3355-f501-4f7e-ba0d-ffd4132fcf31" width="250" />
</p>

## ✨ Features Overview

### 🔐 Authentication & User Management
- **Firebase Authentication** (Email/Password, Google Sign-In, Phone OTP)
- Persistent login using `AsyncStorage`
- Profile completion check integrated with Firestore
- Seamless user session management on app launch

### 🧭 Navigation & Flow
- **React Navigation v7**
  - Onboarding → Login → Home → Details → Booking → Payment
- Conditional navigation based on authentication & profile completion
- Smooth transitions powered by `react-native-reanimated` and `react-native-screens`

### 🎬 Movie Discovery
- Integrated with the **OMDB API** for real-time movie data
- Dynamic carousels for trending and upcoming movies
- In-app **YouTube trailer playback**
- Powerful search and filtering system
- Genre-based recommendations

### 🎟️ Booking Experience
- Interactive **seat selection** screen
- Real-time ticket pricing
- Secure **UPI deep-link payments** (supports GPay, PhonePe, Paytm, etc.)
- Booking confirmation stored in **Firestore**

### 💅 UI / UX Highlights
- Premium **dark theme** using `react-native-linear-gradient`
- **Lottie animations** for splash, onboarding, and transitions
- Fully responsive layout using `react-native-responsive-ui`
- Crisp icons from `react-native-vector-icons`
- Toast notifications with `react-native-toast-message`

---

## 🧠 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React Native 0.80, React 19 |
| **Language** | TypeScript / JavaScript (ESNext) |
| **Navigation** | React Navigation (Stack + Bottom Tabs) |
| **Backend** | Firebase (Auth, Firestore, Storage) |
| **APIs** | OMDB Movie API |
| **UI/UX Libraries** | Lottie, Linear Gradient, Vector Icons |
| **State Management** | React Hooks (`useState`, `useEffect`) |
| **Networking** | Axios |
| **Storage** | AsyncStorage |
| **Animations** | Reanimated 3.x |

---
<p align="center">
  🚧 <b>Note:</b> MovieFlix is still under active development. Some features are incomplete or subject to change. 🚧
</p>



