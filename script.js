document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURAÇÕES ---
    const seuNumeroWhatsapp = "43991862510"; 

    // --- SELEÇÃO DE ELEMENTOS ---
    const ctaButtons = document.querySelectorAll('.cta-button');
    const modalOverlay = document.getElementById('promo-modal');
    const modalCloseButton = document.getElementById('modal-close-button');
    const goToWhatsappButton = document.getElementById('go-to-whatsapp-button');
    const promoCodeInput = document.getElementById('promo-code-input');
    const faqItems = document.querySelectorAll('.faq-item');
    const themeSwitch = document.querySelector('.theme-switch__checkbox');

    // --- LÓGICA DO TEMA (CLARO/ESCURO) ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeSwitch.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            themeSwitch.checked = false;
        }
    };

    // 1. Verificar tema salvo no localStorage ao carregar a página
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // 2. Adicionar evento ao switch para mudar o tema
    themeSwitch.addEventListener('change', () => {
        const newTheme = themeSwitch.checked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // --- LÓGICA DO WHATSAPP INTELIGENTE ---

    // 1. Detectar código de afiliado na URL
    const params = new URLSearchParams(window.location.search);
    const influencerRef = params.get('ref');

    const handleWhatsAppClick = (event) => {
        event.preventDefault();

        // Se veio de um link de influencer, vai direto para o WhatsApp
        if (influencerRef) {
            const message = `Olá! Vim pelo influencer @${influencerRef} e quero adquirir minha licença do Financeiro PRO.`;
            const whatsappUrl = `https://wa.me/${seuNumeroWhatsapp}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        } 
        // Se não, abre o modal para perguntar sobre o código
        else {
            openModal();
        }
    };

    // 2. Adicionar o evento de clique a todos os botões de CTA
    ctaButtons.forEach(button => {
        button.addEventListener('click', handleWhatsAppClick);
    });

    // 3. Lógica do botão "Ir para WhatsApp" dentro do modal
    goToWhatsappButton.addEventListener('click', () => {
        const userCode = promoCodeInput.value.trim();
        let message = "Olá! Vim pelo site e quero adquirir a licença do Financeiro PRO.";

        if (userCode) {
            message = `Olá! Vim pelo site com o código promocional [${userCode}] e quero adquirir a licença.`;
        }

        const whatsappUrl = `https://wa.me/${seuNumeroWhatsapp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        closeModal();
    });

    // --- FUNÇÕES DO MODAL ---
    const openModal = () => {
        modalOverlay.classList.add('show');
    };

    const closeModal = () => {
        modalOverlay.classList.remove('show');
        promoCodeInput.value = ""; // Limpa o campo ao fechar
    };

    modalCloseButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        // Fecha o modal se clicar fora do conteúdo
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // --- LÓGICA DO ACORDEÃO (FAQ) - MELHORADA ---
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = item.querySelector('.faq-icon');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Fecha todos os outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-icon').textContent = '+';
                }
            });

            // Alterna o item clicado
            item.classList.toggle('active');
            icon.textContent = isActive ? '+' : '−'; // Usa '−' para melhor alinhamento
        });
    });
});
