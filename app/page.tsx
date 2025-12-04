'use client';

import React, { useState, useEffect } from 'react';
import {
  Twitter,
  Instagram,
  Music,
  Star,
  Heart,
  Calendar,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  PlayCircle,
  Sparkles,
  Smile,
  ArrowRight,
  Users,
  Ticket,
  Flame,
  Radio,
  Youtube,
  Crown,
  Headphones,
  Mail
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ---------------------------
// 型定義 (TypeScriptの肝)
// ---------------------------

// メンバー情報の型を定義
interface Member {
  name: string;
  romaji: string;
  birthday: string;
  colorName: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  btnColor: string;
  twitter: string;
  tiktok: string;
  emoji: string;
  image: string;
  description: string;
}

// スケジュール情報の型を定義
interface ScheduleItem {
  date: string;
  day: string;
  title: string;
  cat: string;
  color: string;
  text: string;
}

interface Highlight {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  gradient: string;
}

interface ReleaseLink {
  label: string;
  url: string;
  accent: string;
}

interface ReleaseHighlight {
  title: string;
  description: string;
  releaseDate: string;
  cover: string;
  stats: string;
  hashtags: string[];
  links: ReleaseLink[];
  previewUrl: string;
}

interface MediaFeature {
  title: string;
  description: string;
  tag: string;
  url: string;
}

interface FanClubTier {
  name: string;
  price: string;
  highlight: string;
  perks: string[];
  accent: string;
}

// Props (コンポーネントに渡す引数) の型定義
interface TikTokIconProps {
  size?: number;
  className?: string;
}

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackEmoji: string;
  className?: string;
  containerClassName?: string;
}

interface MemberDetailProps {
  member: Member | null;
  onClose: () => void;
}

interface MemberCardProps {
  member: Member;
  onClick: (member: Member) => void;
}

interface SectionTitleProps {
  en: string;
  jp: string;
  color?: string;
}

// ---------------------------
// コンポーネント実装
// ---------------------------

// TikTok Icon Component
const TikTokIcon: React.FC<TikTokIconProps> = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Helper Component for Images with Fallback
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, fallbackEmoji, className, containerClassName }) => {
  const [error, setError] = useState<boolean>(false);

  const encodedSrc = src ? encodeURI(src) : '';

  if (error || !encodedSrc) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gray-50 text-gray-300 select-none ${containerClassName}`}>
        <span className="text-6xl md:text-8xl filter grayscale opacity-50">{fallbackEmoji}</span>
      </div>
    );
  }

  return <img src={encodedSrc} alt={alt} className={className} onError={() => setError(true)} />;
};

// Member Detail Modal
const MemberDetail: React.FC<MemberDetailProps> = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-sm"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className={`w-full md:w-1/2 relative min-h-[400px] md:min-h-full bg-gray-100`}>
          <div className={`absolute inset-0 ${member.bgColor} opacity-20`}></div>

          <ImageWithFallback
            src={member.image}
            alt={member.name}
            fallbackEmoji={member.emoji}
            className="w-full h-full object-cover relative z-10"
            containerClassName="absolute inset-0 z-0"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20 pointer-events-none"></div>

          <div className="absolute bottom-6 left-6 text-white z-30 pointer-events-none">
            <div className="text-6xl md:text-8xl font-black opacity-20 tracking-tighter leading-none select-none">{member.birthday.split('/')[1]}</div>
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white relative overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-sm ${member.btnColor}`}>{member.colorName}担当</span>
            <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">Member Profile</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-1">{member.name}</h2>
          <p className="text-gray-400 font-bold tracking-[0.2em] mb-8 text-sm uppercase">{member.romaji}</p>

          <div className="space-y-8 mb-10">
            <div>
              <h4 className="flex items-center gap-2 font-bold text-gray-800 mb-3 text-lg border-b border-gray-100 pb-2">
                <Star size={20} className="text-yellow-400 fill-current" />
                Personality & Charm
              </h4>
              <p className="text-gray-600 leading-relaxed">{member.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <span className="block text-xs text-gray-400 font-bold mb-1 tracking-wider">BIRTHDAY</span>
                <span className="font-mono text-xl font-bold text-gray-700">{member.birthday}</span>
              </div>
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <span className="block text-xs text-gray-400 font-bold mb-1 tracking-wider">SKILLS</span>
                <span className="text-sm font-bold text-gray-700">TikTok配信, ダンス</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={member.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group"
            >
              <TikTokIcon size={24} className="group-hover:scale-110 transition-transform" />
              <div>
                <span className="block text-xs font-normal opacity-70">Follow on</span>
                <span className="text-lg">TikTok</span>
              </div>
            </a>
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-gray-100 text-gray-600 font-bold hover:border-[#1DA1F2] hover:text-[#1DA1F2] hover:bg-blue-50 transition-all group"
            >
              <Twitter size={24} className="group-hover:scale-110 transition-transform" />
              <div>
                <span className="block text-xs font-normal opacity-70">Check Latest</span>
                <span className="text-lg">X (Twitter)</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Member Card Component
const MemberCard: React.FC<MemberCardProps> = ({ member, onClick }) => (
  <div
    onClick={() => onClick(member)}
    className={`relative group overflow-hidden rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 bg-white cursor-pointer transform hover:-translate-y-2`}
  >
    {/* Image Container */}
    <div className="h-80 w-full relative overflow-hidden bg-gray-50">
      <div className={`absolute inset-0 ${member.bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10`}></div>

      <ImageWithFallback
        src={member.image}
        alt={member.name}
        fallbackEmoji={member.emoji}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        containerClassName="absolute inset-0"
      />

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent z-10"></div>

      <div className="absolute bottom-4 left-4 z-20 text-white">
        <h3 className="text-2xl font-black tracking-tight mb-0 drop-shadow-md">{member.name}</h3>
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-90">{member.romaji}</p>
      </div>

      <div className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full ${member.bgColor} border-2 border-white shadow-md flex items-center justify-center text-white`}>
        <Heart size={18} fill="currentColor" />
      </div>
    </div>

    {/* Bottom Action Area */}
    <div className="p-4 bg-white flex justify-between items-center border-t border-gray-100">
      <div className="text-xs font-bold text-gray-400 pl-2">🎂 {member.birthday}</div>
      <div className={`text-sm font-bold ${member.textColor} flex items-center gap-1 group-hover:translate-x-1 transition-transform`}>
        VIEW PROFILE <ArrowRight size={14} />
      </div>
    </div>
  </div>
);

// Section Title Component
const SectionTitle: React.FC<SectionTitleProps> = ({ en, jp, color = 'from-blue-600 to-purple-600' }) => (
  <div className="text-center mb-16 relative">
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-9xl font-black text-gray-100 uppercase tracking-widest select-none -z-10 whitespace-nowrap opacity-50">
      {en}
    </span>
    <h2 className={`text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${color} tracking-tighter mb-2 drop-shadow-sm`}>
      {en}
    </h2>
    <p className="text-sm md:text-base text-gray-500 font-bold tracking-[0.2em]">{jp}</p>
    <div className="flex justify-center gap-1 mt-4">
      <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
      <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce animation-delay-200"></div>
      <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce animation-delay-400"></div>
    </div>
  </div>
);

// Main Page Component
export default function TryVII_LP() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const members: Member[] = [
    {
      name: '佐々木 梨華',
      romaji: 'SASAKI RIKA',
      birthday: '10/5',
      colorName: 'RED',
      borderColor: 'border-red-500',
      bgColor: 'bg-red-500',
      textColor: 'text-red-500',
      btnColor: 'bg-red-500',
      twitter: 'https://x.com/rika_sasaki_1',
      tiktok: 'https://www.tiktok.com/@a______y03',
      emoji: '🌹',
      image: '/sasakirika.png',
      description:
        'TryVIIの情熱的なリーダー的存在。そのパフォーマンスは見る人すべてを惹きつける力を持つ。普段の愛らしい笑顔と、ステージ上でのクールな表情のギャップが最大の魅力。'
    },
    {
      name: '成宮 るる',
      romaji: 'NARIMIYA RURU',
      birthday: '10/22',
      colorName: 'BLUE',
      borderColor: 'border-blue-600',
      bgColor: 'bg-blue-600',
      textColor: 'text-blue-600',
      btnColor: 'bg-blue-600',
      twitter: 'https://x.com/na_sanhira',
      tiktok: 'https://www.tiktok.com/@r.r.r.r.r.r.n',
      emoji: '🐬',
      image: '/narimiyaruru.png',
      description:
        '透き通るような歌声を持つ、グループのクールビューティー。冷静沈着に見えて実は誰よりも熱いハートの持ち主。ファン想いで、TikTokライブでの丁寧な対応が評判。'
    },
    {
      name: '桜叶 さら',
      romaji: 'SAKURAKANA SARA',
      birthday: '3/24',
      colorName: 'LIGHT BLUE',
      borderColor: 'border-cyan-400',
      bgColor: 'bg-cyan-400',
      textColor: 'text-cyan-400',
      btnColor: 'bg-cyan-400',
      twitter: 'https://x.com/s024ra',
      tiktok: 'https://www.tiktok.com/@s024ra',
      emoji: '☁️',
      image: '/sakurakanasara.png',
      description:
        'ふわふわとした癒やしのオーラを纏う、TryVIIの天使担当。彼女がいるだけで場の空気が和む。しかしダンスとなるとキレのある動きを見せる、努力家な一面も。'
    },
    {
      name: '姫河 未悠',
      romaji: 'HIMEKAWA MIYU',
      birthday: '4/27',
      colorName: 'PURPLE',
      borderColor: 'border-purple-500',
      bgColor: 'bg-purple-500',
      textColor: 'text-purple-500',
      btnColor: 'bg-purple-500',
      twitter: 'https://x.com/mi_tyanai',
      tiktok: 'https://www.tiktok.com/@min.k24',
      emoji: '🦄',
      image: '/himekawamiyu.png',
      description:
        'ミステリアスな魅力を放つパープル担当。独特の世界観を持ち、その表現力は唯一無二。ファッションセンスも抜群で、グループのおしゃれ番長としても知られる。'
    },
    {
      name: '星咲 のんの',
      romaji: 'HOSHISAKI NONNO',
      birthday: '6/1',
      colorName: 'YELLOW',
      borderColor: 'border-yellow-400',
      bgColor: 'bg-yellow-400',
      textColor: 'text-yellow-500',
      btnColor: 'bg-yellow-400',
      twitter: 'https://x.com/_nonnon__k',
      tiktok: 'https://www.tiktok.com/@nonno.0701',
      emoji: '🌻',
      image: '/hoshisakinonno.png',
      description:
        '太陽のような明るさで周りを照らす、元気印のひまわりガール。彼女の笑顔を見ると悩みも吹き飛ぶと評判。トーク力も高く、MCなどでも活躍が期待される。'
    },
    {
      name: '古山 菜々美',
      romaji: 'FURUYAMA NANAMI',
      birthday: '7/26',
      colorName: 'PINK',
      borderColor: 'border-pink-400',
      bgColor: 'bg-pink-400',
      textColor: 'text-pink-400',
      btnColor: 'bg-pink-400',
      twitter: 'https://x.com/nanamin__26',
      tiktok: 'https://www.tiktok.com/@nanacon.26',
      emoji: '🎀',
      image: '/furuyamananami.png',
      description:
        '王道アイドル、ピンク担当。可愛らしさ全開の振る舞いは天性のアイドル。ファン一人ひとりを大切にし、釣師としての才能も発揮する。甘いものが大好き。'
    },
    {
      name: '楠 つきみ',
      romaji: 'KUSUNOKI TSUKIMI',
      birthday: '9/10',
      colorName: 'WHITE',
      borderColor: 'border-gray-300',
      bgColor: 'bg-gray-200',
      textColor: 'text-gray-500',
      btnColor: 'bg-gray-400',
      twitter: 'https://x.com/9tamaconnyapi',
      tiktok: 'https://www.tiktok.com/@tamaconnyapi',
      emoji: '🌙',
      image: '/kusunokitsukimi.png',
      description:
        '純白のようなピュアな心を持つ最年少的な存在。何色にも染まれる可能性を秘めている。成長スピードが早く、これからの覚醒が最も楽しみなメンバー。'
    }
  ];

  const schedule: ScheduleItem[] = [
    { date: '2025.11.25', day: 'SAT', title: 'TikTok LIVE 定期配信', cat: 'LIVE', color: 'bg-pink-500', text: 'text-pink-500' },
    { date: '2025.12.01', day: 'FRI', title: 'デビュー記念 ファンミーティング in Tokyo', cat: 'EVENT', color: 'bg-blue-500', text: 'text-blue-500' },
    { date: '2025.12.15', day: 'FRI', title: '新曲『Victory Seven』MV公開予定', cat: 'RELEASE', color: 'bg-purple-500', text: 'text-purple-500' },
    { date: '2025.12.24', day: 'SUN', title: 'クリスマス特別ライブ配信', cat: 'LIVE', color: 'bg-pink-500', text: 'text-pink-500' }
  ];

  const highlights: Highlight[] = [
    {
      label: 'SNS TOTAL REACH',
      value: '2.8M+',
      detail: 'TikTok / Instagram 月間インプレッション (国内外合計)',
      icon: Users,
      gradient: 'from-pink-500/90 via-fuchsia-500/80 to-purple-500/90'
    },
    {
      label: 'SOLD OUT SHOWS',
      value: '12',
      detail: 'Zepp Tokyo & Osaka、冬ツアー全通完売',
      icon: Ticket,
      gradient: 'from-orange-400/90 via-pink-400/80 to-red-400/90'
    },
    {
      label: 'PLAYLIST PICKS',
      value: '37',
      detail: '各配信サービスのエディトリアルプレイリスト選出数',
      icon: Headphones,
      gradient: 'from-blue-500/80 via-cyan-400/80 to-emerald-400/80'
    },
    {
      label: 'TRENDING TAG',
      value: '#TryTogether',
      detail: 'TikTok JAPAN チャレンジランキング TOP5入り',
      icon: Flame,
      gradient: 'from-purple-500/80 via-indigo-500/80 to-blue-600/80'
    }
  ];

  const featuredRelease: ReleaseHighlight = {
    title: 'Victory Seven',
    description: '疾走感のあるフューチャーベースに乗せた、デビュー前夜を描くキラーチューン。ライブでのコール&レスポンスも研究された一曲。',
    releaseDate: '2025.12.15 Digital Release',
    cover: '/window.svg',
    stats: 'TikTokプリリース視聴 1.2M / Pre-save 38K',
    hashtags: ['#VictorySeven', '#TryVII', '#TikTokBornIdols'],
    previewUrl:
      'https://cdn.pixabay.com/download/audio/2023/03/23/audio_d25cbbb24a.mp3?filename=future-bass-pop-146692.mp3',
    links: [
      { label: 'Listen on Spotify', url: 'https://open.spotify.com/', accent: 'from-green-400 to-emerald-500' },
      { label: 'Apple Music', url: 'https://music.apple.com/', accent: 'from-red-400 to-pink-500' },
      { label: 'Lyric Video', url: 'https://www.youtube.com/', accent: 'from-slate-700 to-slate-900' }
    ]
  };

  const mediaFeatures: MediaFeature[] = [
    {
      title: 'FRUITS ZIPPER コラボ TikTok Challenge',
      description: '人気振付師Miyu監修のクロスオーバーダンスで1週間1500万再生を記録。',
      tag: 'COLLAB',
      url: 'https://www.tiktok.com/'
    },
    {
      title: 'とき宣 Radio Guest On Air',
      description: '文化放送「アイドルホリデー」でTryVIIの未公開エピソードを紹介。',
      tag: 'ON AIR',
      url: 'https://www.joqr.co.jp/'
    },
    {
      title: 'きゅるりんってしてみて FES 出演',
      description: '原宿U-Stageでの屋外フェス出演と舞台裏ミニドキュメンタリーを公開。',
      tag: 'LIVE',
      url: 'https://note.com/'
    }
  ];

  const fanClubTiers: FanClubTier[] = [
    {
      name: 'DIGITAL PASS',
      price: '¥550 / month',
      highlight: '最速ニュース & バックステージ',
      perks: ['メンバー直筆メッセ', 'デジタルフォトセット', '限定TikTokライブアーカイブ'],
      accent: 'from-blue-500 to-cyan-400'
    },
    {
      name: 'PREMIUM CREW',
      price: '¥3,600 / month',
      highlight: 'オンラインミート&グリート + リハ観覧抽選',
      perks: ['個別Q&Aルーム', '公開リハ見学', '生誕グッズ優先購入'],
      accent: 'from-purple-500 to-pink-500'
    },
    {
      name: 'HALL TOUR VIP',
      price: '¥18,000 / year',
      highlight: 'Zeppツアー最前ブロック確約 (各公演1回)',
      perks: ['FC番号入りラミネート', 'ツアー別フォトブック', 'サポーターズクレジット掲載'],
      accent: 'from-amber-500 to-red-400'
    }
  ];

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus('idle'), 4000);
  };

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen selection:bg-pink-200">
      {/* Detail Modal */}
      {selectedMember && <MemberDetail member={selectedMember} onClose={() => setSelectedMember(null)} />}

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className={`text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">TryVII</span>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex space-x-8 font-bold text-sm tracking-widest ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>
            <a href="#about" className="hover:text-pink-500 transition-colors flex items-center gap-1">
              <Star size={14} /> ABOUT
            </a>
            <a href="#members" className="hover:text-pink-500 transition-colors flex items-center gap-1">
              <Heart size={14} /> MEMBERS
            </a>
            <a href="#media" className="hover:text-pink-500 transition-colors flex items-center gap-1">
              <Music size={14} /> MEDIA
            </a>
            <a href="#schedule" className="hover:text-pink-500 transition-colors flex items-center gap-1">
              <Calendar size={14} /> SCHEDULE
            </a>
            <a href="#fanclub" className="hover:text-pink-500 transition-colors flex items-center gap-1">
              <Crown size={14} /> FANCLUB
            </a>
            <a href="#contact" className="hover:text-pink-500 transition-colors">
              CONTACT
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${isScrolled ? 'text-gray-800' : 'text-white'} focus:outline-none`}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 flex flex-col items-center space-y-6 font-bold text-gray-600 rounded-b-3xl">
            <a href="#about" onClick={() => setIsMenuOpen(false)}>
              ABOUT
            </a>
            <a href="#members" onClick={() => setIsMenuOpen(false)}>
              MEMBERS
            </a>
            <a href="#media" onClick={() => setIsMenuOpen(false)}>
              MEDIA
            </a>
            <a href="#schedule" onClick={() => setIsMenuOpen(false)}>
              SCHEDULE
            </a>
            <a href="#fanclub" onClick={() => setIsMenuOpen(false)}>
              FANCLUB
            </a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>
              CONTACT
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section with Group Photo */}
      <header className="relative h-screen flex items-end justify-center overflow-hidden bg-gray-900 pb-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 bg-gray-900">
          <ImageWithFallback src="/TryVIIsyugoshashin.jpg" alt="TryVII Members" fallbackEmoji="🎤" className="w-full h-full object-cover object-center" />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30"></div>
        </div>

        <div className="relative z-10 text-center px-4 w-full max-w-5xl">
          <div className="animate-fade-in-up flex flex-col items-center">
            <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 font-bold tracking-widest mb-4 text-sm md:text-base animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              ✨ 2025.02 DEBUT ✨
            </div>

            <h1 className="text-7xl md:text-[10rem] font-black text-white mb-2 tracking-tighter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] leading-none">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400">TryVII</span>
            </h1>

            <p className="text-white text-xl md:text-3xl font-bold tracking-[0.3em] mt-2 mb-8 drop-shadow-md flex items-center justify-center gap-3 w-full text-center">
              <span className="hidden md:block h-px w-12 bg-white/60"></span>
              Try Together, Win as VII
              <span className="hidden md:block h-px w-12 bg-white/60"></span>
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center w-full md:w-auto">
              <a href="https://www.tiktok.com/@tryvii_official" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105">
                <TikTokIcon /> Official TikTok
              </a>
              <a href="#about" className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all">
                MORE INFO
              </a>
            </div>
          </div>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="text-white/70 w-8 h-8" />
          </div>
        </div>
      </header>

      {/* Highlight Section */}
      <section className="py-24 bg-[#05031a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-72 h-72 bg-pink-500/40 blur-[120px] rounded-full absolute -top-10 left-10"></div>
          <div className="w-96 h-96 bg-indigo-500/40 blur-[160px] rounded-full absolute bottom-0 right-0"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle en="DIGITAL POWER" jp="最新実績と勢い" color="from-blue-200 to-pink-200" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.35)]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}></div>
                  <div className="relative p-8 flex flex-col gap-4 min-h-[220px] bg-slate-900/30 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                      <Icon size={26} className="text-white" />
                    </div>
                    <p className="text-[10px] font-bold tracking-[0.4em] text-white/70">{item.label}</p>
                    <h3 className="text-4xl font-black tracking-tight drop-shadow-lg">{item.value}</h3>
                    <p className="text-sm text-white/80 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-20 right-10 text-pink-50 animate-spin-slow pointer-events-none">
          <Star size={200} />
        </div>
        <div className="absolute bottom-20 left-10 text-blue-50 animate-bounce pointer-events-none">
          <Heart size={150} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle en="WHO WE ARE" jp="私たちについて" color="from-pink-500 to-purple-500" />

          <div className="bg-white/80 backdrop-blur-sm rounded-[3rem] p-8 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-3xl font-black mb-6 text-gray-800">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">TikTok</span>から生まれた
                  <br />奇跡の7人組。
                </h3>
                <p className="text-gray-600 leading-loose mb-6 font-medium">
                  「Try（挑戦）」と「VII（7人）」。
                  <br />その名の通り、常に新しいことに挑み続ける7人の少女たち。
                  <br />2025年2月、過酷なオーディションを勝ち抜き、
                  <br />デジタルネイティブな感性で世界を目指す。
                </p>
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full text-orange-600 font-bold shadow-sm">
                  <Sparkles size={20} />
                  <span>Debut Live: 1,000,000 Diamonds</span>
                </div>
              </div>

              <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-6 rounded-3xl text-center transform hover:-translate-y-2 transition-transform shadow-sm">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">👑</div>
                  <h4 className="font-bold text-blue-800 mb-2">Try</h4>
                  <p className="text-xs text-blue-600">
                    何度でも挑戦する
                    <br />不屈の精神
                  </p>
                </div>
                <div className="bg-pink-50 p-6 rounded-3xl text-center transform hover:-translate-y-2 transition-transform mt-8 shadow-sm">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">🤝</div>
                  <h4 className="font-bold text-pink-800 mb-2">Win</h4>
                  <p className="text-xs text-pink-600">
                    7人で掴み取る
                    <br />最高の勝利
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section id="members" className="py-24 bg-gradient-to-b from-blue-50 to-pink-50">
        <div className="container mx-auto px-6">
          <SectionTitle en="MEMBERS" jp="メンバー紹介" color="from-blue-600 to-pink-600" />
          <p className="text-center text-gray-500 mb-12 font-bold animate-pulse flex items-center justify-center gap-2">
            <span className="bg-white px-3 py-1 rounded-full shadow-sm text-xs">CLICK PHOTO</span>
            👇 画像をクリックして詳細をチェック！
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {members.map((member, index) => (
              <MemberCard key={index} member={member} onClick={setSelectedMember} />
            ))}
          </div>
        </div>
      </section>

      {/* Media / Release Section */}
      <section id="media" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle en="MEDIA HUB" jp="楽曲・映像・特集" color="from-indigo-600 to-pink-600" />
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-[0_25px_80px_rgba(15,23,42,0.08)] border border-gray-100">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 p-1 shadow-inner">
                    <ImageWithFallback
                      src={featuredRelease.cover}
                      alt={featuredRelease.title}
                      fallbackEmoji="🎧"
                      className="w-full h-full object-cover rounded-[1.5rem]"
                      containerClassName=""
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.3em] text-gray-400">NEW RELEASE</p>
                    <h3 className="text-3xl font-black text-gray-800">{featuredRelease.title}</h3>
                    <p className="text-sm text-gray-500 font-semibold">{featuredRelease.releaseDate}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{featuredRelease.description}</p>
                <div className="flex flex-wrap gap-3">
                  {featuredRelease.hashtags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-semibold bg-gray-100 rounded-full text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <Radio size={18} className="text-pink-500" />
                  {featuredRelease.stats}
                </div>
                <div className="flex flex-wrap gap-4">
                  {featuredRelease.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 min-w-[180px] flex items-center justify-between px-5 py-3 text-sm font-bold text-white rounded-2xl bg-gradient-to-r ${link.accent} shadow-lg hover:scale-[1.01] transition-transform`}
                    >
                      {link.label}
                      <ExternalLink size={16} />
                    </a>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-gray-600 font-semibold text-sm uppercase tracking-[0.3em]">
                    <Music size={18} /> Preview
                  </div>
                  <audio controls className="w-full" src={featuredRelease.previewUrl} />
                </div>
              </div>
            </div>

            <div className="bg-[#0b0637] text-white rounded-[3rem] p-8 md:p-10 shadow-[0_30px_90px_rgba(8,7,37,0.8)] border border-white/5 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-pink-500/30 blur-3xl rounded-full"></div>
              <div className="relative space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs tracking-[0.3em]">
                  <Youtube size={16} /> VISUALIZER
                </div>
                <h3 className="text-3xl font-black leading-tight">Debut Countdown Documentary</h3>
                <p className="text-sm text-white/70">
                  海外アイドルフェスで人気の映像演出を参考にした、メンバー視点のドキュメントムービー。デビュー前夜までの54時間に密着した限定コンテンツです。
                </p>
                <div className="aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                  <iframe
                    src="https://www.youtube.com/embed/qj5zpq4QYQI"
                    title="TryVII Documentary"
                    className="w-full h-full"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
                  <PlayCircle size={16} /> WATCH & SHARE
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {mediaFeatures.map((feature) => (
              <a
                key={feature.title}
                href={feature.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[1.75rem] border border-gray-100 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-transform"
              >
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.4em] text-pink-500 mb-3">
                  {feature.tag}
                  <ArrowRight size={14} className="text-gray-400 group-hover:text-pink-500 transition-colors" />
                </span>
                <h4 className="text-xl font-black text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule / News */}
      <section id="schedule" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionTitle en="SCHEDULE" jp="スケジュール" color="from-purple-600 to-indigo-600" />

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {schedule.map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-0 cursor-pointer group">
                <div className="flex items-center gap-4 min-w-[160px]">
                  <div className={`w-2 h-12 rounded-full ${item.color}`}></div>
                  <div>
                    <div className={`text-xs font-bold ${item.text} tracking-wider`}>{item.cat}</div>
                    <div className="font-bold text-gray-800 font-mono text-lg">{item.date}</div>
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-700 group-hover:text-purple-600 transition-colors text-lg">{item.title}</h4>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Calendar size={12} /> {item.day}
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-purple-100 group-hover:text-purple-600 transition-all">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="px-10 py-4 rounded-full bg-gray-900 text-white font-bold hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">VIEW MORE</button>
          </div>
        </div>
      </section>

      {/* Fanclub & Newsletter */}
      <section id="fanclub" className="py-24 bg-gradient-to-b from-pink-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-x-0 top-16 flex justify-center pointer-events-none">
          <div className="w-64 h-64 bg-white rounded-full blur-3xl opacity-70"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle en="FANCLUB" jp="TryVII CREW" color="from-pink-600 to-purple-600" />
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-gray-600 font-medium leading-relaxed">
              フルーツジッパーやとき宣にも負けない参加導線を意識し、デジタル・リアル両面で推し活を完結できるTryVII公式コミュニティ。会員証、コンテンツ、フィジカル体験をワンストップで提供します。
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm border border-pink-100 text-pink-600 text-sm font-bold tracking-[0.2em]">
              <Smile size={16} /> WELCOME TO THE CREW
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {fanClubTiers.map((tier) => (
              <div key={tier.name} className="rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-gray-100 p-8 flex flex-col gap-4">
                <div className={`inline-flex items-center gap-2 px-4 py-1 text-xs font-bold tracking-[0.3em] text-white rounded-full bg-gradient-to-r ${tier.accent}`}>
                  <Crown size={16} />
                  {tier.name}
                </div>
                <p className="text-3xl font-black text-gray-800">{tier.price}</p>
                <p className="text-sm text-gray-500 font-semibold">{tier.highlight}</p>
                <ul className="space-y-2 text-sm text-gray-600 flex-1">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <Heart size={14} className="text-pink-400" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <button className="mt-2 w-full py-3 rounded-2xl text-sm font-bold bg-gray-900 text-white hover:bg-gray-700 transition-colors">JOIN NOW</button>
              </div>
            ))}
          </div>
          <div className="mt-12 grid lg:grid-cols-2 gap-6">
            <form onSubmit={handleNewsletterSubmit} className="bg-white/80 backdrop-blur rounded-[2rem] border border-gray-100 p-6 shadow-[0_15px_40px_rgba(15,23,42,0.08)] space-y-4">
              <p className="text-xs font-bold tracking-[0.4em] text-gray-400">NEWSLETTER</p>
              <h4 className="text-2xl font-black text-gray-800">配信・グッズの最新情報をメールでキャッチ</h4>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="newsletter"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-sm"
                    required
                  />
                </div>
                <button type="submit" className="px-6 py-3 rounded-2xl bg-pink-500 text-white font-bold hover:bg-pink-400 transition-colors">
                  NOTIFY ME
                </button>
              </div>
              <p className="text-xs text-gray-400" aria-live="polite">
                {newsletterStatus === 'success' ? 'ご登録ありがとうございます！最新情報をお届けします。' : 'いつでも購読解除できます。'}
              </p>
            </form>
            <div className="rounded-[2rem] bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 shadow-[0_20px_60px_rgba(79,70,229,0.4)]">
              <p className="text-xs font-bold tracking-[0.4em] text-white/70 mb-3">SUPPORTER CREDITS</p>
              <h4 className="text-3xl font-black mb-4">#TryTogether Wall</h4>
              <p className="text-sm text-white/80 mb-6">
                チケット当選者やクラファン支援者のハンドルネームを特設ページとエンドロールに掲載。推し活の証を残せるTryVII独自の支援プログラムです。
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="px-3 py-1 bg-white/15 rounded-full">@nonnon_crew</span>
                <span className="px-3 py-1 bg-white/15 rounded-full">@zutti_love</span>
                <span className="px-3 py-1 bg-white/15 rounded-full">@tokisen_family</span>
                <span className="px-3 py-1 bg-white/15 rounded-full">@fruitmix</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1e1b4b] text-white pt-24 pb-12 rounded-t-[3rem] mt-12 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-pink-500 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-500 rounded-full filter blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-pink-200">TryVII Official</h2>

            <div className="flex gap-6 mb-12">
              <a
                href="https://www.tiktok.com/@tryvii_official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full bg-black flex items-center justify-center hover:scale-110 transition-transform duration-300 border border-gray-700 shadow-[0_0_20px_rgba(0,0,0,0.5)] group"
              >
                <TikTokIcon size={30} className="group-hover:text-pink-400 transition-colors" />
              </a>
              <a
                href="#"
                className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:text-[#1DA1F2]"
              >
                <Twitter size={30} />
              </a>
              <a
                href="#"
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
              >
                <Instagram size={30} className="text-white" />
              </a>
              <a
                href="#"
                className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg text-white"
              >
                <PlayCircle size={30} />
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold tracking-widest text-gray-300">
              <a href="#" className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                GOODS
              </a>
              <a href="#fanclub" className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                FAN CLUB
              </a>
              <a href="#media" className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                MUSIC
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                PRIVACY POLICY
              </a>
              <a href="#" className="hover:text-white transition-colors">
                CONTACT
              </a>
            </div>
            <p>© 2025 TryVII Official. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
