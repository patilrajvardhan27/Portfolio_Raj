"use client";

import { AsciiNoiseEffect } from "@/components/ui/ascii-background";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProjectsAnimated } from "@/components/sections/projects-animated";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background Effect */}
      <div className="fixed inset-0 z-0">
        <AsciiNoiseEffect
          noiseStrength={0.14}
          noiseScale={0.008}
          speed={0.13}
          cell={16}
          bw={false}
          charset={1}
          tint={[0.6979483482126827, 0.3, 0.8446940142134371]}
          distortAmp={1.37}
          frequency={10.16}
          zRate={0.032}
          brightness={0.94}
          contrast={0.69}
          seed1={6.426662918006471}
          seed2={2.6559044835663537}
          hue={109.4}
          sat={1.86}
          gamma={0.9}
          vignette={0.67}
          vignetteSoftness={0.6}
          glyphSharpness={0.164}
          bg={[0.025723619244668972, 0.065606785712755, 0.03855021617457426]}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <ProjectsAnimated />
        <Footer />
      </div>
    </main>
  );
}
