import { withStyles } from '@material-ui/core/';
import { teal } from '@material-ui/core/colors';

export const backUrl = 'https://api.myme.today';
export const socketUrl = "https://k5a203.p.ssafy.io"

export const categories = [
  {
    name: "1",
    label: "운동",
  },
  {
    name: "2",
    label: "공부",
  },
  {
    name: "3",
    label: "생활",
  },
  {
    name: "4",
    label: "식사",
  },
  {
    name: "5",
    label: "역량",
  },
  {
    name: "6",
    label: "취미",
  },
  {
    name: "7",
    label: "자산",
  }
]

export const convertCertType = (type) => {
  const types = ['',
    '매일',
    '평일 매일',
    '주말 매일',
    '주 6일',
    '주 5일',
    '주 4일',
    '주 3일',
    '주 2일',
    '주 1일'
  ]
  return types[type]
}

export const convertNumDay = (type) => {
  const types = [
    '월',
    '화',
    '수',
    '목',
    '금',
    '토',
    '일'
  ]
  return types[type]
}

export const convertDaysWeek = (type) => {
  const weekNum = type/7
  return weekNum + '주'
}

export const advice = (type) => {
  const types = [
    '시작이 반이다! 당신의 도전에 MYME가 함께합니다!',
    '벌써 지치신 건 아니죠? 멋지게 성공한 모습을 상상해보세요!',
    '처음에는 습관이 우리를 만들지만 그다음은 습관이 우리를 만들어요!',
    '도망쳐 다다른 곳에 낙원은 없습니다! 곧 반환점이에요! 파이팅!',
    '컵에 물이 반이나 있네? 긍정적인 마음으로 꾸준함을 유지합시다!',
    '끊임 없이 떨어지는 물방울은 돌에 구멍을 낸답니다. 우리도 한계에 구멍을 뚫어봅시다!',
    '어느덧 고지가 보입니다. 가끔은 생각하지 않고 바로 움직이는 것이 도움이 됩니다!',
    '노력한다고 모두 성공하지는 않지만 모든 성공한 사람은 꾸준히 노력했음을 잊지마세요!',
    '포기하는 그 순간이 시합 종료임을 잊지마세요! 이제 거의 다 했어요!',
    '시작할 때의 다짐이나 마음이 기억나시나요? 마음을 다잡고 마지막을 향해 봅시다!'
  ]
  return types[type]
}

export const ColorTeal = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  },
}))
