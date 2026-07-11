export interface Module {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  images: string[];
  docsPaths: string[];
  sourcePaths: string[];
  has3DModel: boolean;
}

export const modules: Module[] = [
  {
    id: "smart-car",
    title: "Smart Car",
    summary: "Hybrid Autonomous Navigation and Contextual Decision-Making system featuring deep learning-based behavioral cloning, ArUco marker detection, and a comprehensive autonomous mission framework running on a Raspberry Pi 5.",
    stack: ["Raspberry Pi 5", "Python", "Deep Learning", "OpenCV", "ArUco"],
    images: ["/images/smart-car.png"],
    docsPaths: ["/docs/smart-car"],
    sourcePaths: ["/repo-explorer?path=Code/smart-car"],
    has3DModel: false,
  },
  {
    id: "smart-home",
    title: "Smart Home",
    summary: "Intelligent Smart Home Subsystem Architecture incorporating an advanced voice assistant and facial recognition capabilities, engineered to enhance residential automation and security.",
    stack: ["Voice Assistant", "Face Recognition", "Python", "Arduino"],
    images: ["/images/smart-home.jpg", "/images/smart-home-face-reg.png", "/images/smart-home-voice-assistant-listining.jpeg", "/images/smart-home-voice-assistant-speking.jpeg"],
    docsPaths: ["/docs/smart-home"],
    sourcePaths: ["/repo-explorer?path=Code/smart-home"],
    has3DModel: true,
  },
  {
    id: "indoor-localization",
    title: "Indoor Localization",
    summary: "Wi-Fi RSSI-Based Indoor Localization System utilizing ESP32 firmware and a Flask server to construct precise fingerprinting maps for indoor navigation and tracking.",
    stack: ["ESP32", "C++", "Python", "Flask", "Wi-Fi RSSI"],
    images: ["/images/indoor-localization.png"],
    docsPaths: ["/docs/indoor-localization"],
    sourcePaths: ["/repo-explorer?path=Code/indoor-localization"],
    has3DModel: false,
  },
  {
    id: "parking",
    title: "Smart Parking",
    summary: "Computer Vision-Based Smart Parking System leveraging YOLO and OpenCV to provide real-time occupancy detection and efficient parking slot management.",
    stack: ["YOLO", "OpenCV", "Python", "Computer Vision"],
    images: ["/images/parking.jpg"],
    docsPaths: ["/docs/parking"],
    sourcePaths: ["/repo-explorer?path=Code/parking"],
    has3DModel: false,
  },
  {
    id: "charging-area",
    title: "Charging Area",
    summary: "AI-Driven Autonomous Charging Station System featuring a YOLO classification model for efficient energy management and autonomous vehicle docking.",
    stack: ["YOLO", "Deep Learning", "Computer Vision", "Python"],
    images: ["/images/charging-area.jpg", "/images/charging-area-2.png"],
    docsPaths: ["/docs/charging-area"],
    sourcePaths: ["/repo-explorer?path=Code/charging-area"],
    has3DModel: true,
  },
  {
    id: "ai-assistant",
    title: "AI Assistant (Chatbot)",
    summary: "BATU AI Assistant, a production-grade Retrieval-Augmented Generation (RAG) system providing intelligent querying and city-wide administrative assistance via a robust TypeScript/Node backend.",
    stack: ["TypeScript", "Node.js", "RAG", "Docker", "LLM"],
    images: ["/images/chatbot.png"],
    docsPaths: ["/docs/chatbot"],
    sourcePaths: ["/repo-explorer?path=Code/chatbot"],
    has3DModel: false,
  },
  {
    id: "physical-maquette",
    title: "Physical Maquette & Digital Twin",
    summary: "Physical Maquette Engineering & Architectural Aesthetics representing the tangible scaled model of the Smart City, acting as the foundation for the digital twin visualization.",
    stack: ["Architecture", "3D Modeling", "Hardware"],
    images: ["/images/simulator.jpg", "/images/smart-city-poster.jpg"],
    docsPaths: ["/docs/design"],
    sourcePaths: [],
    has3DModel: false,
  },
  {
    id: "web-platform",
    title: "Web Platform & Control Center",
    summary: "Centralized Smart City Web Platform and Command Control Dashboard serving as the unified interface for system monitoring, telemetry visualization, and documentation access.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React Three Fiber"],
    images: [],
    docsPaths: ["/docs/web-platform"],
    sourcePaths: ["/repo-explorer?path=platform"],
    has3DModel: false,
  }
];
