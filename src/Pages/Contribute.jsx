import React from 'react';
import { Github } from 'react-bootstrap-icons';

const contributors = [
    {
        name: 'Egehan (Main Developer)',
        contributions: 'Lead development of the project, implemented core features and architecture.',
        comment: 'I believe in the power of open-source software and the value of community-driven projects.',
        github: 'https://github.com/vastsea0',
        avatar: 'https://avatars.githubusercontent.com/u/144556903' 
    },
 
];

export default function ContributePage() {
    return (
        <div className='container mx-auto mt-5 text-center'>
            <h1 className='text-3xl font-bold mb-6'>Contribute / Katkıda Bulun</h1>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h5 className="text-xl font-semibold mb-4">Contribute / Katkıda Bulun</h5>
                <div className="text-left">
                    <p className="mb-4">
                        This project is an open-source and free software initiative. You can contribute by submitting issues, suggesting new features, or writing code to improve the project. 
                        We welcome all contributions, whether large or small, to make this project better for everyone.
                    </p>
                    <p className="mb-4">
                        Bu proje, açık kaynaklı ve özgür bir yazılım girişimidir. Hata bildirimleri yaparak, yeni özellikler önererek ya da projeyi iyileştirmek için kod yazarak katkıda bulunabilirsiniz.
                        Küçük ya da büyük, tüm katkılar bu projeyi herkes için daha iyi hale getirecektir.
                    </p>
                    <div className='mt-6 text-center justify-center'>
                        <a className='inline-flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300' target='_blank' href='https://github.com/vastsea0/translate-me/'>
                            <Github size={24} className='mr-2' />
                            Contribute on Github / Github Üzerinden Katkıda Bulun
                        </a>
                    </div>
                </div>
            </div>

            <h2 className='text-2xl font-bold mb-6'>Contributors</h2>
            <p>
                This project is maintained by the following contributors. Thank you for your hard work and dedication to this project.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           
                {contributors.map((contributor, index) => (
                    <div className="bg-white shadow-md rounded-lg p-6" key={index}>
                        <img 
                            src={contributor.avatar} 
                            alt={`${contributor.name}'s avatar`} 
                            className="w-24 h-24 rounded-full mx-auto mb-4" 
                            style={{ objectFit: 'cover' }}
                        />
                        <h5 className="text-xl font-semibold mb-2">{contributor.name}</h5>
                        <p className="text-left mb-2"><strong>Contributions:</strong> {contributor.contributions}</p>
                        <p className="text-left mb-4"><strong>Comment:</strong> "{contributor.comment}"</p>
                        <a href={contributor.github} target='_blank' rel='noopener noreferrer' className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300">
                            <Github size={20} className='mr-2' /> View GitHub Profile
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
