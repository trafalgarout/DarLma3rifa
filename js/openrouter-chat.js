/**
 * OpenRouter Chat Implementation
 * This file contains the implementation of the OpenRouter-powered chatbot
 * for the Dar Al Ma'rifa website.
 */

class OpenRouterChat {
    constructor(options = {}) {
        this.apiKey = options.apiKey || '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'; // OpenRouter API key
        this.model = options.model || 'openai/gpt-3.5-turbo'; // Default model
        this.chatContainer = options.chatContainer || null;
        this.messageInput = options.messageInput || null;
        this.sendButton = options.sendButton || null;
        this.welcomeMessage = options.welcomeMessage || 'مرحباً! كيف يمكنني مساعدتك اليوم؟';
        this.companionName = options.companionName || 'المساعد الافتراضي';
        this.companionRole = options.companionRole || 'assistant';
        this.userRole = options.userRole || 'user';
        this.messages = [];
        this.isProcessing = false;
        
        // Initialize with system message if provided
        if (options.systemMessage) {
            this.messages.push({
                role: 'system',
                content: options.systemMessage
            });
        }
        
        this.init();
    }
    
    init() {
        // Check if required elements exist
        if (!this.chatContainer || !this.messageInput || !this.sendButton) {
            console.error('Required chat elements not provided');
            return;
        }
        
        // Add welcome message
        this.addMessage(this.welcomeMessage, 'bot');
        
        // Set up event listeners
        this.sendButton.addEventListener('click', () => this.handleSendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleSendMessage();
            }
        });
    }
    
    handleSendMessage() {
        if (this.isProcessing || !this.messageInput.value.trim()) return;
        
        const userMessage = this.messageInput.value.trim();
        this.addMessage(userMessage, 'user');
        this.messageInput.value = '';
        
        // Add user message to conversation history
        this.messages.push({
            role: this.userRole,
            content: userMessage
        });
        
        this.isProcessing = true;
        this.showTypingIndicator();
        
        // Try to use OpenRouter API first
        this.getResponseFromOpenRouter()
            .then(botResponse => {
                this.hideTypingIndicator();
                this.addMessage(botResponse, 'bot');
                this.isProcessing = false;
            })
            .catch(error => {
                console.error('Error getting response from OpenRouter:', error);
                this.hideTypingIndicator();
                
                // Use local fallback mode if API is unavailable
                const fallbackResponse = this.getLocalFallbackResponse(userMessage);
                this.addMessage(fallbackResponse, 'bot');
                this.isProcessing = false;
            });
    }
    
    // Local fallback responses when API is unavailable
    getLocalFallbackResponse(userMessage) {
        // Convert to lowercase for easier matching
        const message = userMessage.toLowerCase();
        
        // Get the companion type from the page URL
        const path = window.location.pathname;
        const pageId = path.substring(path.lastIndexOf('/') + 1).replace('.html', '');
        
        // Default response if no matches
        let response = 'شكراً لرسالتك. يبدو أن هناك مشكلة في الاتصال بالخادم حالياً. سنحاول الرد على استفسارك قريباً.';
        
        // Business Thinker responses
        if (pageId === 'business-thinker') {
            if (message.includes('استراتيجية') || message.includes('خطة') || message.includes('عمل')) {
                response = 'تطوير استراتيجية عمل ناجحة يتطلب فهماً عميقاً للسوق والمنافسين والعملاء المستهدفين. يمكنني مساعدتك في وضع خطة متكاملة عندما يعود الاتصال بالخادم.';
            } else if (message.includes('تسويق') || message.includes('مبيعات')) {
                response = 'التسويق الفعال يعتمد على فهم احتياجات العملاء وتقديم قيمة حقيقية لهم. سأقدم لك استراتيجيات تسويقية مخصصة عندما يعود الاتصال.';
            }
        }
        // Tech Ambassador responses
        else if (pageId === 'tech-ambassador') {
            if (message.includes('ذكاء اصطناعي') || message.includes('تعلم آلي')) {
                response = 'الذكاء الاصطناعي يغير طريقة عملنا وحياتنا بشكل جذري. سأشرح لك المفاهيم الأساسية والتطبيقات العملية عندما يعود الاتصال بالخادم.';
            } else if (message.includes('برمجة') || message.includes('تطوير')) {
                response = 'تطوير البرمجيات عملية منهجية تتطلب التخطيط الجيد والتنفيذ الدقيق. سأقدم لك إرشادات مفصلة عندما يعود الاتصال.';
            }
        }
        // Knowledge Explorer responses
        else if (pageId === 'knowledge-explorer') {
            if (message.includes('تاريخ') || message.includes('علوم') || message.includes('فلسفة')) {
                response = 'المعرفة هي رحلة مستمرة من الاكتشاف والتعلم. سأساعدك في استكشاف هذا الموضوع بعمق عندما يعود الاتصال بالخادم.';
            }
        }
        // Future Friend responses
        else if (pageId === 'future-friend') {
            if (message.includes('مستقبل') || message.includes('تقنية') || message.includes('ابتكار')) {
                response = 'المستقبل يحمل تحديات وفرصاً كبيرة في ظل التطور التكنولوجي المتسارع. سأشارك معك رؤى استشرافية عندما يعود الاتصال بالخادم.';
            }
        }
        // Fitness Coach responses
        else if (pageId === 'fitness-coach') {
            if (message.includes('وزن') || message.includes('تخسيس') || message.includes('دهون')) {
                response = 'لفقدان الوزن بشكل صحي، أنصح بمزيج من تمارين القلب والأوعية الدموية، وتدريبات القوة، ونظام غذائي متوازن مع عجز سعرات حرارية معتدل. سأقدم لك خطة مخصصة عندما يعود الاتصال بالخادم.';
            } else if (message.includes('عضلات') || message.includes('قوة') || message.includes('بناء')) {
                response = 'لبناء العضلات، يجب التركيز على تدريبات المقاومة التصاعدية، وتناول كمية كافية من البروتين، والحصول على فترات راحة مناسبة. سأقدم لك برنامجاً مخصصاً عندما يعود الاتصال بالخادم.';
            } else if (message.includes('غذاء') || message.includes('تغذية') || message.includes('طعام')) {
                response = 'التغذية تمثل 80% من نتائج اللياقة البدنية! يمكنني مساعدتك في حساب احتياجاتك اليومية من السعرات الحرارية وتوزيع العناصر الغذائية الكبرى بناءً على أهدافك. سأقدم لك خطة غذائية مخصصة عندما يعود الاتصال بالخادم.';
            } else if (message.includes('قلب') || message.includes('جري') || message.includes('تحمل')) {
                response = 'تمارين القلب والأوعية الدموية ممتازة لصحة القلب والتحمل. أنصح بالبدء بـ 150 دقيقة من تمارين القلب متوسطة الشدة أسبوعياً. سأقدم لك برنامجاً مخصصاً عندما يعود الاتصال بالخادم.';
            } else if (message.includes('مبتدئ') || message.includes('بداية') || message.includes('جديد')) {
                response = 'مرحباً بك في رحلة اللياقة البدنية! كمبتدئ، من المهم البدء ببطء والتركيز على الشكل الصحيح. أنصح بروتين تمارين للجسم كامل 3 مرات في الأسبوع. سأقدم لك خطة مناسبة للمبتدئين عندما يعود الاتصال بالخادم.';
            }
        }
        
        return response;
    }
    
    async getResponseFromOpenRouter() {
        try {
            // Check if API key is provided
            if (!this.apiKey) {
                return 'يرجى تكوين مفتاح API الخاص بـ OpenRouter لاستخدام هذه الميزة.';
            }
            
            // Log the request for debugging
            console.log('Sending request to OpenRouter with model:', this.model);
            
            // Create a clean copy of messages without any non-ASCII characters in headers
            const cleanMessages = this.messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }));
            
            const requestBody = {
                model: this.model,
                messages: cleanMessages,
                temperature: 0.7,
                max_tokens: 1000
            };
            
            console.log('Request body:', JSON.stringify(requestBody));
            
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Dar Al Maarifa'
                },
                body: JSON.stringify(requestBody)
            });
            
            // Log the full response for debugging
            console.log('OpenRouter API response status:', response.status);
            
            if (!response.ok) {
                console.error('OpenRouter API error status:', response.status);
                
                // Use local fallback for any API errors
                return this.getLocalFallbackResponse(this.messages[this.messages.length - 1].content);
            }
            
            try {
                const data = await response.json();
                console.log('OpenRouter API response data:', data);
                
                // Check if the response has the expected structure
                if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                    console.error('Unexpected API response format:', data);
                    return 'عذراً، تلقينا استجابة غير متوقعة من الخادم. يرجى المحاولة مرة أخرى.';
                }
                
                const botResponse = data.choices[0].message.content;
                
                // Add bot response to conversation history
                this.messages.push({
                    role: this.companionRole,
                    content: botResponse
                });
                
                // Keep conversation history manageable (last 10 messages)
                if (this.messages.length > 12) { // System message + 10 exchanges
                    this.messages = this.messages.slice(this.messages.length - 11);
                }
                
                return botResponse;
            } catch (jsonError) {
                console.error('Error parsing API response:', jsonError);
                return 'عذراً، حدث خطأ في معالجة الاستجابة من الخادم. يرجى المحاولة مرة أخرى.';
            }
        } catch (error) {
            console.error('Error in OpenRouter API call:', error);
            
            // Check if it's a network connectivity issue
            if (error.message && (error.message.includes('Failed to fetch') || 
                                  error.message.includes('NetworkError') || 
                                  error.message.includes('ERR_NAME_NOT_RESOLVED'))) {
                return 'عذراً، يبدو أن هناك مشكلة في الاتصال بالإنترنت. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.';
            }
            
            return 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.';
        }
    }
    
    addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}-message`;
        
        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${currentTime}</span>
            </div>
        `;
        
        this.chatContainer.appendChild(messageElement);
        
        // Scroll to the bottom of the chat
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
    
    showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.className = 'chat-message bot-message typing-indicator';
        typingElement.id = 'typingIndicator';
        
        typingElement.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        this.chatContainer.appendChild(typingElement);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingElement = document.getElementById('typingIndicator');
        if (typingElement) {
            typingElement.remove();
        }
    }
}

// Add typing indicator styles if not already in the main CSS
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .typing-dots {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
        }
        
        .typing-dots span {
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #aaa;
            border-radius: 50%;
            margin: 0 3px;
            animation: typingAnimation 1.5s infinite ease-in-out;
        }
        
        .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typingAnimation {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(style);
});
