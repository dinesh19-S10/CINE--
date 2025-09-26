
import { Language, LocalizedString } from '../types';

const translations: Record<string, LocalizedString> = {
    now_showing: { en: 'Now Showing', ta: 'இப்போது திரையிடப்படுகிறது' },
    now_showing_in: { en: 'in', ta: 'இல்' },
    get_ai_fun_fact: { en: 'Get AI Fun Fact', ta: 'AI வேடிக்கையான உண்மையைப் பெறுங்கள்' },
    thinking: { en: 'Thinking...', ta: 'சிந்திக்கிறது...' },
    gemini_generating_fact: { en: 'Gemini is generating a fun fact for you!', ta: 'ஜெமினி உங்களுக்காக ஒரு வேடிக்கையான உண்மையை உருவாக்குகிறார்!' },
    select_date: { en: 'Select Date', ta: 'தேதியைத் தேர்ந்தெடுக்கவும்' },
    showtimes: { en: 'Showtimes', ta: 'காட்சி நேரங்கள்' },
    available: { en: 'Available', ta: 'கிடைக்கிறது' },
    selected: { en: 'Selected', ta: 'தேர்ந்தெடுக்கப்பட்டது' },
    booked: { en: 'Booked', ta: 'பதிவு செய்யப்பட்டது' },
    screen: { en: 'Screen', ta: 'திரை' },
    screen_this_way: { en: 'Screen this way', ta: 'திரை இந்த வழியில்' },
    selected_seats: { en: 'Selected Seats', ta: 'தேர்ந்தெடுக்கப்பட்ட இருக்கைகள்' },
    total: { en: 'Total', ta: 'மொத்தம்' },
    confirm_selection: { en: 'Confirm Selection', ta: 'தேர்வை உறுதிப்படுத்தவும்' },
    booking_summary: { en: 'Booking Summary', ta: 'பதிவு சுருக்கம்' },
    review_selection: { en: 'Please review your selection before payment.', ta: 'பணம் செலுத்துவதற்கு முன் உங்கள் தேர்வை மதிப்பாய்வு செய்யவும்.' },
    time: { en: 'Time', ta: 'நேரம்' },
    date: { en: 'Date', ta: 'தேதி' },
    num_tickets: { en: 'Number of Tickets', ta: 'டிக்கெட்டுகளின் எண்ணிக்கை' },
    total_price: { en: 'Total Price', ta: 'மொத்த விலை' },
    confirm_proceed_payment: { en: 'Confirm & Proceed to Payment', ta: 'உறுதிசெய்து பணம் செலுத்த தொடரவும்' },
    select_theater: { en: 'Select a Theater', ta: 'ஒரு திரையரங்கைத் தேர்ந்தெடுக்கவும்' },
    welcome_to_cineverse: { en: 'Welcome to CineVerse', ta: 'சினிவர்ஸுக்கு வரவேற்கிறோம்' },
    select_login_type: { en: 'Please select your login type.', ta: 'உங்கள் உள்நுழைவு வகையைத் தேர்ந்தெடுக்கவும்.' },
    login_as_user: { en: 'Login as User', ta: 'பயனராக உள்நுழைக' },
    login_as_admin: { en: 'Login as Admin', ta: 'நிர்வாகியாக உள்நுழைக' },
};

export const t = (key: string, language: Language): string => {
    return translations[key]?.[language] || key;
};