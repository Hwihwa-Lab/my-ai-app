
import React from 'react';
import { OccupancyStatus } from './types';
import { 
  Zap, 
  Users, 
  HelpCircle, 
  Smile, 
  Meh, 
  Frown, 
  Activity,
  UserCheck
} from 'lucide-react';

export const STATUS_CONFIG = {
    [OccupancyStatus.FREE]: {
        label: '여유로움',
        description: '쾌적하게 운동 가능',
        detail: '이용객 3명',
        color: 'text-[#34d399]',
        bgColor: 'bg-[#34d399]',
        ringColor: 'border-[#34d399]/40',
        badge: '현재 상태',
        icon: <Activity className="w-16 h-16 text-[#34d399]" />,
        progress: 20
    },
    [OccupancyStatus.NORMAL]: {
        label: '보통',
        description: '적당히 운동 가능',
        detail: '이용객 5명',
        color: 'text-[#f2b90d]',
        bgColor: 'bg-[#f2b90d]',
        ringColor: 'border-[#f2b90d]/40',
        badge: '실시간',
        icon: <Users className="w-16 h-16 text-[#f2b90d]" />,
        progress: 55
    },
    [OccupancyStatus.BUSY]: {
        label: '혼잡함',
        description: '8시 이후 권장',
        detail: '대기 약 20분',
        color: 'text-[#FF3B30]',
        bgColor: 'bg-[#FF3B30]',
        ringColor: 'border-[#FF3B30]/40',
        badge: '만원',
        icon: <Users className="w-16 h-16 text-[#FF3B30]" />,
        progress: 90
    },
    [OccupancyStatus.NONE]: {
        label: '데이터 없음',
        description: '현재 상태를 공유해주시겠어요?',
        detail: '마지막 기록 이후 시간이 꽤 지났어요.',
        color: 'text-slate-400',
        bgColor: 'bg-slate-500',
        ringColor: 'border-slate-500/30',
        badge: '업데이트 필요',
        icon: <HelpCircle className="w-16 h-16 text-slate-500" />,
        progress: 0
    }
};
