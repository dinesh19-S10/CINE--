

import { Movie, SeatStatus, Theater, Seat, User } from './types';

const generateSeatingLayout = (rows: number, cols: number): Seat[][] => {
    const layout: Seat[][] = [];
    for (let i = 0; i < rows; i++) {
        const row: Seat[] = [];
        for (let j = 0; j < cols; j++) {
            const seatNumber = `${String.fromCharCode(65 + i)}${j + 1}`;
            const isBooked = Math.random() < 0.2;
            row.push({
                id: seatNumber,
                number: seatNumber,
                status: isBooked ? SeatStatus.BOOKED : SeatStatus.AVAILABLE,
                price: i < 2 ? 250 : 150, // Premium seats
            });
        }
        layout.push(row);
    }
    return layout;
};

export const MOVIES: Movie[] = [
    {
        id: 1,
        title: { en: 'Echoes of the Void', ta: 'வெற்றிடத்தின் எதிரொலிகள்' },
        posterUrl: 'https://image.tmdb.org/t/p/w500/AdKA2d3pZp0qgS5gPUw7pGfP2L.jpg',
        genre: 'Sci-Fi, Thriller',
        rating: 8.7,
        synopsis: {
            en: 'A lone astronaut on a deep space mission discovers a mysterious signal that could be the key to humanity\'s survival, but it might also be a harbinger of its doom.',
            ta: 'ஆழ்ந்த விண்வெளிப் பயணத்தில் ஒரு தனி விண்வெளி வீரர், மனிதகுலத்தின் உயிர்வாழ்வதற்கான திறவுகோலாக இருக்கக்கூடிய ஒரு மர்மமான சிக்னலைக் கண்டுபிடிக்கிறார், ஆனால் அது அதன் அழிவின் முன்னோடியாகவும் இருக்கலாம்.',
        },
        showtimes: [
            { id: 101, time: '10:00 AM', screen: 1, seating: generateSeatingLayout(6, 8) },
            { id: 102, time: '02:30 PM', screen: 3, seating: generateSeatingLayout(8, 10) },
            { id: 103, time: '07:00 PM', screen: 1, seating: generateSeatingLayout(6, 8) },
        ],
    },
    {
        id: 2,
        title: { en: 'The Crimson Cipher', ta: 'தி கிரிம்சன் சைஃபர்' },
        posterUrl: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftloC9jhhO5dsuevyp.jpg',
        genre: 'Mystery, Action',
        rating: 9.1,
        synopsis: {
            en: 'A brilliant cryptographer is entangled in a web of international espionage when she deciphers an ancient code that reveals a global conspiracy.',
            ta: 'ஒரு புத்திசாலித்தனமான கிரிப்டோகிராஃபர் ஒரு உலகளாவிய சதியை வெளிப்படுத்தும் ஒரு பழங்காலக் குறியீட்டைப் புரிந்துகொள்ளும்போது சர்வதேச உளவுத்துறையின் வலையில் சிக்கிக் கொள்கிறார்.',
        },
        showtimes: [
            { id: 201, time: '11:00 AM', screen: 2, seating: generateSeatingLayout(7, 9) },
            { id: 202, time: '03:00 PM', screen: 2, seating: generateSeatingLayout(7, 9) },
            { id: 203, time: '09:00 PM', screen: 4, seating: generateSeatingLayout(5, 7) },
        ],
    },
    {
        id: 3,
        title: { en: 'Jungle Fury', ta: 'ஜங்கிள் ப்யூரி' },
        posterUrl: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
        genre: 'Adventure, Family',
        rating: 7.9,
        synopsis: {
            en: 'A group of brave animals must band together to protect their home from a ruthless poacher who threatens the balance of their ecosystem.',
            ta: 'தங்கள் சுற்றுச்சூழல் அமைப்பின் சமநிலையை அச்சுறுத்தும் ஒரு இரக்கமற்ற வேட்டைக்காரனிடமிருந்து தங்கள் வீட்டைப் பாதுகாக்க ஒரு துணிச்சலான விலங்குகள் குழு ஒன்று சேர வேண்டும்.',
        },
        showtimes: [
            { id: 301, time: '09:30 AM', screen: 5, seating: generateSeatingLayout(8, 8) },
            { id: 302, time: '12:30 PM', screen: 5, seating: generateSeatingLayout(8, 8) },
        ],
    },
    {
        id: 4,
        title: { en: 'Cybernetic Serenade', ta: 'சைபர்நெடிக் செரினேட்' },
        posterUrl: 'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YCl0MjlCnY1a4GceO.jpg',
        genre: 'Romance, Sci-Fi',
        rating: 8.2,
        synopsis: {
            en: 'In a futuristic city, a human falls in love with an advanced AI, challenging societal norms and the very definition of consciousness.',
            ta: 'ஒரு எதிர்கால நகரத்தில், ஒரு மனிதன் ஒரு மேம்பட்ட AI உடன் காதலில் விழுகிறான், இது சமூக நெறிகளையும் உணர்வின் வரையறையையும் கேள்விக்குள்ளாக்குகிறது.',
        },
        showtimes: [
            { id: 401, time: '01:00 PM', screen: 3, seating: generateSeatingLayout(8, 10) },
            { id: 402, time: '06:00 PM', screen: 3, seating: generateSeatingLayout(8, 10) },
        ],
    },
    {
        id: 5,
        title: { en: 'The Last Heirloom', ta: 'கடைசி வாரிசு' },
        posterUrl: 'https://image.tmdb.org/t/p/w500/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg',
        genre: 'Drama, History',
        rating: 8.5,
        synopsis: {
            en: 'A young historian uncovers a family secret that leads her on a quest across continents to find a long-lost artifact of immense cultural significance.',
            ta: 'ஒரு இளம் வரலாற்றாசிரியர் ஒரு குடும்ப ரகசியத்தை வெளிக்கொணர்கிறார், இது மகத்தான கலாச்சார முக்கியத்துவம் வாய்ந்த நீண்டகாலமாக இழந்த ஒரு கலைப்பொருளைக் கண்டுபிடிக்க கண்டங்கள் முழுவதும் ஒரு தேடலுக்கு அவளை வழிநடத்துகிறது.',
        },
        showtimes: [
            { id: 501, time: '04:00 PM', screen: 4, seating: generateSeatingLayout(5, 7) },
            { id: 502, time: '08:00 PM', screen: 2, seating: generateSeatingLayout(7, 9) },
        ],
    }
];

export const THEATERS: Theater[] = [
    { id: 1, name: 'CineSphere Multiplex' },
    { id: 2, name: 'Galaxy Cinemas' },
    { id: 3, name: 'Regal Screens' },
    { id: 4, name: 'StarLight Drive-In' },
    { id: 5, name: 'Metro Grand' },
    { id: 6, name: 'Nexus Cinema Palace' },
];

export const CITIES_WITH_THEATERS: Record<string, Theater[]> = {
    'Chennai': [THEATERS[0], THEATERS[2], THEATERS[4]],
    'Coimbatore': [THEATERS[1], THEATERS[5]],
    'Madurai': [THEATERS[3]],
};

export const ADMIN_USER = {
    email: 'admin@admin.com',
    password: 'admin123'
};