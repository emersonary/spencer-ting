import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = join(__dirname, '../src/i18n/locales');

const continents = {
  en: { americas: 'Americas', europe: 'Europe', asia: 'Asia', middleEast: 'Middle East' },
  es: { americas: 'América', europe: 'Europa', asia: 'Asia', middleEast: 'Oriente Medio' },
  zh: { americas: '美洲', europe: '欧洲', asia: '亚洲', middleEast: '中东' },
  pt: { americas: 'Américas', europe: 'Europa', asia: 'Ásia', middleEast: 'Oriente Médio' },
  it: { americas: 'Americhe', europe: 'Europa', asia: 'Asia', middleEast: 'Medio Oriente' },
  de: { americas: 'Amerika', europe: 'Europa', asia: 'Asien', middleEast: 'Naher Osten' },
  ru: { americas: 'Америка', europe: 'Европа', asia: 'Азия', middleEast: 'Ближний Восток' },
  ar: { americas: 'الأمريكتان', europe: 'أوروبا', asia: 'آسيا', middleEast: 'الشرق الأوسط' },
  ja: { americas: 'アメリカ大陸', europe: 'ヨーロッパ', asia: 'アジア', middleEast: '中東' },
  ko: { americas: '아메리카', europe: '유럽', asia: '아시아', middleEast: '중동' },
  he: { americas: 'אמריקה', europe: 'אירופה', asia: 'אסיה', middleEast: 'המזרח התיכון' },
  tr: { americas: 'Amerika', europe: 'Avrupa', asia: 'Asya', middleEast: 'Orta Doğu' },
};

const t = {
  es: {
    lang: { label: 'Idioma' },
    nav: {
      home: 'Inicio', about: 'Sobre Spencer', properties: 'Propiedades', neighborhoods: 'Barrios',
      buy: 'Comprar', sell: 'Vender', blog: 'Perspectivas', tools: 'Herramientas',
      mortgage: 'Calculadora Hipotecaria', contact: 'Contacto', login: 'Iniciar sesión',
      logout: 'Cerrar sesión', account: 'Mi cuenta', accountMenu: 'Menú de cuenta',
    },
    hero: {
      headline: 'Encuentre su próximo hogar con confianza',
      subtitle: 'Experiencia local. Asesoramiento honesto. Datos precisos. Orientación personalizada para las mejores propiedades de Nueva York.',
      ctaBuy: 'Buscar vivienda', ctaSell: 'Vender su hogar', ctaTalk: 'Hablar con Spencer',
    },
    stats: {
      experience: 'Años de experiencia', transactions: 'Operaciones cerradas',
      volume: 'Volumen total de ventas', neighborhoods: 'Barrios de NYC',
    },
    footer: { tagline: 'Asesoría inmobiliaria de lujo en Nueva York', rights: 'Todos los derechos reservados.' },
    properties: { title: 'Propiedades destacadas', subtitle: 'Selección de las mejores residencias de Nueva York' },
    testimonials: { title: 'Historias de clientes', subtitle: 'Lo que dicen quienes trabajan con Spencer' },
    videos: { title: 'Perspectivas y recorridos', subtitle: 'Videos sobre barrios, compra y mercado' },
    social: { title: 'Siga a Spencer', instagram: 'Instagram', linkedin: 'LinkedIn', instagramHandle: '@artgroup.nyc' },
    cta: {
      readyTitle: '¿Listo para dar el siguiente paso?',
      readySubtitle: 'Comprando o vendiendo, Spencer ofrece la experiencia y defensa que merece.',
      schedule: 'Agendar una consulta',
    },
    contact: {
      title: 'Contáctenos', subtitle: '¿Comprar, vender o explorar el mercado? Spencer responde personalmente.',
      send: 'Enviar mensaje', success: '¡Gracias! Spencer se pondrá en contacto pronto.',
    },
    blog: { title: 'Perspectivas del mercado', subtitle: 'Análisis experto del mercado inmobiliario de NYC', readMore: 'Leer artículo', noPosts: 'Aún no hay artículos.', back: 'Volver a perspectivas' },
    about: {
      title: 'Su guía de confianza en bienes raíces de NYC',
      subtitle: 'Spencer Ting aporta conocimiento profundo del mercado, defensa incansable y perspectiva global.',
    },
    pages: { notFound: { title: 'Página no encontrada', back: 'Volver al inicio' } },
  },
  zh: {
    lang: { label: '语言' },
    nav: {
      home: '首页', about: '关于 Spencer', properties: '房源', neighborhoods: '社区',
      buy: '购房', sell: '售房', blog: '市场洞察', tools: '工具',
      mortgage: '房贷计算器', contact: '联系', login: '登录',
      logout: '退出', account: '我的账户', accountMenu: '账户菜单',
    },
    hero: {
      headline: '自信地找到您的下一个家',
      subtitle: '本地专业经验。诚实建议。数据驱动洞察。为纽约顶级物业提供个性化指导。',
      ctaBuy: '找房', ctaSell: '出售房屋', ctaTalk: '联系 Spencer',
    },
    stats: {
      experience: '年从业经验', transactions: '成交笔数',
      volume: '总销售额', neighborhoods: '纽约社区',
    },
    footer: { tagline: '纽约市高端房地产顾问', rights: '版权所有。' },
    properties: { title: '精选房源', subtitle: '纽约最优质住宅精选' },
    testimonials: { title: '客户故事', subtitle: '客户如何评价与 Spencer 的合作' },
    videos: { title: '市场洞察与导览', subtitle: '社区、购房技巧与市场动态短视频' },
    social: { title: '关注 Spencer', instagram: 'Instagram', linkedin: 'LinkedIn', instagramHandle: '@artgroup.nyc' },
    cta: {
      readyTitle: '准备好迈出下一步了吗？',
      readySubtitle: '无论买房还是卖房，Spencer 都为您提供应有的专业与捍卫。',
      schedule: '预约咨询',
    },
    contact: {
      title: '联系我们', subtitle: '买房、卖房或了解市场？Spencer 亲自回复。',
      send: '发送消息', success: '谢谢！Spencer 将尽快与您联系。',
    },
    blog: { title: '市场洞察', subtitle: '纽约房地产专家分析', readMore: '阅读文章', noPosts: '暂无文章。', back: '返回洞察' },
    about: {
      title: '您值得信赖的纽约房地产向导',
      subtitle: 'Spencer Ting 为每笔交易带来深厚的市场知识、坚定捍卫和全球视野。',
    },
    pages: { notFound: { title: '页面未找到', back: '返回首页' } },
  },
  pt: {
    lang: { label: 'Idioma' },
    nav: {
      home: 'Início', about: 'Sobre Spencer', properties: 'Imóveis', neighborhoods: 'Bairros',
      buy: 'Comprar', sell: 'Vender', blog: 'Insights', tools: 'Ferramentas',
      mortgage: 'Calculadora de Hipoteca', contact: 'Contato', login: 'Entrar',
      logout: 'Sair', account: 'Minha conta', accountMenu: 'Menu da conta',
    },
    hero: {
      headline: 'Encontre seu próximo lar com confiança',
      subtitle: 'Experiência local. Conselhos honestos. Dados precisos. Orientação personalizada para os melhores imóveis de Nova York.',
      ctaBuy: 'Encontrar imóvel', ctaSell: 'Vender seu imóvel', ctaTalk: 'Falar com Spencer',
    },
    stats: {
      experience: 'Anos de experiência', transactions: 'Negócios fechados',
      volume: 'Volume total de vendas', neighborhoods: 'Bairros de NYC',
    },
    footer: { tagline: 'Consultoria imobiliária de luxo em Nova York', rights: 'Todos os direitos reservados.' },
    properties: { title: 'Imóveis em destaque', subtitle: 'Seleção das melhores residências de Nova York' },
    testimonials: { title: 'Histórias de clientes', subtitle: 'O que dizem quem trabalha com Spencer' },
    videos: { title: 'Insights e tours', subtitle: 'Vídeos sobre bairros, compra e mercado' },
    social: { title: 'Siga Spencer', instagram: 'Instagram', linkedin: 'LinkedIn', instagramHandle: '@artgroup.nyc' },
    cta: {
      readyTitle: 'Pronto para dar o próximo passo?',
      readySubtitle: 'Comprando ou vendendo, Spencer oferece a expertise e defesa que você merece.',
      schedule: 'Agendar consulta',
    },
    contact: {
      title: 'Entre em contato', subtitle: 'Comprar, vender ou explorar o mercado? Spencer responde pessoalmente.',
      send: 'Enviar mensagem', success: 'Obrigado! Spencer entrará em contato em breve.',
    },
    blog: { title: 'Insights de mercado', subtitle: 'Análise especializada do mercado imobiliário de NYC', readMore: 'Ler artigo', noPosts: 'Nenhum artigo publicado ainda.', back: 'Voltar aos insights' },
    about: {
      title: 'Seu guia de confiança em imóveis em NYC',
      subtitle: 'Spencer Ting traz profundo conhecimento de mercado, defesa incansável e perspectiva global.',
    },
    pages: { notFound: { title: 'Página não encontrada', back: 'Voltar ao início' } },
  },
  it: {
    lang: { label: 'Lingua' },
    nav: {
      home: 'Home', about: 'Su Spencer', properties: 'Proprietà', neighborhoods: 'Quartieri',
      buy: 'Acquista', sell: 'Vendi', blog: 'Approfondimenti', tools: 'Strumenti',
      mortgage: 'Calcolatore mutuo', contact: 'Contatti', login: 'Accedi',
      logout: 'Esci', account: 'Il mio account', accountMenu: 'Menu account',
    },
    hero: {
      headline: 'Trova la tua prossima casa con fiducia',
      subtitle: 'Competenza locale. Consigli onesti. Dati precisi. Guida personalizzata per le migliori proprietà di New York.',
      ctaBuy: 'Cerca casa', ctaSell: 'Vendi casa', ctaTalk: 'Parla con Spencer',
    },
    stats: {
      experience: 'Anni di esperienza', transactions: 'Transazioni concluse',
      volume: 'Volume totale vendite', neighborhoods: 'Quartieri di NYC',
    },
    footer: { tagline: 'Consulenza immobiliare di lusso a New York', rights: 'Tutti i diritti riservati.' },
    properties: { title: 'Proprietà in evidenza', subtitle: 'Selezione delle migliori residenze di New York' },
    testimonials: { title: 'Storie dei clienti', subtitle: 'Cosa dicono di Spencer' },
    videos: { title: 'Approfondimenti e tour', subtitle: 'Video su quartieri, acquisto e mercato' },
    social: { title: 'Segui Spencer', instagram: 'Instagram', linkedin: 'LinkedIn', instagramHandle: '@artgroup.nyc' },
    cta: {
      readyTitle: 'Pronto a fare la mossa?',
      readySubtitle: 'Che tu compri o venda, Spencer offre competenza e tutela.',
      schedule: 'Prenota una consulenza',
    },
    contact: {
      title: 'Contattaci', subtitle: 'Comprare, vendere o esplorare il mercato? Spencer risponde personalmente.',
      send: 'Invia messaggio', success: 'Grazie! Spencer ti contatterà a breve.',
    },
    blog: { title: 'Approfondimenti di mercato', subtitle: 'Analisi esperta del mercato immobiliare di NYC', readMore: 'Leggi articolo', noPosts: 'Nessun articolo ancora.', back: 'Torna agli approfondimenti' },
    about: {
      title: 'La tua guida affidabile al mercato immobiliare di NYC',
      subtitle: 'Spencer Ting porta profonda conoscenza del mercato, difesa instancabile e prospettiva globale.',
    },
    pages: { notFound: { title: 'Pagina non trovata', back: 'Torna alla home' } },
  },
  de: {
    lang: { label: 'Sprache' },
    nav: {
      home: 'Startseite', about: 'Über Spencer', properties: 'Immobilien', neighborhoods: 'Stadtteile',
      buy: 'Kaufen', sell: 'Verkaufen', blog: 'Einblicke', tools: 'Tools',
      mortgage: 'Hypothekenrechner', contact: 'Kontakt', login: 'Anmelden',
      logout: 'Abmelden', account: 'Mein Konto', accountMenu: 'Kontomenü',
    },
    hero: {
      headline: 'Finden Sie Ihr nächstes Zuhause mit Vertrauen',
      subtitle: 'Lokale Expertise. Ehrliche Beratung. Datenbasierte Einblicke. Persönliche Begleitung für New Yorks beste Immobilien.',
      ctaBuy: 'Immobilie finden', ctaSell: 'Immobilie verkaufen', ctaTalk: 'Mit Spencer sprechen',
    },
    stats: {
      experience: 'Jahre Erfahrung', transactions: 'Abgeschlossene Transaktionen',
      volume: 'Gesamtverkaufsvolumen', neighborhoods: 'NYC-Stadtteile',
    },
    footer: { tagline: 'Luxus-Immobilienberatung in New York City', rights: 'Alle Rechte vorbehalten.' },
    properties: { title: 'Ausgewählte Immobilien', subtitle: 'Auswahl der besten Wohnungen in New York' },
    testimonials: { title: 'Kundengeschichten', subtitle: 'Was Kunden über Spencer sagen' },
    videos: { title: 'Markteinblicke & Touren', subtitle: 'Kurzvideos zu Stadtteilen, Kauf und Markt' },
    social: { title: 'Spencer folgen', instagram: 'Instagram', linkedin: 'LinkedIn', instagramHandle: '@artgroup.nyc' },
    cta: {
      readyTitle: 'Bereit für den nächsten Schritt?',
      readySubtitle: 'Beim Kauf oder Verkauf bietet Spencer die Expertise und Vertretung, die Sie verdienen.',
      schedule: 'Beratung vereinbaren',
    },
    contact: {
      title: 'Kontakt', subtitle: 'Kaufen, verkaufen oder Markt erkunden? Spencer antwortet persönlich.',
      send: 'Nachricht senden', success: 'Danke! Spencer meldet sich in Kürze.',
    },
    blog: { title: 'Markteinblicke', subtitle: 'Expertenanalyse des NYC-Immobilienmarkts', readMore: 'Artikel lesen', noPosts: 'Noch keine Artikel.', back: 'Zurück zu Einblicke' },
    about: {
      title: 'Ihr vertrauenswürdiger NYC-Immobilienführer',
      subtitle: 'Spencer Ting bringt tiefes Marktwissen, beharrliche Vertretung und globale Perspektive.',
    },
    pages: { notFound: { title: 'Seite nicht gefunden', back: 'Zur Startseite' } },
  },
  ru: {
    lang: { label: 'Язык' },
    nav: {
      home: 'Главная', about: 'О Спенсере', properties: 'Объекты', neighborhoods: 'Районы',
      buy: 'Купить', sell: 'Продать', blog: 'Аналитика', tools: 'Инструменты',
      mortgage: 'Ипотечный калькулятор', contact: 'Контакты', login: 'Войти',
      logout: 'Выйти', account: 'Мой аккаунт', accountMenu: 'Меню аккаунта',
    },
    hero: {
      headline: 'Найдите следующий дом с уверенностью',
      subtitle: 'Местная экспертиза. Честные советы. Данные и аналитика. Персональное сопровождение лучших объектов Нью-Йорка.',
      ctaBuy: 'Найти дом', ctaSell: 'Продать дом', ctaTalk: 'Связаться со Спенсером',
    },
    stats: {
      experience: 'Лет опыта', transactions: 'Закрытых сделок',
      volume: 'Общий объём продаж', neighborhoods: 'Районы NYC',
    },
    footer: { tagline: 'Консультации по элитной недвижимости в Нью-Йорке', rights: 'Все права защищены.' },
    properties: { title: 'Избранные объекты', subtitle: 'Подборка лучших резиденций Нью-Йорка' },
    testimonials: { title: 'Истории клиентов', subtitle: 'Отзывы о работе со Спенсером' },
    videos: { title: 'Аналитика и туры', subtitle: 'Короткие видео о районах, покупке и рынке' },
    social: { title: 'Подписаться на Спенсера', instagram: 'Instagram', linkedin: 'LinkedIn', instagramHandle: '@artgroup.nyc' },
    cta: {
      readyTitle: 'Готовы сделать шаг?',
      readySubtitle: 'При покупке или продаже Спенсер обеспечивает экспертизу и защиту ваших интересов.',
      schedule: 'Записаться на консультацию',
    },
    contact: {
      title: 'Связаться', subtitle: 'Покупка, продажа или изучение рынка? Спенсер отвечает лично.',
      send: 'Отправить сообщение', success: 'Спасибо! Спенсер свяжется с вами в ближайшее время.',
    },
    blog: { title: 'Аналитика рынка', subtitle: 'Экспертный анализ рынка недвижимости NYC', readMore: 'Читать статью', noPosts: 'Статей пока нет.', back: 'Назад к аналитике' },
    about: {
      title: 'Ваш надёжный гид по недвижимости NYC',
      subtitle: 'Спенсер Тинг привносит глубокие знания рынка, настойчивую защиту интересов и глобальный взгляд.',
    },
    pages: { notFound: { title: 'Страница не найдена', back: 'На главную' } },
  },
  ar: {
    lang: { label: 'اللغة' },
    nav: {
      home: 'الرئيسية', about: 'عن سبنسر', properties: 'العقارات', neighborhoods: 'الأحياء',
      buy: 'شراء', sell: 'بيع', blog: 'رؤى السوق', tools: 'أدوات',
      mortgage: 'حاسبة الرهن', contact: 'اتصل', login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج', account: 'حسابي', accountMenu: 'قائمة الحساب',
    },
    hero: {
      headline: 'اعثر على منزلك القادم بثقة',
      subtitle: 'خبرة محلية. نصائح صادقة. رؤى مبنية على البيانات. إرشاد شخصي لأفضل عقارات نيويورك.',
      ctaBuy: 'ابحث عن منزل', ctaSell: 'بع منزلك', ctaTalk: 'تحدث مع سبنسر',
    },
    stats: {
      experience: 'سنوات الخبرة', transactions: 'صفقات مكتملة',
      volume: 'إجمالي حجم المبيعات', neighborhoods: 'أحياء نيويورك',
    },
    footer: { tagline: 'استشارات عقارية فاخرة في نيويورك', rights: 'جميع الحقوق محفوظة.' },
    properties: { title: 'عقارات مميزة', subtitle: 'مجموعة مختارة من أفضل مساكن نيويورك' },
    testimonials: { title: 'قصص العملاء', subtitle: 'ماذا يقول العملاء عن العمل مع سبنسر' },
    videos: { title: 'رؤى وجولات', subtitle: 'مقاطع قصيرة عن الأحياء والشراء والسوق' },
    social: { title: 'تابع سبنسر', instagram: 'إنستغرام', linkedin: 'لينكدإن', instagramHandle: '@artgroup.nyc' },
    cta: {
      readyTitle: 'هل أنت مستعد للخطوة التالية؟',
      readySubtitle: 'سواء كنت تشتري أو تبيع، يقدم سبنسر الخبرة والدفاع الذي تستحقه.',
      schedule: 'حدد موعد استشارة',
    },
    contact: {
      title: 'تواصل معنا', subtitle: 'شراء أو بيع أو استكشاف السوق؟ سبنسر يرد شخصياً.',
      send: 'إرسال الرسالة', success: 'شكراً! سيتواصل سبنسر معك قريباً.',
    },
    blog: { title: 'رؤى السوق', subtitle: 'تحليل خبير لسوق العقارات في نيويورك', readMore: 'اقرأ المقال', noPosts: 'لا توجد مقالات بعد.', back: 'العودة للرؤى' },
    about: {
      title: 'دليلك الموثوق لعقارات نيويورك',
      subtitle: 'يجلب سبنسر تينغ معرفة عميقة بالسوق ودفاعاً مستمراً ورؤية عالمية.',
    },
    pages: { notFound: { title: 'الصفحة غير موجودة', back: 'العودة للرئيسية' } },
  },
  ja: {
    lang: { label: '言語' },
    nav: {
      home: 'ホーム', about: 'Spencerについて', properties: '物件', neighborhoods: 'エリア',
      buy: '購入', sell: '売却', blog: 'マーケット洞察', tools: 'ツール',
      mortgage: '住宅ローン計算', contact: 'お問い合わせ', login: 'ログイン',
      logout: 'ログアウト', account: 'マイアカウント', accountMenu: 'アカウントメニュー',
    },
    hero: {
      headline: '自信を持って次の住まいを見つける',
      subtitle: '地域の専門知識。誠実なアドバイス。データに基づく洞察。ニューヨーク最高級物件へのパーソナルガイド。',
      ctaBuy: '物件を探す', ctaSell: '物件を売る', ctaTalk: 'Spencerに相談',
    },
    stats: {
      experience: '年の経験', transactions: '成約件数',
      volume: '総売上高', neighborhoods: 'NYCエリア',
    },
    footer: { tagline: 'ニューヨークの高級不動産アドバイザリー', rights: '無断転載を禁じます。' },
    properties: { title: '注目物件', subtitle: 'ニューヨーク最高の住まいの厳選' },
    testimonials: { title: 'お客様の声', subtitle: 'Spencerとの取引について' },
    videos: { title: 'マーケット洞察とツアー', subtitle: 'エリア、購入のヒント、市場動向の短編動画' },
    social: { title: 'Spencerをフォロー', instagram: 'Instagram', linkedin: 'LinkedIn', instagramHandle: '@artgroup.nyc' },
    cta: {
      readyTitle: '次の一歩の準備はできていますか？',
      readySubtitle: '購入でも売却でも、Spencerが求める専門性と擁護を提供します。',
      schedule: '相談を予約',
    },
    contact: {
      title: 'お問い合わせ', subtitle: '購入、売却、市場の探索？Spencerが直接お返事します。',
      send: 'メッセージを送信', success: 'ありがとうございます。Spencerからすぐにご連絡します。',
    },
    blog: { title: 'マーケット洞察', subtitle: 'NYC不動産の専門分析', readMore: '記事を読む', noPosts: '記事はまだありません。', back: '洞察に戻る' },
    about: {
      title: 'NYC不動産の信頼できるガイド',
      subtitle: 'Spencer Tingは深い市場知識、粘り強い擁護、グローバルな視点をもたらします。',
    },
    pages: { notFound: { title: 'ページが見つかりません', back: 'ホームに戻る' } },
  },
  ko: {
    lang: { label: '언어' },
    nav: {
      home: '홈', about: 'Spencer 소개', properties: '매물', neighborhoods: '동네',
      buy: '구매', sell: '판매', blog: '시장 인사이트', tools: '도구',
      mortgage: '모기지 계산기', contact: '문의', login: '로그인',
      logout: '로그아웃', account: '내 계정', accountMenu: '계정 메뉴',
    },
    hero: {
      headline: '자신 있게 다음 집을 찾으세요',
      subtitle: '현지 전문성. 정직한 조언. 데이터 기반 인사이트. 뉴욕 최고의 부동산을 위한 맞춤 안내.',
      ctaBuy: '집 찾기', ctaSell: '집 팔기', ctaTalk: 'Spencer와 상담',
    },
    stats: {
      experience: '년 경력', transactions: '완료 거래',
      volume: '총 판매 규모', neighborhoods: 'NYC 동네',
    },
    footer: { tagline: '뉴욕 럭셔리 부동산 자문', rights: '모든 권리 보유.' },
    properties: { title: '추천 매물', subtitle: '뉴욕 최고의 주거지 엄선' },
    testimonials: { title: '고객 이야기', subtitle: 'Spencer와 함께한 경험' },
    videos: { title: '시장 인사이트 & 투어', subtitle: '동네, 구매 팁, 시장 동향 영상' },
    social: { title: 'Spencer 팔로우', instagram: 'Instagram', linkedin: 'LinkedIn', instagramHandle: '@artgroup.nyc' },
    cta: {
      readyTitle: '다음 단계를 준비하셨나요?',
      readySubtitle: '구매든 판매든 Spencer가 필요한 전문성과 대변을 제공합니다.',
      schedule: '상담 예약',
    },
    contact: {
      title: '문의하기', subtitle: '구매, 판매, 시장 탐색? Spencer가 직접 답변합니다.',
      send: '메시지 보내기', success: '감사합니다! Spencer가 곧 연락드립니다.',
    },
    blog: { title: '시장 인사이트', subtitle: 'NYC 부동산 전문 분석', readMore: '기사 읽기', noPosts: '아직 게시된 기사가 없습니다.', back: '인사이트로 돌아가기' },
    about: {
      title: '신뢰할 수 있는 NYC 부동산 가이드',
      subtitle: 'Spencer Ting은 깊은 시장 지식, 끊임없는 대변, 글로벌 시각을 제공합니다.',
    },
    pages: { notFound: { title: '페이지를 찾을 수 없습니다', back: '홈으로' } },
  },
  he: {
    lang: { label: 'שפה' },
    nav: {
      home: 'בית', about: 'על Spencer', properties: 'נכסים', neighborhoods: 'שכונות',
      buy: 'קנייה', sell: 'מכירה', blog: 'תובנות שוק', tools: 'כלים',
      mortgage: 'מחשבון משכנתא', contact: 'צור קשר', login: 'התחברות',
      logout: 'התנתקות', account: 'החשבון שלי', accountMenu: 'תפריט חשבון',
    },
    hero: {
      headline: 'מצאו את הבית הבא שלכם בביטחון',
      subtitle: 'מומחיות מקומית. ייעוץ כנה. תובנות מבוססות נתונים. ליווי אישי לנכסים הטובים ביותר בניו יורק.',
      ctaBuy: 'מצאו בית', ctaSell: 'מכרו את הבית', ctaTalk: 'דברו עם Spencer',
    },
    stats: {
      experience: 'שנות ניסיון', transactions: 'עסקאות שנסגרו',
      volume: 'נפח מכירות כולל', neighborhoods: 'שכונות ב-NYC',
    },
    footer: { tagline: 'ייעוץ נדל״ן יוקרתי בניו יורק', rights: 'כל הזכויות שמורות.' },
    properties: { title: 'נכסים נבחרים', subtitle: 'מבחר המגורים הטובים ביותר בניו יורק' },
    testimonials: { title: 'סיפורי לקוחות', subtitle: 'מה לקוחות אומרים על Spencer' },
    videos: { title: 'תובנות וסיורים', subtitle: 'סרטונים קצרים על שכונות, קנייה ושוק' },
    social: { title: 'עקבו אחר Spencer', instagram: 'Instagram', linkedin: 'LinkedIn', instagramHandle: '@artgroup.nyc' },
    cta: {
      readyTitle: 'מוכנים לצעד הבא?',
      readySubtitle: 'בין אם קונים או מוכרים, Spencer מספק את המומחיות וההגנה שמגיעה לכם.',
      schedule: 'קבעו ייעוץ',
    },
    contact: {
      title: 'צרו קשר', subtitle: 'קנייה, מכירה או חקירת השוק? Spencer עונה באופן אישי.',
      send: 'שלחו הודעה', success: 'תודה! Spencer ייצור קשר בקרוב.',
    },
    blog: { title: 'תובנות שוק', subtitle: 'ניתוח מומחה של שוק הנדל״ן ב-NYC', readMore: 'קראו מאמר', noPosts: 'עדיין אין מאמרים.', back: 'חזרה לתובנות' },
    about: {
      title: 'המדריך המהימן שלכם לנדל״ן ב-NYC',
      subtitle: 'Spencer Ting מביא ידע שוק עמוק, הגנה בלתי מתפשרת ופרספקטיבה גלובלית.',
    },
    pages: { notFound: { title: 'הדף לא נמצא', back: 'חזרה לבית' } },
  },
  tr: {
    lang: { label: 'Dil' },
    nav: {
      home: 'Ana Sayfa', about: 'Spencer Hakkında', properties: 'Mülkler', neighborhoods: 'Mahalleler',
      buy: 'Satın Al', sell: 'Sat', blog: 'Piyasa İçgörüleri', tools: 'Araçlar',
      mortgage: 'Mortgage Hesaplayıcı', contact: 'İletişim', login: 'Giriş',
      logout: 'Çıkış', account: 'Hesabım', accountMenu: 'Hesap menüsü',
    },
    hero: {
      headline: 'Bir sonraki evinizi güvenle bulun',
      subtitle: 'Yerel uzmanlık. Dürüst tavsiye. Veriye dayalı içgörüler. New York\'un en iyi mülkleri için kişisel rehberlik.',
      ctaBuy: 'Ev bul', ctaSell: 'Evinizi satın', ctaTalk: 'Spencer ile konuşun',
    },
    stats: {
      experience: 'Yıllık deneyim', transactions: 'Tamamlanan işlemler',
      volume: 'Toplam satış hacmi', neighborhoods: 'NYC mahalleleri',
    },
    footer: { tagline: 'New York\'ta lüks gayrimenkul danışmanlığı', rights: 'Tüm hakları saklıdır.' },
    properties: { title: 'Öne çıkan mülkler', subtitle: 'New York\'un en iyi konutlarından seçkiler' },
    testimonials: { title: 'Müşteri hikayeleri', subtitle: 'Spencer ile çalışanların yorumları' },
    videos: { title: 'Piyasa içgörüleri ve turlar', subtitle: 'Mahalleler, satın alma ve piyasa hakkında kısa videolar' },
    social: { title: 'Spencer\'ı takip edin', instagram: 'Instagram', linkedin: 'LinkedIn', instagramHandle: '@artgroup.nyc' },
    cta: {
      readyTitle: 'Harekete geçmeye hazır mısınız?',
      readySubtitle: 'Alırken veya satarken Spencer hak ettiğiniz uzmanlık ve savunuculuğu sunar.',
      schedule: 'Danışmanlık planlayın',
    },
    contact: {
      title: 'İletişime geçin', subtitle: 'Satın almak, satmak veya piyasayı keşfetmek mi? Spencer kişisel olarak yanıtlar.',
      send: 'Mesaj gönder', success: 'Teşekkürler! Spencer kısa sürede iletişime geçecek.',
    },
    blog: { title: 'Piyasa içgörüleri', subtitle: 'NYC gayrimenkul piyasası uzman analizi', readMore: 'Makaleyi oku', noPosts: 'Henüz makale yok.', back: 'İçgörülere dön' },
    about: {
      title: 'NYC gayrimenkulünde güvenilir rehberiniz',
      subtitle: 'Spencer Ting derin piyasa bilgisi, kararlı savunuculuk ve küresel bakış açısı getirir.',
    },
    pages: { notFound: { title: 'Sayfa bulunamadı', back: 'Ana sayfaya dön' } },
  },
};

for (const [code, data] of Object.entries(t)) {
  const locale = {
    ...data,
    lang: {
      ...data.lang,
      continents: continents[code],
    },
  };
  writeFileSync(join(localesDir, `${code}.json`), `${JSON.stringify(locale, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${code}.json`);
}
