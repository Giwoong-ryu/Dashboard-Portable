import { Project } from './types';

// JSON 파일에서 프로젝트 로드 (교육용: public/projects.json 수정 가능)
export async function loadProjectsFromJSON(): Promise<Project[]> {
  try {
    const res = await fetch('/projects.json');
    if (!res.ok) {
      console.warn('projects.json 로드 실패, 기본 데이터 사용');
      return getDefaultProjects();
    }
    return await res.json();
  } catch (error) {
    console.warn('projects.json 파싱 실패, 기본 데이터 사용', error);
    return getDefaultProjects();
  }
}

// 기본 프로젝트 (SYSTEMS_INVENTORY.md 기반)
export function getDefaultProjects(): Project[] {
  return initialProjects;
}

// SYSTEMS_INVENTORY.md 기반 (2026-01-02)
export const initialProjects: Project[] = [
  // Tier 1: 완성도 높은 프로젝트
  {
    id: 1,
    title: "Dev Insights (개발자 인사이트 크롤링)",
    category: ["Automation", "AI"],
    status: "운영",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\n8n-make\\automation\\scripts\\dev_insights",
    workspace: "GUI 프로그램",
    hasGui: true,
    guiCommand: "pythonw run_gui.py",
    impact: "수동 크롤링 대비 80% 시간 절감, AI 필터링으로 57% 토큰 비용 절감",
    lastUpdated: "2026-01-02",
    todos: [
      { id: "1-1", text: "주간 자동 실행 (cron/Task Scheduler)", completed: false },
      { id: "1-2", text: "Slack 알림 통합", completed: false }
    ]
  },
  {
    id: 2,
    title: "카카오톡 RAG 시스템",
    category: ["RAG", "AI", "n8n"],
    status: "배포",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\n8n-make\\RAG\\kakao",
    workspace: "GUI 프로그램",
    hasGui: true,
    guiCommand: "python scripts\\gui_app_final.py",
    impact: "카톡 대화 → Recipe 변환 시간 95% 절감 (3시간 → 10분)",
    lastUpdated: "2025-12-25",
    todos: [
      { id: "2-1", text: "배포 (FINAL_SUMMARY.md 참조)", completed: false },
      { id: "2-2", text: "GeekNews/Reddit 소스 추가", completed: false }
    ]
  },
  {
    id: 3,
    title: "범용 문서 변환 시스템 v8.1",
    category: ["n8n", "AI", "크몽"],
    status: "테스트",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\n8n-make\\RAG\\kakao\\eazypick-workflows",
    workspace: "n8n",
    impact: "크몽 판매 가격: 30만원 (기본) / 50만원 (프리미엄)",
    lastUpdated: "2025-12-15",
    todos: [
      { id: "3-1", text: "Markdown to Google Docs 기능 추가", completed: false },
      { id: "3-2", text: "ngrok 대신 AWS Lambda로 전환", completed: false }
    ]
  },
  {
    id: 4,
    title: "통합 런처 (Automation Hub)",
    category: ["GUI", "Automation"],
    status: "운영",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\n8n-make\\automation",
    workspace: "GUI 프로그램",
    hasGui: true,
    guiCommand: "pythonw launcher.py",
    impact: "앱 실행 시간 90% 절감 (30초 → 3초)",
    lastUpdated: "2026-01-01",
    todos: []
  },
  {
    id: 5,
    title: "Kmong 시장 분석 시스템",
    category: ["Crawling", "Analysis"],
    status: "테스트",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\n8n-make\\automation\\scripts\\market-crawler",
    workspace: "GUI 프로그램",
    impact: "상위 5% 분석 + 가격 전략 자동 생성",
    lastUpdated: "2025-12-31",
    todos: [
      { id: "5-1", text: "크몽 등록 실행", completed: false },
      { id: "5-2", text: "첫 고객 획득", completed: false }
    ]
  },
  {
    id: 6,
    title: "n8n Knowledge Base",
    category: ["n8n", "Knowledge"],
    status: "운영",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\n8n-make\\n8n-knowledge-base",
    workspace: "n8n",
    impact: "162개 n8n 노드 정보 (typeVersion + parameters)",
    lastUpdated: "2025-12-18",
    todos: [
      { id: "6-1", text: "월 1회 업데이트 (AI 모델명 최신화)", completed: false }
    ]
  },
  {
    id: 7,
    title: "n8n Community Techniques Library",
    category: ["n8n", "Knowledge"],
    status: "운영",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\n8n-make\\RAG\\kakao",
    workspace: "n8n",
    impact: "14개 n8n 커뮤니티 기법, 크몽 판매 가능 3개",
    lastUpdated: "2025-12-29",
    todos: [
      { id: "7-1", text: "Tier 1 기법 → 크몽 서비스화", completed: false }
    ]
  },
  {
    id: 8,
    title: "vision-ocr-mcp",
    category: ["MCP", "OCR", "AI"],
    status: "테스트",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\vision-ocr-mcp",
    workspace: "MCP",
    impact: "Gemini 3 Flash OCR, RAG 스키마 호환",
    lastUpdated: "2025-12-17",
    todos: [
      { id: "8-1", text: "카톡 RAG 시스템과 통합", completed: false }
    ]
  },
  {
    id: 9,
    title: "universal-crawler-mcp",
    category: ["MCP", "Crawling"],
    status: "테스트",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\universal-crawler-mcp",
    workspace: "MCP",
    impact: "HTML/RSS/API 통합 크롤링, 배치 병렬 처리",
    lastUpdated: "2025-12-20",
    todos: [
      { id: "9-1", text: "Dev Insights와 통합", completed: false }
    ]
  },
  {
    id: 10,
    title: "tech-intel-system",
    category: ["AI", "Automation"],
    status: "테스트",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\tech-intel-system",
    workspace: "n8n",
    impact: "카톡 대화 → 실행가능 항목 자동 추출",
    lastUpdated: "2025-12-28",
    todos: [
      { id: "10-1", text: "자동 적용 워크플로우", completed: false }
    ]
  },
  {
    id: 11,
    title: "Cognitive Engines (전략 OS)",
    category: ["Strategy", "AI"],
    status: "운영",
    folderPath: "C:\\Users\\user\\cognitive_engines",
    workspace: "GUI 프로그램",
    hasGui: true,
    guiCommand: "python gui_launcher.py",
    impact: "/0 Master Router, 제1원리 분석, JTBD, VRIO 프레임워크",
    lastUpdated: "2026-01-01",
    todos: []
  },
  {
    id: 12,
    title: "Integrated Intelligence System (IIS)",
    category: ["AI", "Strategy"],
    status: "개발",
    folderPath: "C:\\Users\\user\\cognitive_engines",
    workspace: "GUI 프로그램",
    impact: "10-Layer Web Intelligence + 8 Cognitive Engine 자동 라우팅",
    lastUpdated: "2025-12-31",
    todos: [
      { id: "12-1", text: "MVP 구현 (Token-level Memory 우선)", completed: false },
      { id: "12-2", text: "테스트 케이스 작성", completed: false }
    ]
  },

  // Tier 2: 진행 중 프로젝트
  {
    id: 13,
    title: "ai-helper (AI 도구 디렉토리)",
    category: ["AI", "Web"],
    status: "개발",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\ai-helper",
    workspace: "웹",
    impact: "ChatGPT, Claude, Gemini, Perplexity 도구 모음",
    lastUpdated: "2025-11-20",
    todos: [
      { id: "13-1", text: "Next.js 버전으로 전환", completed: false }
    ]
  },
  {
    id: 14,
    title: "ai-tools-website",
    category: ["Web", "Next.js"],
    status: "배포",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\ai-tools-website",
    workspace: "웹",
    impact: "AI 도구 웹사이트 (Vercel 배포 가능)",
    lastUpdated: "2025-12-10",
    todos: [
      { id: "14-1", text: "콘텐츠 추가", completed: false }
    ]
  },
  {
    id: 15,
    title: "gpt-content-blog",
    category: ["Content", "AI"],
    status: "계획",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\gpt-content-blog",
    workspace: "웹",
    impact: "GPT 기반 블로그 콘텐츠 자동 생성",
    lastUpdated: "2025-11-15",
    todos: [
      { id: "15-1", text: "실험 완료 후 배포 결정", completed: false }
    ]
  },
  {
    id: 16,
    title: "kakaotalk-rag (구버전)",
    category: ["RAG"],
    status: "운영",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\kakaotalk-rag",
    workspace: "기타",
    impact: "n8n-make/RAG/kakao로 통합됨",
    lastUpdated: "2025-12-20",
    todos: [
      { id: "16-1", text: "완전 통합 후 아카이빙", completed: false }
    ]
  },
  {
    id: 17,
    title: "n8n-copilot",
    category: ["n8n", "AI"],
    status: "계획",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\n8n-copilot",
    workspace: "n8n",
    impact: "n8n 워크플로우 자동 생성",
    lastUpdated: "2025-11-10",
    todos: [
      { id: "17-1", text: "프로토타입 구현", completed: false }
    ]
  },
  {
    id: 18,
    title: "Pomodoro Timer",
    category: ["Productivity"],
    status: "개발",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\Pomodoro",
    workspace: "기타",
    impact: "뽀모도로 타이머 (통합 필요)",
    lastUpdated: "2025-11-25",
    todos: [
      { id: "18-1", text: "프로젝트 통합", completed: false }
    ]
  },
  {
    id: 19,
    title: "shots (스크린샷 관리)",
    category: ["Utility"],
    status: "개발",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\shots",
    workspace: "기타",
    impact: "스크린샷 자동 정리 도구",
    lastUpdated: "2025-11-18",
    todos: [
      { id: "19-1", text: "기능 완성", completed: false }
    ]
  },
  {
    id: 20,
    title: "system_prompts_leaks",
    category: ["Knowledge", "AI"],
    status: "운영",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\system_prompts_leaks",
    workspace: "기타",
    impact: "AI 시스템 프롬프트 수집 (참고 자료)",
    lastUpdated: "2025-12-05",
    todos: []
  },
  {
    id: 21,
    title: "my-skills (Claude Code 슬래시 명령)",
    category: ["Claude", "Skills"],
    status: "개발",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\my-skills",
    workspace: "시스템",
    impact: "슬래시 명령 모음",
    lastUpdated: "2025-12-15",
    todos: [
      { id: "21-1", text: ".claude/commands로 통합", completed: false }
    ]
  },
  {
    id: 22,
    title: "cafe / 카페 프랜차이즈 B2B",
    category: ["Business"],
    status: "계획",
    folderPath: "C:\\Users\\user\\Desktop\\gpt\\cafe",
    workspace: "기타",
    impact: "카페 프랜차이즈 관련 (중단)",
    lastUpdated: "2025-10-20",
    todos: []
  },
  {
    id: 23,
    title: "검증 시스템 (/v)",
    category: ["System", "Quality"],
    status: "운영",
    folderPath: "C:\\Users\\user\\.claude\\commands",
    workspace: "시스템",
    impact: "코드 실행 전 4단계 사전 검증 (10개 원칙)",
    lastUpdated: "2026-01-01",
    todos: []
  },
  {
    id: 24,
    title: "학습 저장 시스템 (/s)",
    category: ["System", "Memory"],
    status: "운영",
    folderPath: "C:\\Users\\user\\.claude\\state",
    workspace: "시스템",
    impact: "세션 오류/패턴 자동 저장 + Git 커밋",
    lastUpdated: "2026-01-01",
    todos: []
  }
];
