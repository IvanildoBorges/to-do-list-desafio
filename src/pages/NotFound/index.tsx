import React, { useEffect, useRef, useState } from 'react';

const NotFound: React.FC = () => {
    const [animateWave, setAnimateWave] = useState(false); // Controla a animação da onda
    const ballRef = useRef<HTMLDivElement>(null); // Referência para a bolinha
    const waveRef = useRef<HTMLDivElement>(null); // Referência para o efeito da onda

    useEffect(() => {
        if (ballRef.current) {
            const ball = ballRef.current;

            // Adiciona um evento de "animationend" para detectar o fim da animação da bolinha
            ball.addEventListener('animationiteration', () => {
                // Quando a bolinha termina um ciclo de quique, dispara a animação da onda
                setAnimateWave(true);
                
                // Reseta a animação da onda depois de 0.7s
                setTimeout(() => setAnimateWave(false), 700); 
            });

            return () => {
                ball.removeEventListener('animationiteration', () => {}); // Limpeza do evento
            };
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#191025] text-white text-center">
            <h1 className="text-4xl font-semibold mb-4">Ops! Página não encontrada 😅</h1>
            <p className="text-lg mb-6 text-gray-400">Parece que você se perdeu. A página que você está procurando não existe.</p>
            <div className="w-24 h-24 relative">
                {/* Bolinha que "quica" */}
                <div
                    ref={ballRef}
                    className="w-12 h-12 bg-[var(--terciaria)] rounded-full absolute top-1/1 left-1/2 transform -translate-x-1/2 -translate-y-9 animate-bounce"
                    style={{
                        animationDuration: "1s",
                    }}
                ></div>

                {/* Efeito de onda se propagando */}
                {animateWave && (
                    <div
                        ref={waveRef}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 bg-[var(--terciaria)] opacity-50 rounded-full"
                        style={{
                            animation: "ping .7s ease-in-out forwards",
                            transformOrigin: 'center',
                        }}
                    ></div>
                )}
            </div>

            <style>{`
                @keyframes ping {
                    0% {
                        transform: scaleX(0.1) scaleY(0.1) translateY(0);
                        opacity: 0.5;
                        width: 0;
                        height: 0;
                    }
                    100% {
                        transform: scaleX(2.5) scaleY(0.5) translateY(0);
                        opacity: 0;
                        width: 100px;  /* Largura final da elipse */
                        height: 50px;  /* Altura final da elipse */
                    }
                }
            `}</style>
        </div>
    );
};

export default NotFound;
