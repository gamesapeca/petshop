import React, { useState, useEffect, useRef } from 'react';
import {
    Menu,
    X,
    Phone,
    MapPin,
    Instagram,
    Facebook,
    Star,
    Heart,
    Sparkles,
    PawPrint,
    Calendar,
    MessageCircle,
    Scissors,
    MessageSquare,
    Send,
    ShoppingBag
} from 'lucide-react';

// Componente Otimizado com Efeito Fish-eye Vertical
const FishEyeCards = () => {
    const cardsRef = useRef([]);

    useEffect(() => {
        let rafId;

        const handleScroll = () => {
            // Otimização: requestAnimationFrame para suavidade extrema
            rafId = requestAnimationFrame(() => {
                const centerScreen = window.innerHeight / 2;
                const maxDistance = window.innerHeight / 2.5; // Área de efeito do zoom

                cardsRef.current.forEach((card) => {
                    if (!card) return;

                    const rect = card.getBoundingClientRect();
                    const cardCenter = rect.top + (rect.height / 2);
                    const distance = Math.abs(centerScreen - cardCenter);

                    let scale = 0.85; // Escala base: 85% de largura

                    // Lógica do Zoom (Fish-eye)
                    if (distance < maxDistance) {
                        // Interpolação: 0 distância = 1.0x (100%) | maxDistance = 0.85x (85%)
                        const factor = 1 - (distance / maxDistance);
                        scale = 0.85 + (0.15 * factor); // Vai de 85% até 100% (zoom de 15%)
                    }

                    // Manipulação direta do DOM para performance (sem re-renders)
                    card.style.transform = `scale(${scale})`;
                });
            });
        };

        // Listener passivo para melhor performance de scroll
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Cálculo inicial

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const cards = [
        {
            icon: Sparkles,
            title: "Produtos Premium",
            desc: "Usamos apenas produtos de primeira linha"
        },
        {
            icon: Heart,
            title: "Muito Carinho",
            desc: "Tratamos seu pet com amor e cuidado"
        },
        {
            icon: PawPrint,
            title: "Resultados Incríveis",
            desc: "Seu pet sai sempre lindo e feliz"
        }
    ];

    return (
        <div className="grid md:grid-cols-3 gap-8 mt-12 mx-auto px-4">
            {cards.map((card, index) => (
                <div
                    key={index}
                    ref={el => cardsRef.current[index] = el}
                    className="w-full bg-white p-8 rounded-3xl shadow-lg text-center will-change-transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                >
                    <div className="w-20 h-20 bg-mary-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <card.icon className="w-10 h-10 text-mary-purple" />
                    </div>
                    <h3 className="text-3xl font-bold text-mary-purple mb-3">
                        {card.title}
                    </h3>
                    <p className="text-gray-600 text-lg">
                        {card.desc}
                    </p>
                </div>
            ))}
        </div>
    );
};

const ReviewCards = () => {
    const cardsRef = useRef([]);

    useEffect(() => {
        let rafId;
        const handleScroll = () => {
            rafId = requestAnimationFrame(() => {
                const centerScreen = window.innerHeight / 2;
                const maxDistance = window.innerHeight / 2;

                cardsRef.current.forEach((card) => {
                    if (!card) return;
                    const rect = card.getBoundingClientRect();
                    const cardCenter = rect.top + (rect.height / 2);
                    const distance = Math.abs(centerScreen - cardCenter);
                    let scale = 0.80; // Escala base: 80% de largura
                    if (distance < maxDistance) {
                        const factor = 1 - (distance / maxDistance);
                        scale = 0.80 + (0.10 * factor); // Vai de 80% até 90% (zoom de 10%)
                    }
                    card.style.transform = `scale(${scale})`;
                });
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const reviews = [
        {
            name: "Ana Clara",
            time: "Há 3 dias",
            text: "Simplesmente encantada! O cuidado que tiveram com meu Poodle foi excepcional. Ele voltou cheiroso e super tranquilo. A tosa na tesoura ficou perfeita!",
            rating: 5
        },
        {
            name: "Roberto Alves",
            time: "Há 1 semana",
            text: "Melhor petshop da região. O atendimento é VIP e dá pra ver que eles amam o que fazem. Minha Golden nunca ficou tão linda!",
            rating: 5
        },
        {
            name: "Juliana Costa",
            time: "Há 2 semanas",
            text: "Levei meu Shih-tzu para o dia de beleza e ele amou. O ambiente é super limpo e acolhedor. Recomendo de olhos fechados!",
            rating: 5
        },
        {
            name: "Marcos Oliveira",
            time: "Há 1 mês",
            text: "Profissionais incríveis! Conseguiram tosar meu cachorro que é super agitado com muita paciência. Virei cliente fiel.",
            rating: 5
        }
    ];

    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {reviews.map((review, index) => (
                <div
                    key={index}
                    ref={el => cardsRef.current[index] = el}
                    className="bg-white p-8 rounded-3xl shadow-md border-l-4 border-mary-purple will-change-transform transition-transform duration-100 ease-out"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h4 className="font-bold text-mary-purple text-xl">{review.name}</h4>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{review.time}</p>
                        </div>
                        <div className="flex gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                    </div>
                    <p className="text-gray-600 italic leading-relaxed text-lg">
                        "{review.text}"
                    </p>
                </div>
            ))}
        </div>


    );
};

const ScrollRevealImage = ({ src, alt, title, subtitle }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        let rafId;
        const handleScroll = () => {
            rafId = requestAnimationFrame(() => {
                if (!containerRef.current) return;

                const rect = containerRef.current.getBoundingClientRect();
                const centerScreen = window.innerHeight / 2;
                const imageCenter = rect.top + (rect.height / 2);
                const distance = Math.abs(centerScreen - imageCenter);
                const activationDistance = 150;

                if (distance < activationDistance) {
                    containerRef.current.classList.add('is-active');
                } else {
                    containerRef.current.classList.remove('is-active');
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check inicial

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-mary-pink-light to-white">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover group-hover:scale-110 [.is-active_&]:scale-110 transition-transform duration-500"
                />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-mary-purple/90 to-transparent p-6 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 opacity-0 [.is-active_&]:opacity-100 [.is-active_&]:translate-y-0">
                <p className="text-white font-bold text-lg">{title}</p>
                <p className="text-mary-pink-light text-sm">{subtitle}</p>
            </div>
        </div>
    );
};

const ScrollZoomImage = ({ src, alt, className, children }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        let rafId;
        const handleScroll = () => {
            rafId = requestAnimationFrame(() => {
                if (!containerRef.current) return;

                const rect = containerRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                // Lógica mais conservadora - só ativa quando BEM centralizado
                const centerScreen = viewportHeight / 2;
                const imageCenter = rect.top + (rect.height / 2);
                const distance = Math.abs(centerScreen - imageCenter);
                const activationDistance = 250; // Reduzido para ativar mais tarde

                // Só ativa quando o centro da imagem está REALMENTE perto do centro da tela
                if (distance < activationDistance && rect.top < viewportHeight * 0.6 && rect.bottom > viewportHeight * 0.4) {
                    containerRef.current.classList.add('is-zoom-active');
                } else {
                    containerRef.current.classList.remove('is-zoom-active');
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative group">
            <div className="transition-all duration-500 ease-in-out">
                {children}
            </div>
            <div className={className}>
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover group-hover:scale-110 [.is-zoom-active_&]:scale-110 transition-transform duration-500"
                />
            </div>
        </div>
    );
};

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Olá! Sou a assistente virtual da Mary Jane. 🐶 Como posso ajudar?', sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Base de Conhecimento Local
    const knowledgeBase = {
        greetings: {
            keywords: ['oi', 'ola', 'olá', 'bom dia', 'boa tarde', 'boa noite', 'tudo bem', 'eai'],
            response: "Olá! Tudo bem? 🐾 Estou aqui para tirar suas dúvidas sobre a Estética Canina Mary Jane!"
        },
        identity: {
            keywords: ['quem é você', 'quem e voce', 'seu nome', 'voce e', 'você é', 'bot', 'robo', 'robô', 'quem é vc', 'quem e vc'],
            response: "Sou a assistente virtual da Estética Canina Mary Jane! 🐶 Estou aqui para te ajudar com informações sobre nossos serviços e horários."
        },
        thanks: {
            keywords: ['obrigado', 'obrigada', 'valeu', 'agradeço', 'grato', 'grata', 'tks'],
            response: "Por nada! 🐾 Se precisar de mais alguma coisa, é só chamar. Lambeijos! 🐶"
        },
        hours: {
            keywords: ['horario', 'horário', 'abre', 'fecha', 'funcionamento', 'dia', 'sabado', 'sábado', 'domingo', 'segunda'],
            response: "Funcionamos de Terça a Sábado, das 9h às 18h. 🕘 Aos Domingos e Segundas estamos fechados para descanso da equipe (e dos pets!)."
        },
        location: {
            keywords: ['endereço', 'endereco', 'onde', 'fica', 'local', 'localização', 'localizacao', 'mapa', 'rua', 'bairro', 'chegar', 'chego', 'ir', 'vir'],
            response: "Estamos na R. Mossoró, 35 - Nova Floresta, Belo Horizonte - MG. Pertinho de você! 📍 Use o Google Maps ou Waze para facilitar!"
        },
        services: {
            keywords: ['banho', 'tosa', 'hidratação', 'hidratacao', 'serviço', 'servico', 'faz', 'corta', 'unha', 'limpeza', 'dente', 'oferecem', 'oferece', 'tem', 'trabalham', 'trabalha'],
            response: "Oferecemos Banho & Tosa, Hidratação, Tosa na Tesoura, Corte de Unhas e Limpeza de Ouvidos. Tudo com muito carinho! 🛁✂️"
        },
        payment: {
            keywords: ['pagamento', 'pagar', 'cartão', 'cartao', 'pix', 'dinheiro', 'aceita', 'forma de pagamento'],
            response: "Aceitamos Cartão de Crédito, Débito, PIX e Dinheiro. 💳💸"
        },
        parking: {
            keywords: ['estacionamento', 'parar', 'vaga', 'carro', 'moto', 'estacionar'],
            response: "Temos vagas de estacionamento na porta para sua comodidade! 🚗"
        },
        contact: {
            keywords: ['telefone', 'celular', 'ligar', 'falar', 'contato', 'zap', 'whatsapp'],
            response: "Nosso telefone/WhatsApp é (31) 99699-7344. 📞 Pode chamar a gente!"
        },
        whatsapp_trigger: {
            keywords: ['preço', 'preco', 'valor', 'quanto', 'custa', 'agendar', 'marcar', 'horario vago', 'disponivel', 'vaga', 'orçamento', 'orcamento'],
            response: "Para agendamentos e orçamentos personalizados, por favor, fale diretamente com a gente no WhatsApp! 👇",
            showWhatsApp: true
        }
    };

    const findResponse = (input) => {
        const normalizedInput = input.toLowerCase();

        // Verifica cada categoria
        for (const key in knowledgeBase) {
            const category = knowledgeBase[key];
            if (category.keywords.some(keyword => normalizedInput.includes(keyword))) {
                return {
                    text: category.response,
                    showWhatsApp: category.showWhatsApp || false
                };
            }
        }

        return null; // Nenhuma correspondência encontrada
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newUserMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user'
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputText('');
        setIsTyping(true);

        // Simula tempo de "pensar"
        setTimeout(() => {
            const response = findResponse(newUserMessage.text);

            let botResponse;

            if (response) {
                botResponse = {
                    id: Date.now() + 1,
                    text: response.text,
                    sender: 'bot',
                    showWhatsApp: response.showWhatsApp
                };
            } else {
                // Fallback para "Problema Técnico" / Desconhecido
                botResponse = {
                    id: Date.now() + 1,
                    text: "Desculpe, estou com um probleminha técnico nos meus neurônios... 😅 Mas não se preocupe! Você pode falar diretamente com a gente pelo WhatsApp abaixo:",
                    sender: 'bot',
                    showWhatsApp: true
                };
            }

            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000); // Delay de 1 segundo para naturalidade
    };

    const handleWhatsAppClick = () => {
        const whatsappNumber = "5531996997344";
        const whatsappMessage = "Olá! Gostaria de agendar um horário 🐾";
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            {/* Janela do Chat */}
            {isOpen && (
                <div className="mb-4 w-[90vw] h-[70vh] md:w-96 md:h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 animate-fade-in-up origin-bottom-right transition-all duration-300">
                    {/* Header */}
                    <div className="bg-mary-purple p-4 flex justify-between items-center text-white shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white/30">
                                    <img src="/mascote.png" alt="Bot" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-mary-purple"></div>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm md:text-base">Atendente Virtual 🐶</h3>
                                <p className="text-xs text-white/80">Online agora</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-2 rounded-full transition-colors"
                            aria-label="Fechar chat"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body (Mensagens) */}
                    <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4 scroll-smooth">
                        {messages.map((msg) => (
                            <div key={msg.id}>
                                <div
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 md:p-4 rounded-2xl text-sm md:text-base leading-relaxed ${msg.sender === 'user'
                                            ? 'bg-purple-100 text-mary-purple-dark rounded-tr-none'
                                            : 'bg-white text-gray-700 shadow-sm rounded-tl-none border border-gray-100'
                                            }`}
                                    >
                                        <p>{msg.text}</p>
                                    </div>
                                </div>
                                {/* Conditional WhatsApp Button */}
                                {msg.showWhatsApp && msg.sender === 'bot' && (
                                    <div className="flex justify-start mt-2">
                                        <button
                                            onClick={handleWhatsAppClick}
                                            className="bg-gradient-to-r from-mary-purple to-mary-purple-dark text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 text-sm"
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                            Agendar no WhatsApp 💬
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-700 shadow-sm rounded-tl-none border border-gray-100 p-3 md:p-4 rounded-2xl">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Footer (Input) */}
                    <form onSubmit={handleSendMessage} className="p-3 md:p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Digite sua mensagem..."
                            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-mary-purple/50 transition-all"
                        />
                        <button
                            type="submit"
                            className="bg-mary-purple text-white p-3 rounded-full hover:bg-mary-purple-dark transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                            disabled={!inputText.trim()}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            )}

            {/* Botão Flutuante */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                    } transition-all duration-300 w-14 h-14 md:w-16 md:h-16 bg-mary-purple text-white rounded-full shadow-lg hover:shadow-xl hover:bg-mary-purple-dark flex items-center justify-center group z-50`}
                aria-label="Abrir chat"
            >
                <MessageSquare className="w-7 h-7 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
            </button>
        </div>
    );
};

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const mascotRef = useRef(null);

    // Efeito Parallax - rastreia posição do scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setScrollY(currentScroll);

            // Zoom negativo na mascote (extremamente gradual)
            if (mascotRef.current) {
                const startThreshold = 300; // Atraso inicial - nada acontece antes de 300px
                const scrollProgress = Math.max(0, currentScroll - startThreshold);

                // Opacidade: desaparece gradualmente ao longo de ~1200px
                const opacity = Math.max(0, 1 - (scrollProgress / 1200));

                // Escala: diminui ainda mais devagar ao longo de ~2000px
                const scale = Math.max(0.5, 1 - (scrollProgress / 2000));

                mascotRef.current.style.transform = `scale(${scale})`;
                mascotRef.current.style.opacity = opacity;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const whatsappNumber = "5531996997344"; // ATUALIZAR COM SEU NÚMERO
    const whatsappMessage = "Oii! \uD83D\uDC3E Meu pet tá pedindo um dia de beleza na Mary Jane! Quando vocês têm horário livre? \u2728";

    const handleWhatsAppClick = () => {
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    };

    const handleGoogleLogin = () => {
        alert('Funcionalidade de login em desenvolvimento! 🔐');
    };



    const services = [
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: "Banho & Tosa",
            description: "Produtos de primeira linha para deixar seu pet limpinho e cheiroso"
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Hidratação",
            description: "Tratamentos especiais para pelagem saudável e brilhante"
        },
        {
            icon: <ShoppingBag className="w-8 h-8" />,
            title: "Produtos e Ração",
            description: "Encontre brinquedos, petiscos e acessórios para seu pet."
        }
    ];

    // Refs para os cards de serviço
    const serviceCardsRef = useRef([]);

    // Scroll highlight para mobile
    useEffect(() => {
        let rafId;
        const handleScroll = () => {
            rafId = requestAnimationFrame(() => {
                const centerScreen = window.innerHeight / 2;
                const activationDistance = 150; // Distância para ativar o highlight

                serviceCardsRef.current.forEach((card) => {
                    if (!card) return;

                    const rect = card.getBoundingClientRect();
                    const cardCenter = rect.top + (rect.height / 2);
                    const distance = Math.abs(centerScreen - cardCenter);

                    if (distance < activationDistance) {
                        // Adiciona classes de destaque
                        card.classList.add('border-mary-purple', 'shadow-2xl');
                        card.classList.remove('border-transparent', 'shadow-lg');
                    } else {
                        // Remove classes de destaque
                        card.classList.remove('border-mary-purple', 'shadow-2xl');
                        card.classList.add('border-transparent', 'shadow-lg');
                    }
                });
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check inicial

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-mary-pink-light to-white font-body pb-0">

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <img
                                src="/mascote.png"
                                alt="Mary Jane Logo"
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                            />
                            <h1 className="font-cursive text-2xl md:text-3xl text-mary-purple font-bold">
                                Estética Canina Mary Jane
                            </h1>
                        </div>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex items-center gap-6">
                            <a href="#home" className="text-gray-700 hover:text-mary-purple transition-colors font-medium">
                                Início
                            </a>
                            <a href="#services" className="text-gray-700 hover:text-mary-purple transition-colors font-medium">
                                Serviços
                            </a>
                            <a href="#gallery" className="text-gray-700 hover:text-mary-purple transition-colors font-medium">
                                Galeria
                            </a>
                            <a href="#reviews" className="text-gray-700 hover:text-mary-purple transition-colors font-medium">
                                Avaliações
                            </a>
                            <a href="#contact" className="text-gray-700 hover:text-mary-purple transition-colors font-medium">
                                Contato
                            </a>
                            <button
                                onClick={handleGoogleLogin}
                                className="px-4 py-2 bg-white border-2 border-mary-purple text-mary-purple rounded-2xl hover:bg-mary-purple hover:text-white transition-all duration-300 font-semibold"
                            >
                                Entrar
                            </button>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-mary-purple"
                            aria-label="Menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
                            <a
                                href="#home"
                                className="px-4 py-2 text-gray-700 hover:bg-mary-pink rounded-xl transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Início
                            </a>
                            <a
                                href="#services"
                                className="px-4 py-2 text-gray-700 hover:bg-mary-pink rounded-xl transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Serviços
                            </a>
                            <a
                                href="#gallery"
                                className="px-4 py-2 text-gray-700 hover:bg-mary-pink rounded-xl transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Galeria
                            </a>
                            <a
                                href="#reviews"
                                className="px-4 py-2 text-gray-700 hover:bg-mary-pink rounded-xl transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Avaliações
                            </a>
                            <a
                                href="#contact"
                                className="px-4 py-2 text-gray-700 hover:bg-mary-pink rounded-xl transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contato
                            </a>
                            <button
                                onClick={handleGoogleLogin}
                                className="px-4 py-2 bg-mary-purple text-white rounded-2xl hover:bg-mary-purple-dark transition-colors font-semibold"
                            >
                                Entrar com Google
                            </button>
                        </nav>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="pt-28 pb-8 px-4 paw-pattern relative overflow-hidden">
                {/* Elementos Parallax Decorativos - AUMENTADOS */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Patinha 1 - Topo Esquerda */}
                    <PawPrint
                        className="absolute top-20 left-10 w-24 h-24 text-mary-pink opacity-40"
                        style={{ transform: `translateY(${scrollY * 0.7}px) rotate(${scrollY * 0.25}deg)` }}
                    />
                    {/* Patinha 2 - Topo Direita */}
                    <PawPrint
                        className="absolute top-40 right-20 w-32 h-32 text-mary-purple opacity-35"
                        style={{ transform: `translateY(${scrollY * 0.9}px) rotate(-${scrollY * 0.35}deg)` }}
                    />
                    {/* Patinha 3 - Meio */}
                    <PawPrint
                        className="absolute top-60 left-1/4 w-20 h-20 text-mary-pink-dark opacity-40"
                        style={{ transform: `translateY(${scrollY * 0.5}px) rotate(${scrollY * 0.15}deg)` }}
                    />
                    {/* Patinha 4 - Baixo Direita */}
                    <PawPrint
                        className="absolute bottom-20 right-10 w-28 h-28 text-mary-purple opacity-30"
                        style={{ transform: `translateY(-${scrollY * 0.6}px) rotate(${scrollY * 0.2}deg)` }}
                    />
                    {/* Estrelinhas flutuantes */}
                    <Sparkles
                        className="absolute top-32 right-1/3 w-16 h-16 text-mary-pink opacity-50"
                        style={{ transform: `translateY(${scrollY * 0.8}px)` }}
                    />
                    <Heart
                        className="absolute bottom-40 left-16 w-16 h-16 text-mary-purple opacity-35"
                        style={{ transform: `translateY(-${scrollY * 0.7}px) scale(${1 + Math.sin(scrollY * 0.01) * 0.35})` }}
                    />
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Left Content */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-block mb-4 px-4 py-2 bg-mary-purple/10 rounded-full">
                                <span className="text-mary-purple font-semibold flex items-center gap-2 justify-center">
                                    <Heart className="w-4 h-4 fill-current" />
                                    Amor e Cuidado para seu Pet
                                </span>
                            </div>

                            <h2 className="font-cursive text-5xl md:text-6xl lg:text-7xl text-mary-purple mb-4 leading-tight">
                                Seu Pet Merece o Melhor
                            </h2>

                            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                                Cuidados profissionais com muito carinho e atenção.
                                Transformamos cada visita em uma experiência especial para seu melhor amigo! 🐾
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <button
                                    onClick={handleWhatsAppClick}
                                    className="group px-8 py-4 bg-gradient-to-r from-mary-purple to-mary-purple-light text-white rounded-3xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Agendar Agora
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </button>


                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-12">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-mary-purple">50k+</div>
                                    <div className="text-sm text-gray-600">Pets Atendidos</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-mary-purple">5★</div>
                                    <div className="text-sm text-gray-600">Avaliação</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-mary-purple">8+</div>
                                    <div className="text-sm text-gray-600">Anos de Amor</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Mascot Image com Parallax */}
                        <div
                            className="flex-1 flex justify-center mt-12 md:mt-0"
                            style={{ transform: `translateY(${scrollY * -0.15}px)` }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-mary-purple to-mary-pink-dark rounded-full blur-3xl opacity-30 animate-pulse"></div>
                                <div className="relative bg-white p-8 rounded-3xl shadow-2xl border-4 border-mary-pink will-change-transform transition-opacity duration-300" ref={mascotRef} style={{ transformOrigin: 'center center' }}>
                                    <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-mary-pink-light to-white rounded-2xl flex items-center justify-center overflow-hidden">
                                        <img
                                            src="/mascote.png"
                                            alt="Mary Jane - Mascote da Estética Canina"
                                            className="w-full h-full object-contain p-4"
                                        />
                                    </div>
                                    <div className="text-center mt-4">
                                        <p className="font-cursive text-2xl text-mary-purple">
                                            Mary Jane
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">Nossa mascote fofa! 🎀</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-12 px-4 bg-white relative overflow-hidden">
                {/* Elementos Parallax Decorativos - AUMENTADOS */}
                <div className="absolute inset-0 pointer-events-none opacity-70">
                    <Sparkles
                        className="absolute top-24 left-16 w-20 h-20 text-mary-purple opacity-35"
                        style={{ transform: `translateY(${scrollY * 0.45}px) rotate(${scrollY * 0.18}deg)` }}
                    />
                    <PawPrint
                        className="absolute top-40 right-12 w-24 h-24 text-mary-pink opacity-40"
                        style={{ transform: `translateY(${scrollY * 0.55}px) rotate(-${scrollY * 0.25}deg)` }}
                    />
                    <Heart
                        className="absolute bottom-32 left-20 w-16 h-16 text-mary-purple opacity-30"
                        style={{ transform: `translateY(-${scrollY * 0.48}px) scale(${1 + Math.sin(scrollY * 0.008) * 0.45})` }}
                    />
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="font-cursive text-5xl md:text-6xl text-mary-purple mb-6">
                            Nossos Serviços
                        </h2>
                        <p className="text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto">
                            Oferecemos os melhores cuidados para seu pet com profissionalismo e muito amor
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                ref={el => serviceCardsRef.current[index] = el}
                                className="group bg-gradient-to-br from-white to-mary-pink-light p-8 rounded-3xl shadow-lg hover:shadow-2xl transform transition-all duration-300 border-2 border-transparent hover:border-mary-purple"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-mary-purple to-mary-purple-light rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {React.cloneElement(service.icon, { className: "w-10 h-10" })}
                                </div>
                                <h3 className="text-3xl font-bold text-mary-purple mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA dentro de Services */}
                    <div className="mt-12 text-center">
                        <button
                            onClick={handleWhatsAppClick}
                            className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-3xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-3"
                        >
                            <MessageCircle className="w-6 h-6" />
                            Fale Conosco no WhatsApp
                        </button>
                    </div>
                </div>
            </section>

            {/* Before/After Transformation Section */}
            <section className="py-12 px-4 bg-gradient-to-br from-mary-purple/5 via-mary-pink-light to-mary-purple/5 relative overflow-hidden">
                {/* Elementos Parallax */}
                <div className="absolute inset-0 pointer-events-none opacity-50">
                    <PawPrint
                        className="absolute top-16 right-24 w-20 h-20 text-mary-pink opacity-20"
                        style={{ transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.1}deg)` }}
                    />
                    <Sparkles
                        className="absolute top-48 left-12 w-14 h-14 text-mary-purple opacity-25"
                        style={{ transform: `translateY(${scrollY * 0.18}px)` }}
                    />
                    <Heart
                        className="absolute bottom-24 right-16 w-16 h-16 text-mary-pink opacity-18"
                        style={{ transform: `translateY(-${scrollY * 0.22}px) rotate(-${scrollY * 0.06}deg)` }}
                    />
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-block mb-4 px-6 py-2 bg-mary-purple/10 rounded-full">
                            <span className="text-mary-purple font-bold flex items-center gap-2 justify-center">
                                <Sparkles className="w-4 h-4" />
                                Transformações Incríveis
                            </span>
                        </div>
                        <h2 className="font-cursive text-5xl md:text-6xl text-mary-purple mb-6">
                            Antes & Depois
                        </h2>
                        <p className="text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto">
                            Veja a mágica acontecer! Transformamos cada pet em uma verdadeira estrela ✨
                        </p>
                    </div>

                    {/* Before/After Comparison */}
                    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-mary-pink">
                        <div className="grid md:grid-cols-2">
                            {/* ANTES */}
                            <ScrollZoomImage
                                src="/antes.png"
                                alt="Pet antes do banho e tosa"
                                className="aspect-square overflow-hidden bg-gray-100"
                            >
                                <div className="absolute top-4 left-4 z-10 bg-gray-900 text-white px-4 py-2 rounded-2xl font-extrabold text-sm md:text-base flex items-center gap-2 shadow-2xl border-2 border-white/20">
                                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></span>
                                    ANTES
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 md:p-8 opacity-0 translate-y-4 transition-all duration-500 [.is-zoom-active_&]:opacity-100 [.is-zoom-active_&]:translate-y-0">
                                    <p className="text-white font-bold text-lg md:text-xl drop-shadow-lg">Durante o processo 🛁</p>
                                    <p className="text-gray-200 text-base md:text-lg mt-1 drop-shadow-md">Produtos de qualidade premium</p>
                                </div>
                            </ScrollZoomImage>

                            {/* DEPOIS */}
                            <ScrollZoomImage
                                src="/depois.png"
                                alt="Pet depois do banho e tosa - resultado final"
                                className="aspect-square overflow-hidden bg-gradient-to-br from-mary-pink-light to-white"
                            >
                                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-mary-purple to-mary-purple-light text-white px-4 py-2 rounded-2xl font-extrabold text-sm md:text-base flex items-center gap-2 shadow-2xl border-2 border-white/30">
                                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
                                    DEPOIS
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-mary-purple via-mary-purple/80 to-transparent p-6 md:p-8 opacity-0 translate-y-4 transition-all duration-500 [.is-zoom-active_&]:opacity-100 [.is-zoom-active_&]:translate-y-0">
                                    <p className="text-white font-bold text-lg md:text-xl drop-shadow-lg">Resultado incrível! ✨</p>
                                    <p className="text-white text-base md:text-lg mt-1 drop-shadow-md">Lindo e perfumado 💜</p>
                                </div>
                            </ScrollZoomImage>
                        </div>

                        {/* Divider com seta */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block z-20">
                            <div className="w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-mary-purple">
                                <span className="text-3xl font-bold text-mary-purple">→</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Cards com Efeito Fish-eye */}
                    <FishEyeCards />

                    {/* CTA */}
                    <div className="text-center mt-12">
                        <button
                            onClick={handleWhatsAppClick}
                            className="px-10 py-5 bg-gradient-to-r from-mary-purple via-mary-purple-light to-mary-purple text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
                        >
                            <Sparkles className="w-6 h-6" />
                            Quero Transformar Meu Pet!
                            <span className="animate-bounce">✨</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Gallery Section - Nossos Clientes */}
            <section id="gallery" className="py-12 px-4 bg-gradient-to-b from-white to-mary-pink-light relative overflow-hidden">
                {/* Elementos Parallax */}
                <div className="absolute inset-0 pointer-events-none opacity-40">
                    <PawPrint
                        className="absolute top-32 left-24 w-18 h-18 text-mary-purple opacity-15"
                        style={{ transform: `translateY(${scrollY * 0.16}px) rotate(-${scrollY * 0.09}deg)` }}
                    />
                    <Sparkles
                        className="absolute bottom-40 right-20 w-12 h-12 text-mary-pink opacity-25"
                        style={{ transform: `translateY(-${scrollY * 0.14}px)` }}
                    />
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="font-cursive text-5xl md:text-6xl text-mary-purple mb-6">
                            Nossos Clientes Felizes
                        </h2>
                        <p className="text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto">
                            Veja alguns dos nossos pets que saem sempre felizes e lindos! 🐾✨
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <ScrollRevealImage
                            src="/pet1.jpg"
                            alt="Pet feliz atendido na Mary Jane"
                            title="Cliente Especial 🎀"
                            subtitle="Estilo e diversão!"
                        />
                        <ScrollRevealImage
                            src="/pet2.png"
                            alt="Pet feliz atendido na Mary Jane"
                            title="Realeza Canina 👑"
                            subtitle="Beleza e elegância!"
                        />
                    </div>

                    {/* Call to action para galeria */}
                    <div className="text-center mt-12">
                        <p className="text-gray-600 mb-4">
                            Seu pet também merece esse tratamento especial!
                        </p>
                        <button
                            onClick={handleWhatsAppClick}
                            className="px-8 py-4 bg-gradient-to-r from-mary-purple to-mary-purple-light text-white rounded-3xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
                        >
                            <Heart className="w-5 h-5 fill-current" />
                            Agendar Agora
                        </button>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="py-12 px-4 bg-gradient-to-b from-white to-mary-pink-light relative overflow-hidden">
                {/* Elementos Parallax */}
                <div className="absolute inset-0 pointer-events-none opacity-45">
                    <Heart
                        className="absolute top-20 right-28 w-14 h-14 text-mary-purple opacity-20"
                        style={{ transform: `translateY(${scrollY * 0.13}px) scale(${1 + Math.sin(scrollY * 0.007) * 0.25})` }}
                    />
                    <PawPrint
                        className="absolute bottom-28 left-24 w-16 h-16 text-mary-pink opacity-18"
                        style={{ transform: `translateY(-${scrollY * 0.17}px) rotate(${scrollY * 0.07}deg)` }}
                    />
                    <Sparkles
                        className="absolute top-52 left-1/3 w-10 h-10 text-mary-purple opacity-22"
                        style={{ transform: `translateY(${scrollY * 0.11}px)` }}
                    />
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="font-cursive text-5xl md:text-6xl text-mary-purple mb-6">
                            O Que Dizem Nossos Clientes
                        </h2>
                        <p className="text-gray-600 text-xl md:text-2xl">
                            Confira as avaliações de quem já confia no nosso trabalho
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="ml-2 text-gray-700 font-semibold">5.0 no Google</span>
                        </div>
                    </div>

                    <ReviewCards />

                    {/* Google Maps Link */}
                    <div className="mt-8 text-center">
                        <a
                            href="https://maps.app.goo.gl/Cmsgg16Ci7YWTEKcA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-mary-purple hover:text-mary-purple-dark font-semibold text-lg transition-colors"
                        >
                            Ver todas as avaliações no Google Maps
                            <span>→</span>
                        </a>
                    </div>

                    {/* Widget do Google Maps com Avaliações */}
                    <div className="mt-12 bg-white p-6 rounded-3xl shadow-2xl">
                        <h3 className="text-center mx-auto font-bold text-2xl text-mary-purple mb-6">
                            📍 Nossa Localização e Avaliações Reais
                        </h3>
                        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.8425668947847!2d-43.9352498!3d-19.8906281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa69a728b60bf01%3A0xe7dee55eb5f68d87!2sEstetica%20canina%20mary%20jane!5e0!3m2!1spt-BR!2sbr!4v1234567890!5m2!1spt-BR!2sbr"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Localização Estética Canina Mary Jane"
                            ></iframe>
                        </div>

                        <div className="mt-6 text-center">
                            <a
                                href="https://maps.app.goo.gl/Cmsgg16Ci7YWTEKcA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-mary-purple to-mary-purple-light text-white rounded-2xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <MapPin className="w-5 h-5" />
                                Deixe sua Avaliação no Google
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact/Footer Section */}
            <footer id="contact" className="bg-gradient-to-br from-mary-purple to-mary-purple-dark text-white py-8 px-4 relative overflow-hidden">
                {/* Elementos Parallax no Footer */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <PawPrint
                        className="absolute top-16 left-12 w-24 h-24 text-white opacity-30"
                        style={{ transform: `translateY(${scrollY * 0.15}px) rotate(${scrollY * 0.08}deg)` }}
                    />
                    <Sparkles
                        className="absolute top-32 right-16 w-20 h-20 text-mary-pink-light opacity-40"
                        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
                    />
                    <Heart
                        className="absolute bottom-20 left-1/4 w-16 h-16 text-white opacity-25"
                        style={{ transform: `translateY(-${scrollY * 0.1}px) scale(${1 + Math.sin(scrollY * 0.005) * 0.3})` }}
                    />
                    <PawPrint
                        className="absolute bottom-32 right-1/3 w-18 h-18 text-mary-pink opacity-35"
                        style={{ transform: `translateY(-${scrollY * 0.14}px) rotate(-${scrollY * 0.06}deg)` }}
                    />
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        {/* Coluna 1 - Sobre */}
                        <div>
                            <h3 className="font-cursive text-3xl mb-4">Mary Jane</h3>
                            <p className="text-mary-pink-light leading-relaxed">
                                Cuidando do seu pet com amor, carinho e profissionalismo desde 2015.
                            </p>
                            <div className="flex gap-4 mt-4">
                                <a
                                    href="https://www.instagram.com/esteticacaninamaryjane/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a
                                    href={`https://wa.me/${whatsappNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                    aria-label="WhatsApp"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Coluna 2 - Contato */}
                        <div>
                            <h3 className="font-bold text-xl mb-4">Contato</h3>
                            <div className="space-y-3">
                                <a
                                    href="tel:+5531996997344"
                                    className="flex items-center gap-3 text-mary-pink-light hover:text-white transition-colors"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>(31) 99699-7344</span>
                                </a>
                                <div className="flex items-start gap-3 text-mary-pink-light">
                                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                                    <span>
                                        R. Mossoró, 35<br />
                                        Nova Floresta, Belo Horizonte - MG<br />
                                        CEP: 31140-330
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Coluna 3 - Horários */}
                        <div>
                            <h3 className="font-bold text-xl mb-4">Horário de Atendimento</h3>
                            <div className="space-y-2 text-mary-pink-light">
                                <p>Terça a Sábado: 9h às 18h</p>
                                <p>Domingo e Segunda: Fechado</p>
                            </div>
                            <button
                                onClick={handleWhatsAppClick}
                                className="mt-6 w-full px-6 py-3 bg-white text-mary-purple rounded-2xl font-bold hover:bg-mary-pink transition-colors flex items-center justify-center gap-2"
                            >
                                <Calendar className="w-5 h-5" />
                                Agendar Horário
                            </button>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-white/20 pt-6 text-center text-mary-pink-light">
                        <p className="flex items-center justify-center gap-2 flex-wrap">
                            © 2025 Estética Canina Mary Jane. Todos os direitos reservados.
                            <span className="hidden sm:inline">|</span>
                            Feito com <Heart className="w-4 h-4 fill-current inline" /> para seu pet
                        </p>
                    </div>
                </div>
            </footer>

            <ChatWidget />

        </div>
    );
}

export default App;
