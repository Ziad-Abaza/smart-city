import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { TelemetryWidget } from "@/components/dashboard/TelemetryWidget"
import { CameraFeed } from "@/components/dashboard/CameraFeed"
import { SystemStatus } from "@/components/dashboard/SystemStatus"
import { MapOverlay } from "@/components/dashboard/MapOverlay"
import { FadeInView } from "@/components/shared/FadeInView"

export default function ControlCenterPage() {
  return (
    <div className="min-h-screen bg-[#06080A] p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        <FadeInView>
          <DashboardHeader />
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <FadeInView delay={0.1}>
            <TelemetryWidget title="Total Power Draw" value={142} unit="W" trend="stable" />
          </FadeInView>
          <FadeInView delay={0.15}>
            <TelemetryWidget title="Active Parking Spots" value={2} unit="/ 4" trend="-1 since last hr" status="warning" />
          </FadeInView>
          <FadeInView delay={0.2}>
            <TelemetryWidget title="Indoor Temp (Avg)" value={23.4} unit="°C" trend="normal" />
          </FadeInView>
          <FadeInView delay={0.25}>
            <TelemetryWidget title="Network Latency" value={18} unit="ms" trend="peak performance" />
          </FadeInView>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <FadeInView delay={0.3} className="h-[400px]">
              <MapOverlay />
            </FadeInView>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[250px]">
              <FadeInView delay={0.4} className="h-full">
                <CameraFeed title="Parking Cam (YOLO)" id="CAM-01" />
              </FadeInView>
              <FadeInView delay={0.45} className="h-full">
                <CameraFeed title="Street View Cam" id="CAM-02" />
              </FadeInView>
            </div>
          </div>
          
          <div className="lg:col-span-1 flex flex-col gap-4">
            <FadeInView delay={0.35} className="flex-1">
              <SystemStatus />
            </FadeInView>
            <FadeInView delay={0.5} className="h-[250px]">
              <TelemetryWidget 
                title="AI Inference Rate" 
                value={24.5} 
                unit="fps" 
                trend="running optimal YOLOv8" 
              />
            </FadeInView>
          </div>
        </div>
      </div>
    </div>
  )
}
