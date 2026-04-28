import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Heart, 
  Globe, 
  Mail, 
  Trash2, 
  Plus, 
  Minus,
  CheckCircle,
  Moon,
  Sun
} from 'lucide-react';

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);

const DropletsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.8 4-4 0-3.3-4-6-4-6s-4 2.7-4 6c0 2.2 1.8 4 4 4Z"/><path d="M17 16.3c2.2 0 4-1.8 4-4 0-3.3-4-6-4-6s-4 2.7-4 6c0 2.2 1.8 4 4 4Z"/><path d="M12 10s3-2.5 3-4.5c0-1.4-1.1-2.5-2.5-2.5S10 4.1 10 5.5c0 2 2 4.5 2 4.5Z"/></svg>
);

const SocialIcon = ({ type }) => {
  if (type === 'instagram') return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
  if (type === 'facebook') return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Shopping & Wishlist State
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme apply
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- Logic ---
  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = parseInt(item.price.replace('$', ''));
    return total + (price * item.qty);
  }, 0);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      e.target.reset();
      setTimeout(() => setFormStatus(null), 5000);
    }, 1500);
  };

  // --- Layout Components ---
  const Navigation = () => (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled || currentPage !== 'home' 
      ? 'bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-md shadow-sm py-4' 
      : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => setCurrentPage('home')} className="text-2xl font-serif font-bold text-[#4A1C40] dark:text-[#E8B4B8] tracking-tighter">
          LUMINA <span className="font-light italic text-[#E8B4B8] dark:text-white">BEAUTY</span>
        </button>

        {/* Top Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Shop', 'Skincare', 'Makeup', 'Ingredients', 'Contact'].map(item => (
            <button 
              key={item} 
              onClick={() => setCurrentPage(item.toLowerCase())}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                currentPage === item.toLowerCase() 
                ? 'text-[#E8B4B8]' 
                : 'text-[#4A1C40] dark:text-gray-300 hover:text-[#E8B4B8]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2 text-[#4A1C40] dark:text-[#E8B4B8] hover:bg-black/5 dark:hover:bg-white/5 rounded-full"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button onClick={() => setCurrentPage('wishlist')} className="p-2 relative">
            <Heart size={20} className={wishlist.length > 0 ? 'fill-[#E8B4B8] text-[#E8B4B8]' : 'text-[#4A1C40] dark:text-gray-300'} />
            {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-[#4A1C40] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">{wishlist.length}</span>}
          </button>
          
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <ShoppingBag size={20} className="text-[#4A1C40] dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 bg-[#E8B4B8] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">{cart.length}</span>
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#121212] text-gray-100' : 'bg-[#FFFDFB] text-[#2B2B2B]'} font-sans selection:bg-[#E8B4B8]/30`}>
      <Navigation />

      {/* Main Content */}
      <main>
        {currentPage === 'home' && (
          <section className="h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1596462502278-27bfad45f1f6?w=1600')] bg-cover bg-center" />
            <div className="relative text-center px-6 max-w-4xl">
              <div className="flex justify-center items-center gap-2 mb-6">
                <SparklesIcon />
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#4A1C40] dark:text-[#E8B4B8]">The Essence of Luxury</p>
                <SparklesIcon />
              </div>
              <h1 className="text-6xl md:text-8xl font-serif text-[#4A1C40] dark:text-white mb-10 leading-tight">
                Reveal Your <br /><span className="italic font-light text-[#E8B4B8]">Soul's Glow</span>
              </h1>
              <button onClick={() => setCurrentPage('shop')} className="bg-[#4A1C40] dark:bg-[#E8B4B8] text-white dark:text-[#121212] px-12 py-5 rounded-full font-bold hover:scale-105 transition-all shadow-2xl">
                Shop the Collection
              </button>
            </div>
          </section>
        )}

        {(currentPage === 'shop' || currentPage === 'skincare' || currentPage === 'makeup') && (
          <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-5xl font-serif text-[#4A1C40] dark:text-[#E8B4B8] mb-12 capitalize text-center">{currentPage === 'shop' ? 'All Products' : currentPage}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { id: 1, name: "Radiance Rose Serum", price: "$84", type: "skincare", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600" },
                { id: 2, name: "Velvet Matte Lip", price: "$32", type: "makeup", img: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=600" },
                { id: 3, name: "Silk Touch Foundation", price: "$65", type: "makeup", img: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?w=600" },
                { id: 4, name: "Rose Water Cleanser", price: "$42", type: "skincare", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600" },
                { id: 5, name: "Night Repair Cream", price: "$98", type: "skincare", img: "https://images.unsplash.com/photo-1570197788417-0e93323c93bf?w=600" },
                { id: 6, name: "Lumina Glow Oil", price: "$55", type: "skincare", img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600" }
              ].filter(p => currentPage === 'shop' || p.type === currentPage).map(p => (
                <div key={p.id} className="group">
                  <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900 mb-6 relative shadow-sm border border-gray-100 dark:border-zinc-800">
                    <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.name} />
                    <button onClick={() => toggleWishlist(p)} className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-black/50 backdrop-blur rounded-full shadow-md">
                      <Heart size={18} className={wishlist.find(w => w.id === p.id) ? 'fill-red-400 text-red-400' : 'text-gray-400'} />
                    </button>
                  </div>
                  <div className="flex justify-between items-start px-2">
                    <div>
                      <h3 className="font-serif text-xl text-[#4A1C40] dark:text-white">{p.name}</h3>
                      <p className="text-[#E8B4B8] font-bold mt-1">{p.price}</p>
                    </div>
                    <button onClick={() => addToCart(p)} className="bg-[#4A1C40] dark:bg-[#E8B4B8] text-white dark:text-[#121212] p-3 rounded-2xl hover:opacity-80 transition-all">
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-6xl font-serif text-[#4A1C40] dark:text-[#E8B4B8] mb-8">Contact Us</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">Koi bhi sawal ho toh humein batayein.</p>
                <div className="space-y-6">
                  <div className="flex gap-4 items-center text-gray-600 dark:text-gray-300"><Mail className="text-[#E8B4B8]" /> hello@luminabeauty.com</div>
                  <div className="flex gap-4 items-center text-gray-600 dark:text-gray-300"><Globe className="text-[#E8B4B8]" /> Paris, France</div>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] shadow-xl border border-gray-50 dark:border-zinc-800">
                {formStatus === 'success' ? (
                  <div className="text-center py-12">
                    <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#4A1C40] dark:text-white">Shukriya!</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Aapka message mil gaya hai.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <input required type="text" placeholder="Aapka Naam" className="w-full p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl outline-none border border-transparent focus:border-[#E8B4B8] dark:text-white" />
                    <input required type="email" placeholder="Email" className="w-full p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl outline-none border border-transparent focus:border-[#E8B4B8] dark:text-white" />
                    <textarea required rows="4" placeholder="Aapka Message" className="w-full p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl outline-none border border-transparent focus:border-[#E8B4B8] dark:text-white"></textarea>
                    <button type="submit" className="w-full bg-[#4A1C40] dark:bg-[#E8B4B8] text-white dark:text-[#121212] py-4 rounded-full font-bold transition-all hover:opacity-90">
                      {formStatus === 'sending' ? 'Processing...' : 'Submit Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'ingredients' && (
          <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
            <div className="flex justify-center text-[#E8B4B8]"><DropletsIcon /></div>
            <h2 className="text-5xl font-serif text-[#4A1C40] dark:text-white mb-6 mt-8">Purity Redefined</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-16">100% natural aur safe components.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {['Organic Rosehip', 'Pure Hyaluronic', 'Cold-Pressed Oils', 'Plant Squalane'].map(item => (
                <div key={item} className="p-8 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-50 dark:border-zinc-800 shadow-sm">
                  <h4 className="text-xl font-bold text-[#4A1C40] dark:text-[#E8B4B8]">{item}</h4>
                  <p className="text-sm text-gray-400 mt-2">Natural extracts for radiant skin.</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'wishlist' && (
          <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[60vh]">
            <h2 className="text-4xl font-serif text-[#4A1C40] dark:text-white mb-10">Your Wishlist</h2>
            {wishlist.length === 0 ? <p className="text-gray-400 text-center py-20 italic">Wishlist is empty.</p> : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {wishlist.map(p => (
                  <div key={p.id} className="relative bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-sm">
                    <img src={p.img} className="rounded-2xl h-48 w-full object-cover" alt={p.name} />
                    <h4 className="mt-4 font-bold text-sm text-[#4A1C40] dark:text-white">{p.name}</h4>
                    <button onClick={() => toggleWishlist(p)} className="text-red-400 text-xs mt-1 underline">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isCartOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsCartOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-[#1A1A1A] shadow-2xl transition-transform duration-500 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
          <div className="p-6 border-b dark:border-zinc-800 flex justify-between items-center bg-[#FFF8F5] dark:bg-zinc-900">
            <h2 className="text-2xl font-serif text-[#4A1C40] dark:text-[#E8B4B8]">Your Bag</h2>
            <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform dark:text-white"><X size={24} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag size={48} className="mx-auto text-gray-200 dark:text-zinc-700 mb-4" />
                <p className="text-gray-400 mb-6">Aapka cart khaali hai.</p>
                <button onClick={() => {setIsCartOpen(false); setCurrentPage('shop');}} className="bg-[#4A1C40] dark:bg-[#E8B4B8] text-white dark:text-[#121212] px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest">Shop Now</button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-3xl shadow-sm">
                  <div className="w-20 h-24 rounded-2xl overflow-hidden bg-gray-50">
                    <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-[#4A1C40] dark:text-white text-sm">{item.name}</h4>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                    <p className="text-[#E8B4B8] font-bold text-sm mt-1">{item.price}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 border dark:border-zinc-700 rounded-full flex items-center justify-center text-gray-400"><Minus size={12} /></button>
                      <span className="text-sm font-bold dark:text-white">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 border dark:border-zinc-700 rounded-full flex items-center justify-center text-gray-400"><Plus size={12} /></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="p-6 border-t dark:border-zinc-800 bg-[#FFFDFB] dark:bg-zinc-900">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500">Total:</span>
                <span className="text-2xl font-serif font-bold text-[#4A1C40] dark:text-[#E8B4B8]">${cartTotal}</span>
              </div>
              <button className="w-full bg-[#4A1C40] dark:bg-[#E8B4B8] text-white dark:text-[#121212] py-4 rounded-full font-bold shadow-lg transition-all hover:opacity-90">Checkout Now</button>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-[#4A1C40] dark:bg-black text-white py-16 px-6 rounded-t-[3rem] mt-20">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-4">LUMINA BEAUTY</h2>
            <p className="opacity-60 text-sm mb-10 italic">Paris • London • New York</p>
            <div className="flex justify-center gap-6">
                <button className="opacity-70 hover:opacity-100 hover:text-[#E8B4B8]"><SocialIcon type="instagram" /></button>
                <button className="opacity-70 hover:opacity-100 hover:text-[#E8B4B8]"><SocialIcon type="facebook" /></button>
                <button className="opacity-70 hover:opacity-100 hover:text-[#E8B4B8]"><SocialIcon type="twitter" /></button>
            </div>
            <p className="mt-12 text-[10px] opacity-40 uppercase tracking-widest">&copy; 2024 Lumina Beauty Luxury. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default App;