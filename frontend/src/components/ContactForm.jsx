import { useState } from 'react';
import axios from 'axios';

export default function ContactForm({ toEmail, className = "" }) {
    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!toEmail) {
            alert("This portfolio hasn't set up a contact email yet.");
            return;
        }
        setStatus('loading');
        try {
            await axios.post('https://4zxl3477-5000.inc1.devtunnels.ms/api/contact', {
                ...formData,
                toEmail
            });
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <form id="portfolio-contact-form" data-to-email={toEmail} onSubmit={handleSubmit} className={`w-full max-w-2xl mx-auto space-y-6 ${className}`}>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-on-surface mb-2" htmlFor="name">Name</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface" id="name" placeholder="Your Name" type="text" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-on-surface mb-2" htmlFor="email">Email</label>
                    <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface" id="email" placeholder="your@email.com" type="email" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-on-surface mb-2" htmlFor="message">Message</label>
                <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface resize-none" id="message" placeholder="How can I help you?" rows="5"></textarea>
            </div>
            {status === 'success' && <p className="text-green-600 font-medium text-center">Message sent successfully!</p>}
            {status === 'error' && <p className="text-red-600 font-medium text-center">Failed to send message. Please try again.</p>}
            <button disabled={status === 'loading'} className="w-full py-4 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50" type="submit">
                {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
