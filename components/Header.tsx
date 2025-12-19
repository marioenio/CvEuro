import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
                Gerador de Currículo Padrão Europeu
            </h1>
            <p className="mt-2 text-lg text-gray-600">
                Crie um currículo otimizado para vagas na Europa.
            </p>
        </header>
    );
};

export default Header;