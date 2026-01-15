
import React, { useState, useEffect, useCallback } from 'react';
import { 
    Users, 
    Clock, 
    TrendingUp, 
    Bell, 
    Home, 
    BarChart2, 
    User, 
    ChevronRight,
    ArrowDown,
    CheckCircle2,
    Dumbbell,
    QrCode,
    Trophy,
    ArrowLeft,
    Filter,
    LogOut,
    LogIn,
    Activity,
    Scan,
    Award,
    ShieldCheck,
    Megaphone,
    MessageSquare,
    Heart,
    MessageCircle,
    UserPlus,
    Flame,
    Navigation,
    MoreVertical,
    /* Added Info icon to fix compilation error */
    Info
} from 'lucide-react';
import { OccupancyStatus, ActivityLog, GymState } from './types';
import { STATUS_CONFIG } from './constants';

type ViewState = 'cover' | 'home' | 'trends' | 'community' | 'profile' | 'success';

const App: React.FC = () => {
    // --- State Management ---
    const [view, setView] = useState<ViewState>('cover');
    const [gymState, setGymState] = useState<GymState>({
        status: OccupancyStatus.FREE, 
        lastUpdated: new Date(Date.now() - 1000 * 60 * 2),
        estimatedCount: 3
    });

    const [logs, setLogs] = useState<ActivityLog[]>([
        { id: '1', status: OccupancyStatus.FREE, timestamp: new Date(Date.now() - 1000 * 60 * 12), userName: '204동 이웃' },
        { id: '2', status: OccupancyStatus.NORMAL, timestamp: new Date(Date.now() - 1000 * 60 * 28), userName: '101동 이웃' },
        { id: '3', status: OccupancyStatus.BUSY, timestamp: new Date(Date.now() - 1000 * 60 * 45), userName: '302동 이웃' },
        { id: '4', status: OccupancyStatus.NORMAL, timestamp: new Date(Date.now() - 1000 * 60 * 60), userName: '105동 이웃' },
    ]);

    const [timeAgo, setTimeAgo] = useState<string>('2분 전');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 2000);
    };

    const calculateTimeAgo = useCallback((date: Date) => {
        const diffInSeconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        if (diffInSeconds < 60) return '방금 전';
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
        return `${Math.floor(diffInMinutes / 60)}시간 전`;
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeAgo(calculateTimeAgo(gymState.lastUpdated));
        }, 10000);
        return () => clearInterval(timer);
    }, [gymState.lastUpdated, calculateTimeAgo]);

    const handleReport = (status: OccupancyStatus) => {
        const newTimestamp = new Date();
        setGymState({
            status,
            lastUpdated: newTimestamp,
            estimatedCount: status === OccupancyStatus.FREE ? 3 : status === OccupancyStatus.NORMAL ? 6 : 18
        });
        const newLog: ActivityLog = {
            id: Date.now().toString(),
            status,
            timestamp: newTimestamp,
            userName: '나 (본인)'
        };
        setLogs([newLog, ...logs.slice(0, 5)]);
        setView('success');
        setTimeout(() => setView('home'), 3000);
    };

    const currentConfig = STATUS_CONFIG[gymState.status];

    // --- Sub-screens ---

    const CoverScreen = () => (
        <div className="flex flex-col min-h-screen bg-[#060910] text-white px-8 pb-12 pt-8 justify-center items-center text-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/20 rounded-full blur-[140px] pointer-events-none opacity-60"></div>
            
            <div className="flex flex-col items-center justify-center space-y-8 w-full relative z-10 max-w-[280px]">
                <div className="space-y-4">
                    <div className="w-20 h-20 bg-[#131823] border border-white/10 rounded-[28px] flex items-center justify-center mx-auto shadow-2xl relative">
                        <Dumbbell className="w-10 h-10 text-white" />
                    </div>
                    <div className="space-y-0">
                        <h1 className="text-[52px] font-black italic tracking-tighter leading-none drop-shadow-2xl">GymNow</h1>
                        <p className="text-[#34D399] font-black tracking-[0.4em] text-[10px] opacity-80 mt-1">짐 나 우</p>
                    </div>
                    <p className="text-lg font-bold text-slate-300 leading-tight">
                        우리 단지 헬스장,<br />지금 어때요?
                    </p>
                </div>

                <button 
                    onClick={() => setView('home')}
                    className="w-full max-w-[180px] h-14 bg-white text-black rounded-full font-black text-base flex items-center justify-center gap-2 shadow-[0_12px_35px_rgba(255,255,255,0.1)] active:scale-95 transition-all duration-300 mt-2"
                >
                    <span>입장하기</span>
                    <ChevronRight className="w-4 h-4" strokeWidth={3} />
                </button>

                <div className="space-y-3 pt-4 animate-in fade-in slide-in-from-bottom-1 duration-700">
                    <div className="relative inline-block">
                        <div className="relative w-12 h-12 bg-[#131823]/60 backdrop-blur-md border border-white/10 rounded-[16px] flex items-center justify-center mx-auto shadow-lg">
                            <QrCode className="w-6 h-6 text-primary/70" />
                            <div className="absolute -top-1 -right-1 bg-primary text-black p-0.5 rounded shadow-lg">
                                <Scan size={8} strokeWidth={4} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-0.5 px-4">
                        <p className="text-[13px] font-black text-white">
                            QR 스캔으로 즉시 확인
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                            단지 내 설치된 QR을 스캔해보세요
                        </p>
                    </div>
                </div>
            </div>
            
            <footer className="absolute bottom-10 opacity-10">
                <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.3em]">Real-time Gym Occupancy System</p>
            </footer>
        </div>
    );

    const HomeScreen = () => (
        <div className="flex flex-col min-h-screen bg-background pb-32 animate-in fade-in duration-500">
            <header className="sticky top-0 z-50 flex items-center justify-between p-6 bg-background/80 backdrop-blur-md">
                <button onClick={() => setView('community')} className="p-2 bg-surface rounded-xl border border-white/5 relative active:scale-90 transition-transform">
                    <Bell className="w-5 h-5 text-primary" />
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-busy rounded-full border border-background"></div>
                </button>
                <div className="flex flex-col items-center cursor-pointer active:opacity-70 transition-opacity" onClick={() => showToast('아파트 단지를 변경할 수 있는 기능이 준비 중입니다.')}>
                    <h1 className="text-xl font-black italic tracking-tighter">GymNow</h1>
                    <div className="flex items-center gap-1">
                        <Navigation size={8} className="text-primary fill-primary" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">서울숲 자이</span>
                    </div>
                </div>
                <button onClick={() => setView('profile')} className="w-10 h-10 bg-surface rounded-full border border-white/5 overflow-hidden flex items-center justify-center active:scale-90 transition-transform">
                   <User className="w-5 h-5 text-slate-500" />
                </button>
            </header>

            <main className="px-6 pt-2 space-y-8 flex flex-col items-center">
                <div className="relative mt-2">
                    <div className={`w-48 h-48 rounded-full border-[2.5px] ${currentConfig.ringColor} flex items-center justify-center relative bg-[#0e121d] shadow-[0_0_60px_rgba(0,0,0,0.5)]`}>
                        <div className={`absolute inset-0 rounded-full blur-[35px] opacity-20 ${currentConfig.bgColor}`}></div>
                        <div className="relative z-10 flex flex-col items-center">
                            {gymState.status === OccupancyStatus.FREE ? (
                                <Activity className="w-14 h-14 text-[#34d399]" strokeWidth={2.2} />
                            ) : (
                                <Users className={`w-14 h-14 ${currentConfig.color}`} strokeWidth={2.2} />
                            )}
                        </div>
                        <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-black text-[10px] flex items-center gap-1.5 shadow-xl border border-white/10 ${currentConfig.bgColor} text-black uppercase tracking-widest`}>
                            {currentConfig.badge}
                        </div>
                    </div>
                </div>

                <div className="text-center space-y-1.5">
                    <h2 className="text-3xl font-black tracking-tight leading-none">{currentConfig.label}</h2>
                    <p className="text-slate-400 font-bold text-sm tracking-wide">{currentConfig.detail} · {currentConfig.description}</p>
                </div>

                <button className="bg-surface border border-white/10 px-5 py-2.5 rounded-full flex items-center gap-2.5 shadow-lg active:scale-95 transition-all">
                    <Clock className={`w-3.5 h-3.5 ${currentConfig.color}`} />
                    <span className="text-[13px] font-bold text-slate-300">{timeAgo} 업데이트됨</span>
                </button>

                <div className="w-full bg-surface/40 border border-white/5 rounded-[32px] p-5 space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Users size={14} className="text-primary" /> 실시간 운동 중인 이웃
                        </h3>
                        <span className="text-[10px] font-bold text-primary">5명</span>
                    </div>
                    <div className="flex -space-x-3 overflow-hidden">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-slate-800 flex items-center justify-center text-[10px] font-black border border-white/10">
                                {i}F
                            </div>
                        ))}
                        <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-background bg-primary/20 text-primary text-[10px] font-black border border-primary/20">
                            +2
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium px-1 italic">"방금 103동 이웃님이 오운완을 인증했어요! 🔥"</p>
                </div>

                <div className="w-full space-y-8 pb-10">
                    {gymState.status === OccupancyStatus.FREE ? (
                        <button 
                            onClick={() => showToast('운동 시작 처리를 진행합니다.')}
                            className="w-full h-14 bg-[#34D399] text-black rounded-full font-black text-lg flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(52,211,153,0.25)] active:scale-95 transition-all"
                        >
                            지금 운동하러 가기 <ArrowDown className="w-5 h-5" strokeWidth={3} />
                        </button>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => handleReport(OccupancyStatus.NORMAL)} className="h-24 bg-surface rounded-[28px] border border-white/10 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/5 shadow-lg">
                                <div className="p-2.5 bg-normal/10 rounded-xl text-normal">
                                    <LogIn className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-black">운동 시작</span>
                            </button>
                            <button onClick={() => handleReport(OccupancyStatus.FREE)} className="h-24 bg-surface rounded-[28px] border border-white/10 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/5 shadow-lg">
                                <div className="p-2.5 bg-white/5 rounded-xl text-slate-500">
                                    <LogOut className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-black">운동 완료</span>
                            </button>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="text-lg font-black tracking-tight">이웃들의 오운완</h3>
                            <button onClick={() => setView('community')} className="text-[11px] font-black text-[#f2b90d] flex items-center gap-0.5 uppercase tracking-wider active:opacity-50">전체보기 <ChevronRight className="w-3 h-3" /></button>
                        </div>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
                            {[
                                { img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=401", user: "102동 주민" },
                                { img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=402", user: "205동 루틴왕" }
                            ].map((item, i) => (
                                <div key={i} className="flex-shrink-0 w-60 aspect-[4/3] rounded-[28px] overflow-hidden bg-surface border border-white/10 relative shadow-xl active:scale-95 transition-transform">
                                    <img src={item.img} className="w-full h-full object-cover opacity-60" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-3.5 left-4 right-4 flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-0.5">Verified</span>
                                            <span className="text-xs font-black text-white">{item.user}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                                            <Flame size={12} className="text-busy" />
                                            <span className="text-[10px] font-black">12</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );

    const CommunityScreen = () => (
        <div className="flex flex-col min-h-screen bg-background pb-32 animate-in fade-in duration-500 relative">
            <header className="sticky top-0 z-50 flex flex-col p-6 bg-background/80 backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between">
                    <button onClick={() => showToast('최근 알림이 없습니다.')} className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                        <Bell className="w-5 h-5 text-primary" />
                    </button>
                    <h1 className="text-lg font-black italic tracking-tight">우리 단지 커뮤니티</h1>
                    <button onClick={() => showToast('메시지 기능은 준비 중입니다.')} className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary active:scale-90 transition-transform">
                        <MessageCircle className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {['전체', '공지', '오운완', '분실물', '질문', '나눔'].map((cat, i) => (
                        <button key={i} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[11px] font-black border transition-all active:scale-95 ${cat === '전체' ? 'bg-white text-black border-white' : 'bg-surface text-slate-500 border-white/5'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            <main className="px-6 space-y-6 pt-2 pb-24">
                <div className="bg-surface rounded-3xl p-5 border border-white/10 space-y-4 shadow-xl overflow-hidden relative">
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Activity size={16} className="text-free" />
                            <h3 className="text-sm font-black tracking-tight">이웃 주민 활동수치</h3>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">오늘 집계</span>
                    </div>
                    <div className="flex justify-around items-end h-16 gap-3 pt-2">
                        {[40, 70, 100, 60, 30].map((h, i) => (
                            <div key={i} className="flex-1 bg-white/5 rounded-t-lg relative group">
                                <div className={`absolute bottom-0 left-0 right-0 ${i === 2 ? 'bg-primary' : 'bg-slate-700'} rounded-t-lg transition-all duration-700`} style={{ height: `${h}%` }}></div>
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-black text-slate-600 uppercase">{['08시', '12시', '18시', '21시', '00시'][i]}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold text-center">오후 6시경 가장 많은 이웃이 운동했어요!</p>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-3xl p-5 flex items-start gap-4">
                    <div className="bg-primary/20 p-2.5 rounded-xl"><Megaphone className="w-5 h-5 text-primary" /></div>
                    <div className="space-y-1">
                        <p className="font-black text-sm">필독: 헬스장 매너 캠페인</p>
                        <p className="text-xs text-slate-400 leading-relaxed">사용한 기구는 수건으로 꼭 닦아주세요. 우리 함께 쾌적한 공간을 만들어요!</p>
                        <p className="text-[10px] text-primary font-bold mt-2">관리소 알림</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {[
                        { title: "오늘 304동 옥상에서 본 노을 예쁘네요", user: "헬스초보", type: "일상", time: "방금 전", likes: 24, replies: 2 },
                        { title: "나이키 분홍색 물병 보신 분?", user: "102동주민", type: "분실물", time: "12분 전", likes: 2, replies: 5 },
                        { title: "천국의 계단 타시는 분 계신가요? 꿀팁점", user: "유산소싫어", type: "질문", time: "1시간 전", likes: 8, replies: 14 },
                        { title: "오운완! 어깨 운동 완료했습니다", user: "근육왕", type: "오운완", time: "2시간 전", likes: 52, replies: 8 },
                    ].map((item, i) => (
                        <div key={i} className="bg-surface rounded-3xl p-5 border border-white/5 space-y-3 shadow-sm active:scale-[0.98] transition-all">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] text-slate-500 font-black border border-white/5 uppercase">
                                        {item.user[0]}
                                    </div>
                                    <span className="text-[11px] font-black text-slate-400">{item.user}</span>
                                </div>
                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{item.time}</span>
                            </div>
                            <h4 className="font-bold text-base leading-snug">{item.title}</h4>
                            <div className="flex items-center gap-4 pt-1">
                                <button className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold hover:text-busy transition-colors">
                                    <Heart className="w-3.5 h-3.5" /> {item.likes}
                                </button>
                                <button className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold hover:text-primary transition-colors">
                                    <MessageSquare className="w-3.5 h-3.5" /> {item.replies}
                                </button>
                                <div className="flex-1"></div>
                                <span className="px-2 py-0.5 bg-white/5 rounded-md text-[8px] font-black text-slate-600 uppercase tracking-widest border border-white/5">{item.type}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            
            <div className="fixed bottom-32 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none">
                <button 
                    onClick={() => showToast('글쓰기 화면으로 이동합니다.')}
                    className="w-full max-sm h-14 bg-primary text-white rounded-full font-black text-lg flex items-center justify-center gap-4 shadow-[0_20px_45px_rgba(19,127,236,0.4)] pointer-events-auto active:scale-95 transition-all transform hover:translate-y-[-2px]"
                >
                    <UserPlus size={20} strokeWidth={3} />
                    <span>커뮤니티 글쓰기</span>
                </button>
            </div>
        </div>
    );

    const ProfileScreen = () => (
        <div className="flex flex-col min-h-screen bg-background pb-32 animate-in fade-in duration-500">
            <header className="p-8 pb-4 flex flex-col items-center space-y-6">
                <div className="relative">
                    <div className="w-24 h-24 bg-surface rounded-[36px] border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                        <User className="w-12 h-12 text-slate-500" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-2xl shadow-xl border-4 border-background">
                        <Award size={16} className="text-white" />
                    </div>
                </div>
                <div className="text-center space-y-1">
                    <h2 className="text-2xl font-black tracking-tight">이웃 매니아 <span className="text-primary italic">#204</span></h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">서울숲 자이 아파트 주민</p>
                </div>
            </header>

            <main className="px-6 space-y-8">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface rounded-3xl p-5 border border-white/5 space-y-1 text-center shadow-md">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">누적 포인트</p>
                        <p className="text-2xl font-black text-primary">2,450P</p>
                    </div>
                    <div className="bg-surface rounded-3xl p-5 border border-white/5 space-y-1 text-center shadow-md">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">공유 횟수</p>
                        <p className="text-2xl font-black text-free">128회</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest px-1">최근 이웃 활동</h3>
                    <div className="bg-surface rounded-[32px] border border-white/5 divide-y divide-white/5 overflow-hidden shadow-sm">
                        {[
                            { label: "방금 전 상태 공유", date: "오늘 14:20", points: "+10P" },
                            { label: "이웃 글에 응원 남김", date: "오늘 11:05", points: "+2P" },
                            { label: "오운완 사진 인증", date: "어제 07:15", points: "+20P" },
                        ].map((item, i) => (
                            <div key={i} className="p-5 flex justify-between items-center active:bg-white/5 transition-colors cursor-pointer">
                                <div className="space-y-0.5">
                                    <p className="font-bold text-sm">{item.label}</p>
                                    <p className="text-[10px] text-slate-600 font-bold">{item.date}</p>
                                </div>
                                <span className="text-xs font-black text-primary">{item.points}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 pb-10">
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest px-1">계정 설정</h3>
                    <div className="space-y-3">
                        <button className="w-full h-14 bg-surface rounded-2xl px-5 flex items-center justify-between border border-white/5 hover:bg-white/5 transition-colors active:scale-[0.98]">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={18} className="text-slate-500" />
                                <span className="text-sm font-bold">주민 인증 관리</span>
                            </div>
                            <ChevronRight size={16} className="text-slate-700" />
                        </button>
                        <button className="w-full h-14 bg-surface rounded-2xl px-5 flex items-center justify-between border border-white/5 hover:bg-white/5 transition-colors active:scale-[0.98]">
                            <div className="flex items-center gap-3">
                                <Bell size={18} className="text-slate-500" />
                                <span className="text-sm font-bold">알림 설정</span>
                            </div>
                            <ChevronRight size={16} className="text-slate-700" />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );

    const TrendsScreen = () => (
        <div className="flex flex-col min-h-screen bg-background pb-32 animate-in fade-in duration-500">
            <header className="sticky top-0 z-50 flex items-center justify-between p-6 bg-background/80 backdrop-blur-md">
                <button onClick={() => setView('home')} className="p-2 bg-surface rounded-xl active:scale-90 transition-transform"><ArrowLeft className="w-5 h-5" /></button>
                <h1 className="text-lg font-black italic tracking-tight">이용 트렌드</h1>
                {/* 삼각버튼(필터) 클릭 시 반응하도록 수정 */}
                <button onClick={() => showToast('필터 기능을 준비 중입니다.')} className="p-2 bg-surface rounded-xl active:scale-90 transition-transform">
                    <Filter className="w-5 h-5 text-primary" />
                </button>
            </header>

            <main className="px-6 pt-4 space-y-10">
                <div className="flex p-1 bg-surface rounded-[20px] border border-white/5 shadow-inner">
                    <button className="flex-1 py-3 bg-[#137fec] text-white font-black text-sm rounded-[16px] shadow-lg shadow-[#137fec]/20 transition-all">이번 주</button>
                    <button onClick={() => showToast('데이터가 부족하여 조회할 수 없습니다.')} className="flex-1 py-3 text-slate-500 font-bold text-sm hover:text-white transition-colors">지난 주</button>
                </div>

                <div className="text-center space-y-2">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.25em]">평균 혼잡 시간대</p>
                    <h2 className="text-5xl font-black tracking-tighter leading-none">오후 6:00</h2>
                    <p className="text-[#f2b90d] text-xs font-black flex items-center justify-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" /> 이 시간에는 조금 혼잡할 것 같아요
                    </p>
                </div>

                <div className="bg-surface rounded-[40px] p-7 border border-white/10 space-y-8 shadow-2xl relative overflow-hidden">
                    <div className="flex justify-between items-center relative z-10">
                        <h3 className="text-lg font-black tracking-tight">시간대별 혼잡도 히트맵</h3>
                        <button onClick={() => showToast('기본 보기 모드입니다.')} className="text-primary text-[10px] font-black uppercase tracking-widest">상세</button>
                    </div>
                    
                    <div className="grid grid-cols-8 gap-3 relative z-10">
                        <div className="space-y-5 text-[9px] font-black text-slate-600 uppercase pt-7">
                            <div>오전 8시</div>
                            <div>오후 12시</div>
                            <div>오후 4시</div>
                            <div>오후 8시</div>
                            <div>오후 10시</div>
                        </div>
                        {Array.from({length: 7}).map((_, i) => (
                            <div key={i} className="flex flex-col gap-5 items-center">
                                <div className="text-[10px] font-black text-slate-600 uppercase mb-1">{['월','화','수','목','금','토','일'][i]}</div>
                                {[1,1,2,3,4,3,2,1].map((v, j) => (
                                    <div key={j} className={`w-3.5 h-3.5 rounded-full transition-all hover:scale-150 cursor-pointer ${v > 3 ? 'bg-[#FF3B30] scale-125 shadow-[0_0_10px_rgba(255,59,48,0.4)]' : v > 2 ? 'bg-[#f2b90d] scale-110 shadow-[0_0_8px_rgba(242,185,13,0.3)]' : v > 1 ? 'bg-[#137fec]' : 'bg-white/5'}`}></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-5 pb-10">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-lg font-black tracking-tight">오늘의 추천 시간대</h3>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Oct 24th Sat</span>
                    </div>
                    {[
                        { time: '오전 10:00', desc: '보통 매우 여유로움', color: 'text-[#34d399]', percent: '12%' },
                        { time: '오후 2:00', desc: '적당한 이용객', color: 'text-[#f2b90d]', percent: '18%' },
                        { time: '오후 9:00', desc: '매우 여유로움', color: 'text-[#34d399]', percent: '5%' }
                    ].map((item, i) => (
                        <div key={i} className="bg-surface rounded-3xl p-5 border border-white/10 flex items-center justify-between shadow-xl active:scale-[0.98] transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                                    {i === 0 ? <Clock className="w-5 h-5 text-primary" /> : <Users className="w-5 h-5 text-slate-500" />}
                                </div>
                                <div>
                                    <p className="font-black text-base">{item.time}</p>
                                    <p className="text-[11px] text-slate-500 font-bold">{item.desc}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 bg-white/5 rounded-full text-[10px] font-black ${item.color}`}>혼잡도 {item.percent}</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );

    const SuccessScreen = () => (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#060910] text-white p-8 text-center">
            <div className="relative mb-14">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping scale-[2] blur-3xl"></div>
                <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(19,127,236,0.5)] relative z-10 border-4 border-white/10">
                    <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={3} />
                </div>
            </div>

            <div className="space-y-5 mb-14">
                <h2 className="text-4xl font-black italic tracking-tighter leading-tight">감사합니다!</h2>
                <p className="text-slate-400 font-bold text-lg leading-relaxed">덕분에 이웃분들께<br/>큰 도움이 되었어요</p>
            </div>

            <div className="bg-[#131823] rounded-[28px] py-5 px-8 border border-white/10 flex items-center gap-4 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-10 h-10 bg-[#f2b90d]/10 rounded-xl flex items-center justify-center text-[#f2b90d] relative z-10 shadow-inner">
                    <Trophy className="w-6 h-6" />
                </div>
                <div className="text-left relative z-10">
                    <p className="font-black text-lg">+10 포인트 획득</p>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">커뮤니티 기여</p>
                </div>
            </div>

            <div className="w-full max-w-xs space-y-4 pt-20">
                <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-0.5">
                    <span>이동 중...</span>
                    <span className="text-primary">2s</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-primary w-[70%] rounded-full shadow-[0_0_12px_rgba(19,127,236,0.4)] animate-[loading_2s_ease-in-out_infinite]"></div>
                </div>
                <button 
                    onClick={() => setView('home')}
                    className="w-full h-16 bg-white/5 border border-white/10 rounded-full mt-8 font-black text-slate-500 hover:text-white transition-all active:scale-95"
                >
                    닫기
                </button>
            </div>
        </div>
    );

    // --- Main Rendering Logic ---
    return (
        <div className="max-w-md mx-auto shadow-[0_0_100px_rgba(0,0,0,0.8)] min-h-screen bg-background relative overflow-hidden flex flex-col font-sans">
            <div className="flex-1 overflow-y-auto no-scrollbar">
                {view === 'cover' && <CoverScreen />}
                {view === 'home' && <HomeScreen />}
                {view === 'trends' && <TrendsScreen />}
                {view === 'community' && <CommunityScreen />}
                {view === 'profile' && <ProfileScreen />}
                {view === 'success' && <SuccessScreen />}
            </div>

            {/* Global Toast Message */}
            {toastMessage && (
                <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 bg-surface border border-white/10 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <p className="text-xs font-black text-white flex items-center gap-2">
                        <Info size={14} className="text-primary" /> {toastMessage}
                    </p>
                </div>
            )}

            {/* Global Bottom Navigation */}
            {view !== 'cover' && view !== 'success' && (
                <nav className="sticky bottom-0 left-0 right-0 w-full bg-[#0B0F19]/95 backdrop-blur-2xl border-t border-white/5 px-6 pt-4 pb-10 flex items-center justify-between z-[100] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                    <button 
                        onClick={() => setView('home')}
                        className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative group flex-1 ${view === 'home' ? 'text-primary scale-110' : 'text-slate-600'}`}
                    >
                        {view === 'home' && <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full"></div>}
                        <Home className={`w-5 h-5 transition-all ${view === 'home' ? 'fill-primary/20' : 'group-hover:text-white'}`} />
                        <span className="text-[9px] font-black uppercase tracking-tighter">홈</span>
                    </button>
                    <button 
                        onClick={() => setView('trends')}
                        className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative group flex-1 ${view === 'trends' ? 'text-primary scale-110' : 'text-slate-600'}`}
                    >
                        {view === 'trends' && <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full"></div>}
                        <BarChart2 className={`w-5 h-5 transition-all ${view === 'trends' ? 'fill-primary/20' : 'group-hover:text-white'}`} />
                        <span className="text-[9px] font-black uppercase tracking-tighter">리포트</span>
                    </button>
                    <button 
                        onClick={() => setView('community')}
                        className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative group flex-1 ${view === 'community' ? 'text-primary scale-110' : 'text-slate-600'}`}
                    >
                        {view === 'community' && <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full"></div>}
                        <MessageSquare className={`w-5 h-5 transition-all ${view === 'community' ? 'fill-primary/20' : 'group-hover:text-white'}`} />
                        <span className="text-[9px] font-black uppercase tracking-tighter">커뮤니티</span>
                    </button>
                    <button 
                        onClick={() => setView('profile')}
                        className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative group flex-1 ${view === 'profile' ? 'text-primary scale-110' : 'text-slate-600'}`}
                    >
                        {view === 'profile' && <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full"></div>}
                        <User className={`w-5 h-5 transition-all ${view === 'profile' ? 'fill-primary/20' : 'group-hover:text-white'}`} />
                        <span className="text-[9px] font-black uppercase tracking-tighter">프로필</span>
                    </button>
                </nav>
            )}
        </div>
    );
};

export default App;
