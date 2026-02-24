import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Particles configuration
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const particleCount = Math.min(Math.floor(width * 0.05), 60);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2, // Slower movement
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
      });
    }

    // Code Snippets for "Programming Vibe"
    const snippets = [
      "public function handle()", 
      "const socket = io()", 
      "docker-compose up -d", 
      "SELECT * FROM users LIMIT 10", 
      "git push origin master", 
      "npm run build", 
      "if (err) throw err;", 
      "return response()->json()", 
      "System.out.println()", 
      "while(true) {", 
      "await new Promise()", 
      "chmod +x script.sh",
      "import { useState } from 'react'",
      "class User extends Model",
      "GET /api/v1/status 200 OK"
    ];
    
    const codeFloaters: { x: number; y: number; text: string; speed: number; opacity: number }[] = [];
    const codeCount = Math.floor(width / 150); // density based on width
    
    for(let i=0; i<codeCount; i++) {
        codeFloaters.push({
            x: Math.random() * width,
            y: Math.random() * height,
            text: snippets[Math.floor(Math.random() * snippets.length)],
            speed: 0.2 + Math.random() * 0.3,
            opacity: 0.1 + Math.random() * 0.2
        });
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // --- Draw Code Snippets (Background Layer) ---
      ctx.font = '10px "Fira Code", monospace';
      codeFloaters.forEach(c => {
          c.y -= c.speed;
          // Reset when off screen
          if (c.y < -20) {
              c.y = height + 20;
              c.x = Math.random() * width;
              c.text = snippets[Math.floor(Math.random() * snippets.length)];
          }
          ctx.fillStyle = `rgba(16, 185, 129, ${c.opacity * 0.4})`; // Very faint green
          ctx.fillText(c.text, c.x, c.y);
      });

      // --- Draw Particles (Network Layer) ---
      ctx.fillStyle = 'rgba(100, 116, 139, 0.4)';
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.12 - dist / 1000})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const imageUrl = "https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/475814978_2426201957737793_1461147166847129481_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFx9sri0jo3x6sTFqtX0lVzmYz5T9NZGW2ZjPlP01kZbVzr7fgaLWSVVK8G9gax0-6t7o1hNvgRDtVNqiwJHuQ8&_nc_ohc=hxGL27o97koQ7kNvwEDoQAT&_nc_oc=Adkn6_w-Ec9xhPaUYIp_EnV4ocsvkt0Sq-NCIr1WDorBlUYlid_Wqf_IXf0E892Cyl4&_nc_zt=23&_nc_ht=scontent.fdac134-1.fna&_nc_gid=efPaATf96jSNvdpe7xCmpA&oh=00_AfucrLcA_QbZ5AlkwRf5om7vPRTT_kUYGfmzQxQglZjFsw&oe=699BD32A";

  return (
    <>
      <style>{`
        @keyframes bg-glitch {
          0% { transform: translate(0,0); filter: hue-rotate(0deg) contrast(1); }
          5% { transform: translate(-2px, 1px); filter: hue-rotate(5deg) contrast(1.1); }
          10% { transform: translate(2px, -1px); filter: hue-rotate(-5deg) contrast(0.9); }
          15% { transform: translate(0,0); filter: hue-rotate(0deg) contrast(1); }
          50% { filter: opacity(0.8); }
          52% { filter: opacity(0.4); transform: scale(1.01); }
          54% { filter: opacity(0.8); transform: scale(1); }
          100% { transform: translate(0,0); filter: hue-rotate(0deg) contrast(1); }
        }
        .animate-bg-glitch {
          animation: bg-glitch 5s infinite step-end;
        }
      `}</style>
      
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-[-20] overflow-hidden pointer-events-none bg-[#050508]">
         {/* Main subtle image */}
         <div 
           className="absolute inset-0 bg-cover bg-center opacity-[0.15] animate-bg-glitch grayscale"
           style={{ backgroundImage: `url('${imageUrl}')` }}
         />
         {/* Second layer for glitch offset effect (chromatic aberration vibe) */}
         <div 
           className="absolute inset-0 bg-cover bg-center opacity-[0.05] animate-pulse mix-blend-color-dodge"
           style={{ 
               backgroundImage: `url('${imageUrl}')`,
               transform: 'translate(4px, 0)',
               filter: 'sepia(1) hue-rotate(180deg)'
           }}
         />
         {/* Dark overlay to ensure text readability */}
         <div className="absolute inset-0 bg-gradient-to-b from-term-bg/80 via-term-bg/90 to-term-bg/95"></div>
      </div>

      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full z-[-10] pointer-events-none"
      />
    </>
  );
};

export default Background;