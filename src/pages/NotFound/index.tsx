import React from 'react';
import Loading from '../../components/Loading';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#191025] text-white text-center">
            <h1 className="text-4xl font-semibold mb-4">Ops! Página não encontrada 😅</h1>
            <p className="text-lg mb-6 text-gray-400">Parece que você se perdeu. A página que você está procurando não existe.</p>
            <Loading />
        </div>
    );
};

export default NotFound;
