
import React, { useState, useMemo } from 'react';
import { Seat } from '../types';

interface PaymentPageProps {
    selectedSeats: Seat[];
    onPaymentSuccess: () => void;
}

type PaymentMethod = 'gpay' | 'phonepe' | 'paytm' | 'upi_id' | 'netbanking' | 'card';
type CardFormErrors = {
    cardNumber?: string;
    cardName?: string;
    expiryDate?: string;
    cvv?: string;
};

const GooglePayIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M129.2,229.4H80.7V283h48.5c-4.1,30.3-25,52.3-48.5,52.3c-28.1,0-50.8-23.2-50.8-51.8s22.7-51.8,50.8-51.8 c14.2,0,25.5,5.1,33.9,12.5l29.8-28.7c-18.9-17.6-43.9-28.3-73.6-28.3c-60.5,0-109.4,49.2-109.4,110.1 c0,60.9,48.9,110.1,109.4,110.1c63.6,0,105.3-44.4,105.3-107.4c0-7.1-0.7-13.3-1.8-19.5L129.2,229.4z" fill="#5f6368"/><path d="m327.3,229.4v-42.3h-44.5v42.3h-31.2v39.3h31.2v91.8c0,23,12,34,31.7,34c9.1,0,18.4-1.8,22.8-3.1v-38.4 c-2.7,0.5-5.3,0.7-9.3,0.7c-5.8,0-10.9-2.3-10.9-7.8v-78.1h39.4v-39.3h-39.4z" fill="#5f6368"/><path d="M461.5,234.3c-15.3,0-26.2,9.3-30.8,16.1h-0.5v-14.6h-42.3v133.5h44.5v-70.5c0-19.1,10.9-29.3,25.9-29.3 c14.2,0,22.3,10.2,22.3,29.3v70.5h44.5v-80.1c0-29-20.9-44.8-53.1-44.8z" fill="#5f6368"/><path d="m133.5,108.3h44.5v39.3h-44.5z" fill="#34a853"/><path d="m202.6,108.3h44.5v39.3h-44.5z" fill="#fbbc04"/><path d="m271.6,108.3h44.5v39.3h-44.5z" fill="#ea4335"/><path d="M340.7,108.3h44.5v39.3h-44.5z" fill="#4285f4"/>
    </svg>
);

const PhonePeIcon: React.FC<{className?: string}> = ({className}) => (
     <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#6739B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
        <path d="M9 10h6"/>
        <path d="M9 14h3"/>
        <path d="M15 14h.01"/>
    </svg>
);

const PaytmIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#00b9f1">
        <path d="M12 2.5C6.2 2.5 1.5 7.2 1.5 13c0 2.2 1.1 4.7 2.6 6.3 0 .1.1.1.1.2.1.1.2.1.3.1h15c.1 0 .2 0 .3-.1.1-.1.1-.1.1-.2 1.5-1.6 2.6-4.1 2.6-6.3C22.5 7.2 17.8 2.5 12 2.5zm-5 8.9h4.1v1.3H7v3.5h5.4v-1.3H8.3v-1h4.1V10H7v1.4zm9.3 4.8h-1.8V10h1.8v6.2zm-2.8-3.4h-2.1v-1h5.8v1h-2.1v3.4h-1.6v-3.4z"/>
    </svg>
);

const CardIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zM20 18H4v-6h16v6zm0-10H4V6h16v2z"></path>
    </svg>
);


const PaymentPage: React.FC<PaymentPageProps> = ({ selectedSeats, onPaymentSuccess }) => {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    const [showQrFor, setShowQrFor] = useState<'gpay' | 'phonepe' | 'paytm' | null>(null);
    const [upiId, setUpiId] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardErrors, setCardErrors] = useState<CardFormErrors>({});

    const totalPrice = useMemo(() => {
        return selectedSeats.reduce((total, seat) => total + seat.price, 0);
    }, [selectedSeats]);

    const banks = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank"];

    const validateCardForm = (): boolean => {
        const errors: CardFormErrors = {};
        const rawCardNumber = cardNumber.replace(/\s/g, '');
        if (rawCardNumber.length !== 16) errors.cardNumber = 'Card number must be 16 digits.';
        if (cardName.trim().length < 3) errors.cardName = 'Cardholder name is required.';

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            errors.expiryDate = 'Invalid format. Use MM/YY.';
        } else {
            const [month, year] = expiryDate.split('/');
            const expiry = new Date(Number(`20${year}`), Number(month));
            const today = new Date();
            today.setMonth(today.getMonth() + 1);
            today.setDate(1);
            if (expiry < today) errors.expiryDate = 'Card has expired.';
        }

        if (cvv.length < 3 || cvv.length > 4) errors.cvv = 'CVV must be 3 or 4 digits.';
        
        setCardErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const handlePayment = () => {
        if (selectedMethod === 'card' && !validateCardForm()) {
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onPaymentSuccess();
        }, 2000);
    };

    const handleUpiAppSelect = (method: 'gpay' | 'phonepe' | 'paytm') => {
        setSelectedMethod(method);
        setShowQrFor(method);
    };

    const handleCancelQrScan = () => {
        setShowQrFor(null);
        setSelectedMethod(null);
    };
    
    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{1,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        return parts.length ? parts.join(' ') : value;
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/[^0-9]/gi, '').slice(0, 4);
        if (v.length >= 3) {
            return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
        }
        return v;
    };

    const isPayButtonDisabled = isLoading || !selectedMethod || 
        (selectedMethod === 'upi_id' && !upiId.includes('@')) || 
        (selectedMethod === 'netbanking' && !selectedBank);

    const PaymentOptionButton: React.FC<{
        method: 'gpay' | 'phonepe' | 'paytm';
        icon: React.ReactNode;
        label: string;
    }> = ({ method, icon, label }) => (
        <button
            onClick={() => handleUpiAppSelect(method)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedMethod === method ? 'border-[--color-accent] bg-[--color-accent]/10' : 'border-[--color-border] bg-[--color-bg-tertiary] hover:border-[--color-accent]/50'
            }`}
        >
            {icon}
            <span className={`mt-2 text-sm font-semibold ${selectedMethod === method ? 'text-[--color-accent]' : 'text-[--color-text-secondary]'}`}>{label}</span>
        </button>
    );

     const QrCodeDisplay: React.FC<{ method: 'gpay' | 'phonepe' | 'paytm' }> = ({ method }) => {
        const methodDetails = {
            gpay: { name: 'Google Pay', icon: <GooglePayIcon className="w-10 h-10" /> },
            phonepe: { name: 'PhonePe', icon: <PhonePeIcon className="w-10 h-10" /> },
            paytm: { name: 'Paytm', icon: <PaytmIcon className="w-10 h-10" /> },
        };

        const details = methodDetails[method];
        const qrData = `upi://pay?pa=cineverse@mockbank&pn=CineVerse&am=${totalPrice.toFixed(2)}&cu=INR&tn=MovieTicketBooking`;
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(qrData)}`;

        return (
            <div className="text-center bg-[--color-bg-tertiary] p-6 rounded-lg animate-fade-in">
                <div className="flex items-center justify-center gap-3 mb-4">
                    {details.icon}
                    <h3 className="text-xl font-bold text-[--color-text-primary]">Scan to Pay with {details.name}</h3>
                </div>
                <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
                    <img src={qrCodeUrl} alt={`QR Code for ${details.name}`} width="256" height="256" />
                </div>
                <p className="text-sm text-[--color-text-muted] mt-4">Scan the QR code using your {details.name} app to complete the payment of <strong className="text-[--color-success]">₹{totalPrice.toFixed(2)}</strong>.</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <button onClick={handleCancelQrScan} className="w-full bg-[--color-border] hover:bg-[--color-bg-tertiary] text-[--color-text-secondary] font-bold py-3 px-4 rounded-lg transition-colors">Cancel</button>
                    <button onClick={handlePayment} disabled={isLoading} className="w-full bg-[--color-success-darker] hover:bg-[--color-success-hover] text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:bg-gray-600">
                         {isLoading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                         {isLoading ? 'Processing...' : 'Simulate Payment Completion'}
                    </button>
                </div>
            </div>
        );
    };
    
    const FormField: React.FC<{name: string; label: string; error?: string; children: React.ReactNode}> = ({ name, label, error, children }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-[--color-text-secondary] mb-1">{label}</label>
            {children}
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto bg-[--color-bg-secondary] rounded-lg shadow-2xl p-6 md:p-8">
            <h2 className="text-3xl font-extrabold text-[--color-text-primary] text-center mb-2">Complete Your Payment</h2>
            <p className="text-center text-2xl font-bold text-[--color-success] mb-6">Total: ₹{totalPrice.toFixed(2)}</p>
            
            {showQrFor ? (
                <QrCodeDisplay method={showQrFor} />
            ) : (
                <>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-[--color-text-secondary] mb-3">Pay using UPI Apps</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <PaymentOptionButton method="gpay" icon={<GooglePayIcon className="w-10 h-10" />} label="Google Pay" />
                                <PaymentOptionButton method="phonepe" icon={<PhonePeIcon className="w-10 h-10" />} label="PhonePe" />
                                <PaymentOptionButton method="paytm" icon={<PaytmIcon className="w-10 h-10" />} label="Paytm" />
                            </div>
                        </div>

                        <div className="flex items-center"><div className="flex-grow border-t border-[--color-border]"></div><span className="flex-shrink mx-4 text-xs text-[--color-text-muted]">OR</span><div className="flex-grow border-t border-[--color-border]"></div></div>
                        
                         <div className={`p-4 rounded-lg border-2 transition-colors ${selectedMethod === 'card' ? 'border-[--color-accent] bg-[--color-accent]/5' : 'border-transparent'}`}>
                            <h3 className="text-lg font-semibold text-[--color-text-secondary] mb-3 flex items-center gap-2">
                                <CardIcon className="w-6 h-6" /> Credit / Debit Card
                            </h3>
                            <div className="space-y-3">
                                <FormField name="cardNumber" label="Card Number" error={cardErrors.cardNumber}>
                                    <input id="cardNumber" type="text" placeholder="0000 0000 0000 0000" value={cardNumber} onFocus={() => setSelectedMethod('card')} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} maxLength={19} className="w-full bg-[--color-bg-tertiary] border-2 border-[--color-border] rounded-md py-2 px-3 text-[--color-text-primary] focus:outline-none focus:ring-0 focus:border-[--color-accent] transition-colors"/>
                                </FormField>
                                <FormField name="cardName" label="Cardholder Name" error={cardErrors.cardName}>
                                    <input id="cardName" type="text" placeholder="John Doe" value={cardName} onFocus={() => setSelectedMethod('card')} onChange={(e) => setCardName(e.target.value)} className="w-full bg-[--color-bg-tertiary] border-2 border-[--color-border] rounded-md py-2 px-3 text-[--color-text-primary] focus:outline-none focus:ring-0 focus:border-[--color-accent] transition-colors"/>
                                </FormField>
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                         <FormField name="expiryDate" label="Expiry Date" error={cardErrors.expiryDate}>
                                            <input id="expiryDate" type="text" placeholder="MM/YY" value={expiryDate} onFocus={() => setSelectedMethod('card')} onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))} className="w-full bg-[--color-bg-tertiary] border-2 border-[--color-border] rounded-md py-2 px-3 text-[--color-text-primary] focus:outline-none focus:ring-0 focus:border-[--color-accent] transition-colors"/>
                                        </FormField>
                                    </div>
                                    <div className="w-1/2">
                                        <FormField name="cvv" label="CVV" error={cardErrors.cvv}>
                                            <input id="cvv" type="password" placeholder="123" value={cvv} onFocus={() => setSelectedMethod('card')} onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/gi, '').slice(0, 4))} maxLength={4} className="w-full bg-[--color-bg-tertiary] border-2 border-[--color-border] rounded-md py-2 px-3 text-[--color-text-primary] focus:outline-none focus:ring-0 focus:border-[--color-accent] transition-colors"/>
                                        </FormField>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="upi_id" className="block text-sm font-medium text-[--color-text-secondary] mb-1">UPI ID</label>
                            <input id="upi_id" type="text" value={upiId} onFocus={() => setSelectedMethod('upi_id')} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@bank" className={`w-full bg-[--color-bg-tertiary] border-2 rounded-md py-2 px-3 text-[--color-text-primary] focus:outline-none focus:ring-0 transition-colors ${selectedMethod === 'upi_id' ? 'border-[--color-accent]' : 'border-[--color-border]'}`}/>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[--color-text-secondary] mb-3">Net Banking</h3>
                            <select id="bank_select" value={selectedBank} onFocus={() => setSelectedMethod('netbanking')} onChange={(e) => setSelectedBank(e.target.value)} className={`w-full bg-[--color-bg-tertiary] border-2 rounded-md py-2 px-3 text-[--color-text-primary] focus:outline-none focus:ring-0 transition-colors ${selectedMethod === 'netbanking' ? 'border-[--color-accent]' : 'border-[--color-border]'}`}>
                                <option value="" disabled>-- Select Your Bank --</option>
                                {banks.map(bank => <option key={bank} value={bank} className="bg-[--color-bg-secondary] text-[--color-text-primary]">{bank}</option>)}
                            </select>
                        </div>
                    </div>

                     <div className="mt-8">
                        <button onClick={handlePayment} disabled={isPayButtonDisabled} className="w-full bg-[--color-success-darker] hover:bg-[--color-success-hover] text-white font-bold py-4 px-4 rounded-lg text-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {isLoading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                            {isLoading ? 'Processing...' : `Pay ₹${totalPrice.toFixed(2)}`}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentPage;
