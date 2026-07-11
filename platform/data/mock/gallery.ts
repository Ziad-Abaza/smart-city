export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  isPlaceholder: boolean;
  moduleId?: string;
}

export const galleryImages: GalleryImage[] = [
  { id: "img-charging-1", src: "/images/charging-area.jpg", alt: "Charging Area AI Camera System", isPlaceholder: false, moduleId: "charging-area" },
  { id: "img-charging-2", src: "/images/charging-area-2.png", alt: "Charging Area Details", isPlaceholder: false, moduleId: "charging-area" },
  { id: "img-chatbot", src: "/images/chatbot.png", alt: "BATU AI Assistant Interface", isPlaceholder: false, moduleId: "ai-assistant" },
  { id: "img-indoor", src: "/images/indoor-localization.png", alt: "Indoor Localization Map", isPlaceholder: false, moduleId: "indoor-localization" },
  { id: "img-parking", src: "/images/parking.jpg", alt: "Computer Vision Smart Parking", isPlaceholder: false, moduleId: "parking" },
  { id: "img-simulator", src: "/images/simulator.jpg", alt: "Physical Maquette Simulator", isPlaceholder: false, moduleId: "physical-maquette" },
  { id: "img-smart-car", src: "/images/smart-car.png", alt: "Smart Car Hybrid Navigation", isPlaceholder: false, moduleId: "smart-car" },
  { id: "img-smart-home-1", src: "/images/smart-home.jpg", alt: "Smart Home Subsystem", isPlaceholder: false, moduleId: "smart-home" },
  { id: "img-smart-home-2", src: "/images/smart-home-face-reg.png", alt: "Smart Home Face Recognition", isPlaceholder: false, moduleId: "smart-home" },
  { id: "img-smart-home-3", src: "/images/smart-home-voice-assistant-listining.jpeg", alt: "Voice Assistant Listening", isPlaceholder: false, moduleId: "smart-home" },
  { id: "img-smart-home-4", src: "/images/smart-home-voice-assistant-speking.jpeg", alt: "Voice Assistant Speaking", isPlaceholder: false, moduleId: "smart-home" },
  { id: "img-poster", src: "/images/smart-city-poster.jpg", alt: "Smart City 2026 Poster", isPlaceholder: false, moduleId: "physical-maquette" },
  { id: "img-team-1", src: "/images/dr.El-Gohary.jpg", alt: "Dr. El-Gohary", isPlaceholder: false },
  { id: "img-team-2", src: "/images/dr.osama(1).jpg", alt: "Dr. Osama", isPlaceholder: false },
  { id: "img-team-3", src: "/images/eng.fayoumi(1).png", alt: "Eng. Fayoumi", isPlaceholder: false },
  { id: "img-demo-camera", src: "/images/placeholders/camera-feed.jpg", alt: "Live Camera Feed", isPlaceholder: true }
];
